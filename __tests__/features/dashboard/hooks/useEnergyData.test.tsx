import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import apolloClient from '@/httpClient/apollo/apolloClient';
import { useFetchEnergyPrices } from '@/features/dashboard/hooks/useEnergyData';

jest.mock('@/httpClient/apollo/apolloClient', () => ({
  query: jest.fn(),
}));

const defaultRequest = {
  startDate: '2025-01-01',
  endDate: '2025-01-01',
  geo: 'ES',
};

const TestComponent = ({ isMock = false }) => {
  const { energyPrices, loading, error } = useFetchEnergyPrices(defaultRequest, isMock);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;
  return <Text>{`Precios: ${energyPrices.length}`}</Text>;
};

describe('useFetchEnergyPrices', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devuelve datos mock si isMock=true', async () => {
    const { getByText } = render(<TestComponent isMock={true} />);
    await waitFor(() => {
      expect(getByText(/Precios: 24/)).toBeTruthy();
    });
  });

  it('hace una query real si isMock=false', async () => {
    (apolloClient.query as jest.Mock).mockResolvedValue({
      data: {
        getEnergyPriceHourlyByDate: [
          {
            values: Array.from({ length: 24 }, (_, i) => i + 1),
          },
        ],
      },
    });

    const { getByText } = render(<TestComponent isMock={false} />);
    await waitFor(() => {
      expect(getByText(/Precios: 24/)).toBeTruthy();
    });

    expect(apolloClient.query).toHaveBeenCalledWith({
      query: expect.anything(),
      variables: defaultRequest,
    });
  });

  it('setea error si la query falla', async () => {
    (apolloClient.query as jest.Mock).mockRejectedValue(new Error('fail'));

    const { getByText } = render(<TestComponent isMock={false} />);
    await waitFor(() => {
      expect(getByText(/Error al obtener los datos del servidor/)).toBeTruthy();
    });
  });
});

import { useState, useEffect } from 'react';
import apolloClient from '@/httpClient/apollo/apolloClient';
import { GET_ENERGY_PRICES } from '@/httpClient/apollo/queries';

type EnergyPriceRequest = {
  startDate: string;
  endDate: string;
  geo: string;
};

type EnergyPrice = {
  label: string;
  value: number;
};

export const useFetchEnergyPrices = (energyPriceRequest: EnergyPriceRequest, isMock: boolean = false) => {

  const { startDate, endDate, geo } = energyPriceRequest;
  const [energyPrices, setEnergyPrices] = useState<EnergyPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getMockData = () => {
    const mockData: EnergyPrice[] = [
      { label: '00h', value: 78.2 },
      { label: '01h', value: 76.1 },
      { label: '02h', value: 72.5 },
      { label: '03h', value: 70.0 },
      { label: '04h', value: 68.4 },
      { label: '05h', value: 67.9 },
      { label: '06h', value: 74.1 },
      { label: '07h', value: 91.0 },
      { label: '08h', value: 103.4 },
      { label: '09h', value: 110.2 },
      { label: '10h', value: 107.8 },
      { label: '11h', value: 105.6 },
      { label: '12h', value: 108.9 },
      { label: '13h', value: 104.1 },
      { label: '14h', value: 99.6 },
      { label: '15h', value: 101.3 },
      { label: '16h', value: 106.5 },
      { label: '17h', value: 114.7 },
      { label: '18h', value: 120.1 },
      { label: '19h', value: 122.9 },
      { label: '20h', value: 119.3 },
      { label: '21h', value: 113.0 },
      { label: '22h', value: 104.7 },
      { label: '23h', value: 93.2 },
    ];
    setEnergyPrices(mockData);
    setLoading(false);
  };

  useEffect(() => {
    if (isMock) {
      getMockData();
      return
    }
    getDataEnergyPrices();
  }, [startDate, endDate, geo, isMock]);

  const getDataEnergyPrices = async () => {
    try {
      const { data } = await apolloClient.query({
        query: GET_ENERGY_PRICES,
        variables: { startDate, endDate, geo },
      });

      const formattedData = data.getEnergyPriceHourlyByDate[0].values.map((price: number, index: number) => ({
        label: `${index < 10 ? '0' : ''}${index}h`,
        value: price,
      }));

      setEnergyPrices(formattedData);
      setLoading(false);
    } catch (err) {
      setError('Error al obtener los datos del servidor.');
      setLoading(false);
    }
  };

  return { energyPrices, loading, error };
};

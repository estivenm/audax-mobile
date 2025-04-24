import { useState, useEffect } from 'react';
import apolloClient from '@/httpClient/apollo/apolloClient';
import { GET_ENERGY_PRICES } from '@/httpClient/apollo/queries';
import { EnergyPriceRequest } from '@/model/request-model';
import { EnergyPrice } from '@/model/response-model';
import { mockDataEnergyprice } from '@/mock/dataMock';
import { handleGraphQLError } from '@/utils/graphqlErrorHandler';

export const useFetchEnergyPrices = (energyPriceRequest: EnergyPriceRequest, isMock: boolean = false) => {

  const { startDate, endDate, geo } = energyPriceRequest;
  const [energyPrices, setEnergyPrices] = useState<EnergyPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getMockData = () => {
    setLoading(true);
    setTimeout(() => {
      setEnergyPrices(mockDataEnergyprice);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    if (isMock) {
      getMockData();
      return;
    }
    getDataEnergyPrices();
  }, [startDate, endDate, geo, isMock]);

  const getDataEnergyPrices = async () => {
    try {
      setLoading(true);
      setEnergyPrices([]);
      const { data, errors } = await apolloClient.query({
        query: GET_ENERGY_PRICES,
        variables: { startDate, endDate, geo },
      });

      if (errors && errors.length > 0) {
        setError('Error en la consulta.');
        console.log('GraphQL errors:', errors);
        return;
      }
      console.log('GraphQL data:', data);

      const energyPriceData = data?.getEnergyPriceHourlyByDate;

      if (!energyPriceData || energyPriceData.length === 0) {
        setError('No se encontraron datos disponibles.');
        return;
      }
      const formattedData = mapperEnergyPrice(energyPriceData);
      setEnergyPrices(formattedData);
    } catch (err) {
      setError(handleGraphQLError(err));
    }
    finally {
      setLoading(false);
    }
  };

  const mapperEnergyPrice = (data: []) => {
    return data.map((price: number, index: number) => ({
      label: `${index < 10 ? '0' : ''}${index}h`,
      value: price,
    }));
  };

  return { energyPrices, loading, error };
};

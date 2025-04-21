import { gql } from '@apollo/client';

export const GET_ENERGY_PRICES = gql`
  query getEnergyPriceHourlyByDate($startDate: Date!, $endDate: Date, $geo: String) {
    getEnergyPriceHourlyByDate(startDate: $startDate, endDate: $endDate, geo: $geo) {
      id
      geo
      date
      values
    }
  }
`;

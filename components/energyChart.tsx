import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

type EnergyPrice = {
  label: string;
  value: number;
};

interface Props {
  energyPrices: EnergyPrice[];
}

const EnergyChart = ({ energyPrices }:Props) => {
  return (
    <View style={styles.chartContainer}>
      <LineChart
        data={energyPrices}
        thickness={4}
        color="#FDB813"
        hideDataPoints={false}
        yAxisTextStyle={{ color: '#666' }}
        xAxisLabelTextStyle={{ color: '#666', fontSize: 10 }}
        noOfSections={6}
        maxValue={140}
        yAxisLabelSuffix="€"
        curved
        areaChart
        isAnimated
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    width: '90%',
    height: 300,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  gradient: {
    flex: 1,
    borderRadius: 12,
    padding: 8,
  },
  legend: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FDB813',
  },
});

export default EnergyChart;

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

const EnergyChart = ({ energyPrices }: Props) => {
  return (
    <View style={styles.outerCard}>
      <View style={styles.innerChartWrapper}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  outerCard: {
    backgroundColor: '#f4f4f4',
    borderRadius: 20,
    padding: 4,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  innerChartWrapper: {
    borderRadius: 16,
    overflow: 'hidden',
    padding: 12,
  },
});

export default EnergyChart;

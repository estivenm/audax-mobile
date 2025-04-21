import React from 'react';
import useLoadFonts from '@/hooks/useFonts';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import SplashLoading from '@/components/SplashLoading';
import EnergyChart from '@/components/energyChart';
import { useFetchEnergyPrices } from '@/features/dashboard/hooks/useEnergyData';

const DashboardScreen = () => {
  const { loaded } = useLoadFonts();

  const { energyPrices, loading } = useFetchEnergyPrices(
    { startDate: '2025-04-20', endDate: '2025-04-20', geo: 'ES' },
    true
  );

  if (loading || !loaded ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <SplashLoading />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Energy price per hour (€/MWh)</Text>
      <EnergyChart energyPrices={energyPrices}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 20,
    marginTop: 50,
    marginHorizontal: 20,
  },
});

export default DashboardScreen;

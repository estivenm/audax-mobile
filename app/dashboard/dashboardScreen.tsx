import React, { useEffect, useState } from 'react';
import useLoadFonts from '@/hooks/useFonts';
import { Text, StyleSheet, View, TouchableOpacity, Switch } from 'react-native';
import SplashLoading from '@/components/SplashLoading';
import EnergyChart from '@/components/energyChart';
import { useFetchEnergyPrices } from '@/features/dashboard/hooks/useEnergyData';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { EnergyPriceRequest } from '@/model/request-model';
import Toast from 'react-native-toast-message';

const DashboardScreen = () => {
  const { loaded } = useLoadFonts();

  const [formData, setFormData] = useState<EnergyPriceRequest>({
    startDate: '2025-04-20',
    endDate: '2025-04-20',
    geo: 'ES'
  });

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [isMock, setIsMock] = useState(true);

  const { energyPrices, loading, error } = useFetchEnergyPrices(formData, isMock);

  useEffect(() => {
    if (error) {
      Toast.show({
        type: 'error',
        text1: 'Algo salió mal',
        position: 'bottom',
        visibilityTime: 4000,
      });
    }
  }, [error]);

  const handleDateChange = (key: 'startDate' | 'endDate', selectedDate: Date) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setFormData(prev => ({
      ...prev,
      [key]: formattedDate,
    }));
  };

  const formatDateReadable = (isoDate: string) => {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  if (loading || !loaded) {
    return (
      <View style={styles.loadingContainer}>
        <SplashLoading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Energy price per hour (€/MWh)</Text>

      <View style={styles.dateSelectorContainer}>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateLabel}>Start date:</Text>
          <Text style={styles.dateValue}>{formatDateReadable(formData.startDate)}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowEndPicker(true)} style={styles.dateButton}>
          <Text style={styles.dateLabel}>End date:</Text>
          <Text style={styles.dateValue}>{formatDateReadable(formData.endDate)}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.chartContainer}>
        <EnergyChart energyPrices={energyPrices} />
      </View>

      <DateTimePickerModal
        isVisible={showStartPicker}
        mode="date"
        date={new Date(formData.startDate)}
        onConfirm={(date) => {
          handleDateChange('startDate', date);
          setShowStartPicker(false);
        }}
        onCancel={() => setShowStartPicker(false)}
        locale="es_ES"
        display="spinner"
        themeVariant="light"
        isDarkModeEnabled={false}
      />

      <DateTimePickerModal
        isVisible={showEndPicker}
        mode="date"
        date={new Date(formData.endDate)}
        onConfirm={(date) => {
          handleDateChange('endDate', date);
          setShowEndPicker(false);
        }}
        onCancel={() => setShowEndPicker(false)}
        locale="es_ES"
        display="spinner"
        themeVariant="light"
        isDarkModeEnabled={false}
      />

      <View style={styles.mockToggleContainer}>
        <Text style={styles.mockLabel}>Mock</Text>
        <Switch
          value={isMock}
          onValueChange={setIsMock}
          trackColor={{ false: '#ccc', true: '#81b0ff' }}
          thumbColor={isMock ? '#007AFF' : '#f4f3f4'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
    color: '#222',
    marginTop: 40,
    marginBottom: 40,
    textAlign: 'center',
  },
  dateSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
    marginBottom: 50,
  },
  dateButton: {
    backgroundColor: '#F2F2F2',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  dateLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_500Medium',
    color: '#444',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#007AFF',
  },
  chartContainer: {
    flex: 1,
    marginBottom: 30,
  },
  mockToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
  },

  mockLabel: {
    fontSize: 16,
    fontFamily: 'Poppins_500Medium',
    color: '#333',
    marginRight: 10,
  },
});

export default DashboardScreen;

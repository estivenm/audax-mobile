import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

const WelcomeScreen = () => {
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;
  const backgroundImage = isWeb ? require('@assets/images/bg-login-web.png') : require('@assets/images/bg-login.png');

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={[styles.overlay, isWeb && styles.overlayWeb]}>
        <Text style={styles.title}>Welcome to Audax Renewables</Text>
        <Text style={styles.subtitle}>Clean energy for a sustainable future</Text>

        <ScrollView contentContainerStyle={[styles.cardContainer, isWeb && styles.cardContainerWeb]}>
          <View style={[styles.card, isWeb && styles.cardWeb]}>
            <Ionicons name="sunny" size={40} color="#FDB813" />
            <Text style={styles.cardTitle}>Solar Energy</Text>
            <Text style={styles.cardText}>
              Innovative and sustainable solar projects across Europe.
            </Text>
          </View>

          <View style={[styles.card, isWeb && styles.cardWeb]}>
            <Ionicons name="leaf" size={40} color="#00C853" />
            <Text style={styles.cardTitle}>Wind Energy</Text>
            <Text style={styles.cardText}>
              We harness the power of the wind to generate green energy.
            </Text>
          </View>

          <View style={[styles.card, isWeb && styles.cardWeb]}>
            <Ionicons name="analytics" size={40} color="#FFC107" />
            <Text style={styles.cardTitle}>Smart Consumption</Text>
            <Text style={styles.cardText}>
              Monitor and optimize your energy consumption with our tools.
            </Text>
          </View>
        </ScrollView>

        <TouchableOpacity style={[styles.button, isWeb && styles.buttonWeb]} onPress={() => router.push('/dashboard/dashboardScreen')}>
          <Text style={styles.buttonText}>View graphics</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>COPYRIGHT BY AUDAX RENEWABLES</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    justifyContent: 'space-between',
  },
  overlayWeb: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 70,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1,
  },
  cardContainerWeb: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 30,
  },

  cardWeb: {
    width: 300,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    textAlign: 'center',
    width:  '100%',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    marginTop: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardText: {
    color: '#ddd',
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FDB813',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonWeb: {
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  footer: {
    textAlign: 'center',
    color: '#aaa',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default WelcomeScreen;

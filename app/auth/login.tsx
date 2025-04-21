import React, { useEffect, useMemo } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Image, Platform, useWindowDimensions } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { LinearGradient } from 'expo-linear-gradient';
import useLoadFonts from '@/hooks/useFonts';
import Loginform from '@/features/auth/components/login/LoginForm';
import LoginHeaderBackground from '@/features/auth/components/login/LoginHeaderBackground';
import LoginHeader from '@/features/auth/components/login/LoginHeader';
import SplashLoading from '@/components/SplashLoading';

const LoginScreen = () => {
  const { loaded, error } = useLoadFonts();
  const { width } = useWindowDimensions();
  const isWeb = width >= 768;

  const logo = require('@assets/images/Logo.png');
  const backgroundImage = isWeb ? require('@assets/images/bg-login-web.png') : require('@assets/images/bg-login.png');

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync('#FFAE00');
      NavigationBar.setButtonStyleAsync('dark');
    }
  }, []);

  if (!loaded && !error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
        <SplashLoading />
      </View>
    )
  }

  return (
    <View style={{ ...styles.container, flexDirection: isWeb ? 'row' : 'column', }}>
      <View style={styles.contentBackground}>
        <ImageBackground source={backgroundImage} style={styles.background} >
          <View style={styles.overlay} />
          <Image source={logo} style={styles.logo} />
          <LoginHeaderBackground isWeb={isWeb} />
        </ImageBackground>
      </View>

      <LinearGradient
        colors={['#000', '#000', '#403B33', '#FFAE00']}
        locations={[0, 0.3, 0.5, 1]}
        start={isWeb ? { x: 0, y: 0 } : undefined}
        end={isWeb ? { x: 1, y: 0 } : undefined}
        style={styles.formSection}
      >

        <View style={styles.formContent}>
          {isWeb &&
            <View style={styles.loginHeader}>
              <LoginHeader />
            </View>
          }
          <Loginform />
        </View>

        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>COPYRIGHT BY AUDAX RENOVABLES</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
  },
  contentBackground: {
    flex: 6,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.37)',
  },
  logo: {
    marginTop: 50,
    marginLeft: 20,
    resizeMode: 'contain',
  },

  formSection: {
    flex: 3,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },

  formContent: {
    width: '100%',
    marginTop: 30,
  },

  footerContainer: {
    flex: 1,
    justifyContent: 'flex-end'
  },

  footerText: {
    fontSize: 12,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 25,
  },

  loginHeader: {
    flex: 1,
    marginTop: 150,
  }

});

export default LoginScreen;

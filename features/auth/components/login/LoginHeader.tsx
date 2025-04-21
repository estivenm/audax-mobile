import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

const LoginHeader = () => {
  return (
    <View style={styles.headingContainer}>
      <Text style={styles.title}>SIGN IN</Text>
      <Text style={styles.subtitle}>Sign in with email address</Text>
    </View>
  );
}

const styles = StyleSheet.create({

  headingContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 20,
  },

  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 62,
    color: '#fff',
    marginBottom: 5,
  },

  subtitle: {
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    marginBottom: 30,
    fontSize: 12,
  }

});

export default LoginHeader

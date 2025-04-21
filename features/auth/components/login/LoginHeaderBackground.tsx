import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import LoginHeader from './LoginHeader';

interface Props {
  isWeb: boolean;
}
const LoginHeaderBackground = ({ isWeb }: Props) => {
  if (isWeb) {
    return (
      <View style={styles.webFooter}>
        <Text style={styles.adventureText}>SIGN IN TO YOUR</Text>
        <Text style={styles.adventureBold}>ADVENTURE!</Text>
      </View>
    );
  }
  return (
    <View style={styles.loginHeader}>
      <LoginHeader />
    </View>
  )

}

const styles = StyleSheet.create({

  webFooter: {
    position: 'absolute',
    bottom: 40,
    left: 40,
  },

  adventureText: {
    color: '#fff',
    fontSize: 50,
    fontFamily: 'Poppins_700Bold',
  },

  adventureBold: {
    color: '#FFAE00',
    fontSize: 50,
    fontFamily: 'Poppins_700Bold',
  },

  loginHeader: {
    flex: 1,
    marginTop: 300,
  }

});

export default LoginHeaderBackground

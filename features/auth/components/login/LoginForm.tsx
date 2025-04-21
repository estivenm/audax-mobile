import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { router } from "expo-router";

const Loginform = () => {
  return (
    <>
      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#aaa" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Yourname@gmail.com"
          placeholderTextColor="#ccc"
          style={styles.input}
          keyboardType="email-address"
          accessibilityLabel="Email input"
        />
      </View>

      <TouchableOpacity style={styles.buttonContainer}  onPress={() => {
        router.replace('/welcome/welcomeScreen');
      }}>
        <LinearGradient colors={['#FFD700', '#FFAE00']} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </LinearGradient>
      </TouchableOpacity>
  </>
  )
}

const styles = StyleSheet.create({

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: '100%',
    marginBottom: 30,
  },
  input: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: '#fff',
    flex: 1,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins_500Medium',
    color: '#fff',
    fontSize: 17,
  }
});

export default Loginform


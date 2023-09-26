import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';

type Props = StackScreenProps<AuthStackParamList, 'Register'>;

export default function RegisterScreen({navigation}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleRegister = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    // Handle registration logic here
  };

  const handleFacebookRegister = () => {
    // Handle Facebook registration logic here
  };

  const handleGoogleRegister = () => {
    // Handle Google registration logic here
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, {flex: 1}]}
          placeholder="Password"
          secureTextEntry={isPasswordHidden}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          style={styles.eyeIcon}>
          {/* <Icon
            name={isPasswordHidden ? 'eye' : 'eye-off'}
            size={24}
            color="#7D7D7D"
          /> */}
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or continue with</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={handleFacebookRegister}>
          <Image
            source={require('@assets/icons8-facebook-48.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGoogleRegister}
          style={styles.googleIcon}>
          <Image
            source={require('@assets/icons8-google-48.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Already have an account? Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
  },
  eyeIcon: {
    padding: 10,
    borderLeftWidth: 1,
    borderColor: '#E5E5E5',
  },
  registerButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'gray',
  },
  orText: {
    marginHorizontal: 10,
    color: 'gray',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  googleIcon: {
    marginLeft: 10,
  },
  loginLink: {
    color: '#3498db',
    textAlign: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
});

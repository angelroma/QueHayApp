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
import Icon from 'react-native-vector-icons/Feather';
import {StackScreenProps} from '@react-navigation/stack';
import {Types} from '@utils/types';

type Props = StackScreenProps<Types.Navigation.AuthStackParamList, 'Login'>;

export default function LoginScreen({navigation}: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }

    // Handle login logic here
  };

  const handleFacebookLogin = () => {
    // Handle Facebook login logic here
  };

  const handleGoogleLogin = () => {
    // Handle Google login logic here
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
          <Icon
            name={isPasswordHidden ? 'eye' : 'eye-off'}
            size={24}
            color="#7D7D7D"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>or continue with</Text>
        <View style={styles.divider} />
      </View>
      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={handleFacebookLogin}>
          <Image
            source={require('@assets/icons8-facebook-48.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGoogleLogin} style={styles.googleIcon}>
          <Image
            source={require('@assets/icons8-google-48.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpLink}>Don't have an account? Sign up</Text>
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
  loginButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginButtonText: {
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
  signUpLink: {
    color: '#3498db',
    textAlign: 'center',
  },
  logo: {
    width: 30,
    height: 30,
  },
});

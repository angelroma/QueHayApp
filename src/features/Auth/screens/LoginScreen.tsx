import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParamList} from '@navigation/types';
import auth from '@react-native-firebase/auth';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Eye, EyeOff} from 'lucide-react-native';

type FormData = {
  email: string;
  password: string;
};

type Props = StackScreenProps<AuthStackParamList, 'LoginScreen'>;

const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export default function LoginScreen({navigation}: Props) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: 'angelr10mar@gmail.com',
      password: 'Mente!0Unica',
    },
  });

  const onSubmit = handleSubmit(data => handleLogin(data));

  const handleLogin = async (data: FormData) => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage('That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('That email address is invalid!');
        } else {
          setErrorMessage(error.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFacebookLogin = () => {};

  const handleGoogleLogin = () => {};

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          </View>
        )}
        name="email"
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="Password"
              secureTextEntry={isPasswordHidden}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordHidden(!isPasswordHidden)}
              style={styles.eyeIcon}>
              {isPasswordHidden ? (
                <Eye size={24} color="#7D7D7D" />
              ) : (
                <EyeOff size={24} color="#7D7D7D" />
              )}
            </TouchableOpacity>
          </View>
        )}
        name="password"
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <TouchableOpacity
        style={styles.loginButton}
        onPress={onSubmit}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
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

      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E5E5E5',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: '#E5E5E5',
    paddingHorizontal: 16,
  },
  eyeIcon: {
    paddingHorizontal: 16,
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
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

import React, {useState} from 'react';
import {Button, TextInput, View, Text, TouchableOpacity} from 'react-native';
import {SandboxStackParamList} from '@navigation/types';
import {supabase} from '@shared/api/client';
import {SignUpWithPasswordCredentials, User} from '@supabase/supabase-js';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<SandboxStackParamList, 'Authentication'>;

export default function AuthenticationScreen({}: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>('angelr10mar@gmail.com');
  const [password, setPassword] = useState<string>('Mente!0Unica');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleCaughtError = (caughtError: unknown) => {
    if (caughtError instanceof Error) {
      setError(caughtError.message);
    } else {
      setError('An unexpected error occurred.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleOnSignUp = async () => {
    try {
      const singup: SignUpWithPasswordCredentials = {
        email: email,
        password: password,
      };
      const {error} = await supabase.auth.signUp(singup);
      if (error) throw error;
    } catch (caughtError) {
      handleCaughtError(caughtError);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (caughtError) {
      handleCaughtError(caughtError);
    } finally {
      setLoading(false);
    }
  };

  const handleOnGetUser = async () => {
    try {
      const {data} = await supabase.auth.getUser();
      setUser(data?.user || null);
    } catch (caughtError) {
      handleCaughtError(caughtError);
    }
  };

  const handleOnSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (caughtError) {
      handleCaughtError(caughtError);
    }
  };

  const handleOnFacebookLogin = async () => {
    try {
      const {error} = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
      });
      if (error) throw error;
    } catch (caughtError) {
      handleCaughtError(caughtError);
    }
  };

  const handleOnGoogleLogin = async () => {
    try {
      const {error} = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });
      if (error) throw error;
    } catch (caughtError) {
      handleCaughtError(caughtError);
    }
  };

  const handleOnVerify = async () => {
    try {
      const {data, error} = await supabase.auth.verifyOtp({
        token_hash: '',
        type: 'email',
      });

      if (error) throw error;
    } catch (caughtError) {
      handleCaughtError(caughtError);
    }
  };

  return (
    <View style={{padding: 16}}>
      <Text>User: {user ? user.email : 'None'}</Text>

      <View style={{padding: 16, borderWidth: 1, borderRadius: 8}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Login</Text>

        <Text style={{marginTop: 16}}>Email</Text>
        <TextInput
          style={{borderWidth: 1, borderRadius: 4, padding: 8}}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={{marginTop: 16}}>Password</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 4,
          }}>
          <TextInput
            style={{flex: 1, padding: 8}}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={{padding: 8}}>
            <Text>{showPassword ? '👁️' : '🙈'}</Text>
          </TouchableOpacity>
        </View>

        <Button title="Get User" onPress={handleOnGetUser} />
        <Button title="Login" onPress={handleLogin} />
        <Button title="SignUp" onPress={handleOnSignUp} />
        <Button title="SignOut" onPress={handleOnSignOut} />
        <Button title="Login with Facebook" onPress={handleOnFacebookLogin} />
        <Button title="Login with Google" onPress={handleOnGoogleLogin} />
        <Button title="Verify" onPress={handleOnVerify} />

        {error && <Text style={{color: 'red'}}>{error}</Text>}
        {loading && <Text>Loading...</Text>}
      </View>
    </View>
  );
}

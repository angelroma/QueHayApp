import {NavigatorScreenParams} from '@react-navigation/native';

export type HomeStackParamList = {
  HomeScreen: undefined;
};

export type SearchStackParamList = {
  SearchScreen: {
    term?: string;
  };
  SearchTermScreen: {
    term?: string;
  };
  ArtifactScreen: {
    id: string;
  };
  ImageListScreen: {
    images: string[];
  };
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
};

export type AccountStackParamList = {
  AccountScreen: undefined;
};

export type SandboxStackParamList = {
  HomeScreen: undefined;
  AuthenticationScreen: undefined;
};

export type RootStackParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  SearchStack: NavigatorScreenParams<SearchStackParamList>;
  AccountStack: NavigatorScreenParams<
    AuthStackParamList | AccountStackParamList
  >;
  SandboxStack: NavigatorScreenParams<SandboxStackParamList>;
};

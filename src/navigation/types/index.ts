import {NavigatorScreenParams} from '@react-navigation/native';

export type MainStackParamList = {
  Search: undefined;
  List: {
    term?: string;
  };
  Artifact: {
    id: string;
  };
  ImageListScreen: {
    images: string[];
  };
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AccountStackParamList = {
  Account: undefined;
};

export type SandboxStackParamList = {
  Home: undefined;
  Authentication: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainStackParamList>;
  Account: NavigatorScreenParams<AccountStackParamList | AuthStackParamList>;
  Sandbox: NavigatorScreenParams<SandboxStackParamList>;
};

import {NavigatorScreenParams} from '@react-navigation/native';

export namespace Types {
  export interface OperatingHours {
    day: string;
    open: string;
    close: string;
  }

  export interface Review {
    userId: string;
    rating: number;
    text: string;
    date: Date;
  }

  export type Feature =
    | 'Entrega a domicilio'
    | 'Para llevar'
    | 'Reservaciones'
    | 'Servicio en mesa';

  export interface SocialMedia {
    platform: string;
    handle: string;
  }

  export interface OperationHours {
    day: string;
    openTime: string;
    closeTime: string;
  }

  export interface UserInteraction {
    likes: number;
    dislikes: number;
  }

  export interface Tag {
    id: string;
    label: string;
  }
  export interface Category {
    id: string;
    name: string;
  }

  export interface Address {
    street: string;
    city: string;
    state?: string; // optional, not all countries have states
    postalCode: string;
    country: string;
    latitude: number;
    longitude: number;
  }

  export interface Artifact {
    id: string;
    name: string;
    description: string;
    imageUrls: string[];
    createdTimestamp: Date;
    updatedTimestamp: Date;
    address: Address;
    features: Feature[];
    primaryPhone?: string;
    secondaryPhone?: string;
    email?: string;
    website?: string;
    socialMedia?: SocialMedia[];
    tags: Tag[];
    hoursOfOperation: OperationHours[];
    userInteractions: UserInteraction;
    category: string;
  }

  export namespace Navigation {
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

    export type RootStackParamList = {
      Main: NavigatorScreenParams<MainStackParamList>;
      Account: NavigatorScreenParams<
        AccountStackParamList | AuthStackParamList
      >;
    };
  }
}

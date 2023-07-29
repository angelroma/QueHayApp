export namespace Types {
  export type Feature =
    | 'Entrega a domicilio'
    | 'Para llevar'
    | 'Reservaciones'
    | 'Servicio en mesa';

  export interface Geolocation {
    latitude: number;
    longitude: number;
  }

  export interface Artifact {
    id: string;
    name: string;
    description: string;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    address: string;
    features: Feature[];
    geolocation: Geolocation;
    contact: {
      phone: string[];
      facebook: string;
      instagram: string;
      twitter: string;
      website: string;
      email: string;
    };
  }
}

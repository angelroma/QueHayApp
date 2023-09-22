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

export type SocialMediaPlatform =
  | 'Facebook'
  | 'Twitter'
  | 'Instagram'
  | 'LinkedIn';

export interface SocialMedia {
  platform: SocialMediaPlatform;
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
  category: Category;
}

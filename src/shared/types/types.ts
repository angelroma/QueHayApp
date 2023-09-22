export interface AppUser {
  id: string;
  email?: string;
}

export type StoreStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

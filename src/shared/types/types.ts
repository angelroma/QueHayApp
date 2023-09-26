export interface AppUser {
  id: string;
  email?: string | null;
  role: 'normal' | 'anonymous';
}

export type StoreStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

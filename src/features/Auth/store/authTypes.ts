import {AppUser, StoreStatus} from '@shared/types/types';

export interface AuthState {
  user: AppUser | null;
  status: StoreStatus;
  error: string | null;
}

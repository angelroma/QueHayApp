import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {AppUser} from '@shared/types/types';

export const mapFirebaseUserToAppUser = (
  user: FirebaseAuthTypes.User | null,
): AppUser | null => {
  if (!user) {
    return null;
  }
  return {
    id: user.uid,
    email: user.email,
    role: user.isAnonymous ? 'anonymous' : 'normal',
  };
};

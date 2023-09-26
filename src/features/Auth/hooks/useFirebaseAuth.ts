// hooks/useFirebaseAuth.ts

import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {mapFirebaseUserToAppUser} from '@features/Auth/mapping/authMap';
import {useAppDispatch} from '@store/store';
import authSlice from '@features/Auth/store/authSlice';

export default function useFirebaseAuth() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    auth()
      .signInAnonymously()
      .then(anonymous => {
        console.log('User signed in anonymously', anonymous.user.uid);
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }
        console.error(error);
      });

    const subscriber = auth().onAuthStateChanged(firebaseUser => {
      const user = mapFirebaseUserToAppUser(firebaseUser);
      dispatch(authSlice.actions.setUser(user));
    });

    // Unsubscribe on cleanup
    return subscriber;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

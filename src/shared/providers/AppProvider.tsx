import React, {useEffect} from 'react';
import {mapFirebaseUserToAppUser} from '@features/Auth/mapping/authMap';
import authSlice from '@features/Auth/store/authSlice';
import {useAppDispatch} from 'store/store';
import auth from '@react-native-firebase/auth';

export default function AppProvider({children}: {children: React.ReactNode}) {
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
    return subscriber;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

import React, {useEffect} from 'react';
import {mapSupabaseSessionToAppUser} from '@features/Auth/mapping/authMap';
import authSlice from '@features/Auth/store/authSlice';
import {supabase} from '@shared/api/client';
import {useAppDispatch} from 'store/store';

export default function AppProvider({children}: {children: React.ReactNode}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('onAuthStateChange', _event);
      // Redux is dispatching an action on initial session so this event is ignored
      if (_event === 'INITIAL_SESSION') {
        return;
      }
      const user = mapSupabaseSessionToAppUser(session);
      dispatch(authSlice.actions.setUser(user));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}

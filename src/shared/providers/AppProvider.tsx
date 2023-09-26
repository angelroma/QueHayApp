import React from 'react';
import useGeolocation from '@features/Geolocation/hooks/useGeolocation';
import useFirebaseAuth from '@features/Auth/hooks/useFirebaseAuth';

export default function AppProvider({children}: {children: React.ReactNode}) {
  useGeolocation();
  useFirebaseAuth();

  return (
    <>
      {/* You can pass down location as context or prop to child components if needed */}
      {children}
    </>
  );
}

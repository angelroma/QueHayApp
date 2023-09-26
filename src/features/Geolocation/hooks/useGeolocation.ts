// hooks/useGeolocation.ts

import {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import {
  setAddress,
  setLocation,
} from '@features/geolocation/store/geolocationSlice';

const GOOGLE_MAPS_API_KEY = 'YOUR_API_KEY_HERE';

async function getReadableAddress(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`,
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted_address;
    }
    return null;
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
}

export default function useGeolocation() {
  const dispatch = useDispatch();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        dispatch(setLocation({latitude, longitude}));

        const fetchedAddress = await getReadableAddress(latitude, longitude);
        if (!fetchedAddress) {
          return;
        }
        dispatch(setAddress(fetchedAddress));
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [dispatch]);
}

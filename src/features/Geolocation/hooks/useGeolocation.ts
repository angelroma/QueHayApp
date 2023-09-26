import {useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {
  setAddress,
  setLocation,
} from '@features/Geolocation/store/geolocationSlice';

const CLOUD_FUNCTION_URL = 'https://geolocation-u63tbz7ytq-uc.a.run.app';

async function getReadableAddress(
  latitude: number,
  longitude: number,
): Promise<string | null> {
  try {
    const response = await axios.post(CLOUD_FUNCTION_URL, {
      lat: latitude,
      lng: longitude,
    });
    const data = response.data;
    if (data && data.address) {
      return data.address;
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

        const address = await getReadableAddress(latitude, longitude);
        if (!address) {
          return;
        }
        dispatch(setAddress(address));
      },
      error => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, [dispatch]);
}

import {useEffect, useState} from 'react';
import {Types} from '../utils/types';

const useBusinessState = (hoursOfOperation: Types.OperationHours[]) => {
  const [state, setState] = useState('Closed now');

  const daysOfWeek: {
    [key: string]: number;
  } = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  useEffect(() => {
    // logic from checkBusinessState goes here
    const currentDay = new Date().getDay(); // Get current day
    const currentTime = new Date().getHours() * 60 + new Date().getMinutes(); // Get current time in minutes

    const currentDayHours = hoursOfOperation.find(
      hours => daysOfWeek[hours.day] === currentDay,
    ); // Get hours for current day

    if (currentDayHours) {
      const openTime =
        Number(currentDayHours.openTime.split(':')[0]) * 60 +
        Number(currentDayHours.openTime.split(':')[1]);
      const closeTime =
        Number(currentDayHours.closeTime.split(':')[0]) * 60 +
        Number(currentDayHours.closeTime.split(':')[1]);

      if (currentTime < openTime) {
        if (openTime - currentTime <= 60) {
          setState('Opening soon');
        } else {
          setState('Closed now');
        }
      } else if (currentTime > closeTime) {
        setState('Closed now');
      } else if (closeTime - currentTime <= 60) {
        setState('Closing soon');
      } else {
        setState('Open now');
      }
    } else {
      setState('Closed now');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoursOfOperation]);

  return state;
};

export default useBusinessState;

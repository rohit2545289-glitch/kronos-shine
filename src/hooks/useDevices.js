import { useState, useEffect } from 'react';
import { listenDevices } from '../firebase/config';

export const useDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = listenDevices((data) => {
      setDevices(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return { devices, loading };
};
import {createClient} from '@supabase/supabase-js';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';

const SecureStoreAdapter = {
  getItem: async (key: string) => {
    try {
      return await EncryptedStorage.getItem(key);
    } catch (error) {
      console.error('Failed to get item from EncryptedStorage:', error);
      return null;
    }
  },

  setItem: async (key: string, value: string) => {
    try {
      await EncryptedStorage.setItem(key, value);
    } catch (error) {
      console.error('Failed to set item in EncryptedStorage:', error);
    }
  },

  removeItem: async (key: string) => {
    try {
      const item = await EncryptedStorage.getItem(key);
      if (!item) {
        return;
      }
      await EncryptedStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove item from EncryptedStorage:', error);
    }
  },
};

if (typeof Config.SUPABASE_KEY !== 'string') {
  throw new Error('SUPABASE_KEY is missing or not correctly configured');
}

if (typeof Config.SUPABASE_URL !== 'string') {
  throw new Error('SUPABASE_URL is missing or not correctly configured');
}

export const supabase = createClient(Config.SUPABASE_URL, Config.SUPABASE_KEY, {
  auth: {
    storage: SecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

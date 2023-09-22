declare module 'react-native-config' {
  export interface NativeConfig {
    SUPABASE_KEY?: string;
    SUPABASE_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}

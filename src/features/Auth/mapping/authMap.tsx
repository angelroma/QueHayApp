import {AppUser} from '@shared/types/types';
import {Session} from '@supabase/supabase-js';

export const mapSupabaseSessionToAppUser = (
  session: Session | null,
): AppUser | null => {
  if (!session) {
    return null;
  }
  return {
    id: session.user.id,
    email: session.user.email,
  };
};

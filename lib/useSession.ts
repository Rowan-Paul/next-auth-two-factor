import { useRouter } from 'next/router';
import { useSession as useSessionNextAuth } from 'next-auth/react';
import { Session } from 'next-auth';

export function useSession(): Session {
  const { data: session } = useSessionNextAuth();
  const router = useRouter();

  if (session) {
    if (session.user.twofactor) {
      return session;
    }

    router.push('/2fa');
  }

  return null;
}

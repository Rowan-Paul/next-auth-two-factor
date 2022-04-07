import { useRouter } from 'next/router';
import { Session } from 'next-auth';
import { useEffect, useState } from 'react';

async function fetchSession() {
  const res = await fetch('/api/auth/session');
  const session = await res.json();

  if (Object.keys(session).length) {
    return session;
  }
  return null;
}

export function useSession(): Session {
  const router = useRouter();
  const [session, setSession] = useState<any>();

  useEffect(() => {
    fetchSession().then((res) => setSession(res));
  }, []);

  if (session) {
    if (session.user.twofactor) {
      return session;
    } else {
      router.push('/twofactor/new');
    }
  }

  return null;
}

import { signIn, signOut } from 'next-auth/react';
import { useSession } from '../lib/useSession';

const Homepage = (): JSX.Element => {
  const session = useSession();

  if (session) {
    return <button onClick={() => signOut()}>Sign out</button>;
  }

  return <button onClick={() => signIn()}>Sign in</button>;
};

export default Homepage;

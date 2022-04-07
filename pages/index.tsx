import { signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useSession } from '../lib/useSession';

const Homepage = (): JSX.Element => {
  const session = useSession();

  return (
    <div className="min-h-screen container m-auto px-20">
      <h1 className="text-2xl">next-auth two factor</h1>
      <p>
        This page shows a sign in or sign out button depending on if the user is signed in or out. If the user does not
        have a two factor code in their account, they will be redirected to /twofactor/new.
      </p>
      <div className="my-10 flex justify-center">
        {session ? (
          <button className="p-2 bg-blue-300 rounded" onClick={() => signOut()}>
            Sign out
          </button>
        ) : (
          <button
            className="p-2 bg-blue-300 rounded"
            onClick={() => signIn(undefined, { callbackUrl: '/twofactor/verify' })}
          >
            Sign in
          </button>
        )}
      </div>
      <h2 className="text-xl mb-2">Pages</h2>
      <div className="flex gap-2">
        <Link href="/twofactor/new">
          <a className="p-2 bg-blue-300 rounded inline-block">Two factor new</a>
        </Link>
        <Link href="/twofactor/verify">
          <a className="p-2 bg-blue-300 rounded inline-block">Two factor verify</a>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;

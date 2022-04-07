import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from '../../lib/useSession';

const VerifyTwoFactor = () => {
  const router = useRouter();
  const session = useSession();
  const [error, setError] = useState<boolean>();

  const onSubmitForm = (e: any) => {
    e.preventDefault();
    setError(false);

    const data = {
      token: e.target.code.value
    };

    fetch('/api/auth/verify', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (response.status === 200) {
        router.push('/');
      } else {
        setError(true);
      }
    });
  };

  if (session) {
    return (
      <div className="min-h-screen container m-auto px-20">
        <h1 className="text-2xl">Verify</h1>
        <p>
          Verify that it is you by entering your two factor code. Since there is no global state in the application, it
          is not yet enforced to fill in the 2fa code before proceding to other pages.
        </p>

        {error && <div className="text-red-400">Wrong code, try again</div>}

        <form onSubmit={onSubmitForm}>
          <div>
            <input className="border-solid border-2 m-2" type="number" name="code" id="code" required />
          </div>
          <div>
            <button className="p-2 bg-blue-300 rounded my-2" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  <div className="min-h-screen container m-auto px-20">
    <h1 className="text-2xl">Not logged in</h1>
    <Link href="/">If you are stuck on this page, click here to go back home</Link>
  </div>;
};

export default VerifyTwoFactor;

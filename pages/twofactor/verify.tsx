import { useRouter } from 'next/router';
import { useState } from 'react';

const VerifyTwoFactor = () => {
  const router = useRouter();
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

  return (
    <div className="min-h-screen container m-auto px-20">
      <h1 className="text-2xl">Verify</h1>
      <p>Verify that it is you by entering your two factor code.</p>

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
};

export default VerifyTwoFactor;

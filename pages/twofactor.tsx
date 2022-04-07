import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

import { useSession } from '../lib/useSession';

import { IVerifyData } from './api/auth/verify';

const TwoFactor = () => {
  const [secret, setSecret] = useState<any>();
  const [submitted, setSubmitted] = useState<boolean>();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    fetch('/api/auth/verify', {
      method: 'GET'
    })
      .then((response) => {
        return response.status === 200 && response.json();
      })
      .then((res) => setSecret(res.secret));
  }, []);

  const onSubmitForm = (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    const data: IVerifyData = {
      token: e.target.code.value,
      secret
    };

    fetch('/api/auth/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => response.status === 201 && router.push('/'));
  };

  if (submitted) {
    return (
      <div className="min-h-screen container m-auto px-20">
        <h1>Saving two factor...</h1>
      </div>
    );
  }

  if (session?.user.twofactor) {
    return (
      <div className="min-h-screen container m-auto px-20">
        <h1 className="text-2xl">You already have a two factor code!</h1>
        <Link href="/">Go back home</Link>
      </div>
    );
  } else {
    if (secret?.otpauth_url) {
      return (
        <div className="min-h-screen container m-auto px-20">
          <h1 className="text-2xl">Two factor</h1>
          <p>
            This pages fetches a speakeasy code from the api and generates a QRcode with it. After the user fills in the
            code in the input field the speakeasy code gets saved to the database and the user now has two factor
            enabled.
          </p>
          <div className="my-5">
            <h2 className="text-xl">QR code</h2>
            <div className="m-5">
              <QRCode value={secret.otpauth_url} />
            </div>
          </div>
          <div>
            <h3 className="text-lg">Fill in the code from your device</h3>
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
        </div>
      );
    }
  }

  return <>Loading</>;
};

export default TwoFactor;

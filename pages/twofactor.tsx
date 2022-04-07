import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';

import { useSession } from '../lib/useSession';

import { IVerifyData } from './api/auth/verify';

const TwoFactor = () => {
  const [secret, setSecret] = useState<any>();
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

  if (session?.user.twofactor) {
    return <>You already have a two factor code!</>;
  } else {
    if (secret?.otpauth_url) {
      return (
        <>
          <div>
            <QRCode value={secret.otpauth_url} />
          </div>
          <div>
            <form onSubmit={onSubmitForm}>
              <div>
                <label htmlFor="code">Code</label>
                <input type="number" name="code" id="code" required />
              </div>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          </div>
        </>
      );
    }
  }

  return <>Loading</>;
};

export default TwoFactor;

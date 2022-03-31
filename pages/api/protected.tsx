import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });

  if (session) {
    if (session.user?.twofactor) {
      res.status(200).send('Success');
    } else {
      res.status(403).send({ error: 'No two factor authentication' });
    }
  } else {
    res.status(401).send({ error: 'Not signed in' });
  }
};

export default handler;

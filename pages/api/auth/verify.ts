import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import prisma from '../../../lib/prisma';

const speakeasy = require('speakeasy');

export interface IVerifyData {
  token: number;
  secret: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session: any = await getSession({ req });

  switch (req.method) {
    case 'PUT':
      try {
        const secret = await prisma.user.findFirst({
          where: { id: session.user.id },
          select: { twofactor: true }
        });

        const verified = speakeasy.totp.verify({
          secret: secret.twofactor,
          encoding: 'ascii',
          token: req.body.token
        });

        if (verified) {
          return res.status(200).end();
        } else {
          return res.status(401).end();
        }
      } catch (error) {
        console.log(error);
        return res.status(500).end();
      }

    default:
      res.status(405).end();
      break;
  }
};

export default handler;

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
    case 'GET':
      try {
        if (session) {
          const secret = speakeasy.generateSecret({ name: "Rowan's two factor app" });

          return res.json({ secret });
        } else {
          return res.status(401).end();
        }
      } catch (error) {
        console.log(error);
        return res.status(500).end();
      }

    case 'POST':
      try {
        const verified = speakeasy.totp.verify({
          secret: req.body.secret?.ascii,
          encoding: 'ascii',
          token: req.body.token
        });

        if (verified) {
          await prisma.user.update({
            where: {
              id: session.user.id
            },
            data: {
              twofactor: req.body.secret?.ascii
            }
          });

          return res.status(201).end();
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

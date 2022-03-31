## Before startup

npx prisma db push

## Env variables

DATABASE_URL
NEXTAUTH_SECRET
EMAIL_SERVER
EMAIL_FROM
NEXTAUTH_URL

## Notes

- saves twofactor secret string in database
- checks when signing in whetever it has a twofactor, if not send error

- middleware van next-auth https://next-auth.js.org/configuration/nextjs#middleware
- werkt alleen met JWT tokens https://github.com/nextauthjs/next-auth/discussions/4265

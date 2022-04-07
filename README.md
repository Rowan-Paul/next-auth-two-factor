# next-auth-two-factor

Two factor authentication with next-auth using a custom `useSession` for checking if the user has two factor enabled.

[Middleware from next-auth](https://next-auth.js.org/configuration/nextjs#middleware) does not work with email login, because it needs a JWT token (see also [this discussion](https://github.com/nextauthjs/next-auth/discussions/4265))

## Before startup

Start database

```
docker compose-up
```

Push schema to database

```
npx prisma db push
```

Install packages

```
yarn
```

Start dev server

```
yarn dev
```

## Env variables

| Variable        |
| --------------- |
| DATABASE_URL    |
| NEXTAUTH_SECRET |
| EMAIL_SERVER    |
| EMAIL_FROM      |
| NEXTAUTH_URL    |

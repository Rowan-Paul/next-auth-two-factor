# next-auth-two-factor

> **Tip:** if you want to check out the code, but don't want to clone the repo, press `.` on your keyboard

Two factor authentication with next-auth using a custom `useSession` for checking if the user has two factor enabled.

[Middleware from next-auth](https://next-auth.js.org/configuration/nextjs#middleware) does not work with email login, because it needs a JWT token (see also [this discussion](https://github.com/nextauthjs/next-auth/discussions/4265))

### Sign in flow

![Sign in flow](/assets/sign-in-flow.svg)

### Protected page flow

Currently there is no protection against the signed in user just skipping the two factor code if he already has one registered. This could be solved by using a global state though.

![Protected page flow](/assets/protected-page-flow.svg)

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

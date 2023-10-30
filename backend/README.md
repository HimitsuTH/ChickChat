## Setup

```

    # go into backend folder
    $ cd backend

    # Install dependencies
    $ npm install

    # Run
    $ npm start

```

## Prisma

```

    # Create migrations from your Prisma schema, apply them to the database, generate artifacts (e.g. Prisma Client)
    $ prisma migrate dev

    # Pull the schema from an existing database, updating the Prisma schema
    $ prisma db pull

    # Push the Prisma schema state to the database
    $ prisma db push

```

## .env

```
     # https://jwt.io/

    $ DATABASE_URL="{Server}://root@localhost:{port}/{database name}"

    $ JWT_KEY="{Jwt key} You can find secure keys on random key generator websites."

  

```

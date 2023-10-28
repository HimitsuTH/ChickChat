## Setup

```

    # go into backend folder
    $ cd backend

    # Install dependencies
    $ npm install

    # setup database (if your want to edit)
    $ npx prisma migrate dev -name init

    # push schema on database
    $ npx prisma db push

    # Run
    $ npm start

```

## .env

```

    DATABASE_URL="{Server}://root@localhost:{port}/{database name}"

    JWT_KEY="{Jwt key} you can find key on https://jwt.io/"

```

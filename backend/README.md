## Setup

```

    # go into backend folder
    $ cd backend

    # Install dependencies
    $ npm install

    # setup database
    $ npx prisma migrate dev -name init

    # Run
    $ npm start

```

## .env

```

    DATABASE_URL="{Server}://root@localhost:{port}/{database name}"

```

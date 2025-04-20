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
    # Update Prisma Client to reflect changes in the Prisma schema file.
    $ prisma generate 

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

    $ DATABASE_URL="{Server}://{user}:{password}@localhost:{port}/{database name}"

    🍩 DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/test"🍩

    $ JWT_KEY="{Jwt key} 
    
    🍩 You can find secure keys by --> node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"🍩

  

```

## Docker
```
    $ docker-compose up -d 

    $ docker-compose down
    
```

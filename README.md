# wedding-site

The repo for the site that Larah and I created together for our wedding 🎉

## Local Setup

Instructions on running the site locally

### `.env` configurations

#### `packages/sanity`

The `sanity` package does not make use of any `.env` files.

### `packages/knex`

Create a new file named `.env` and put the following lines in:
```
POSTGRES_USER=<YOUR_SYSTEM_USERNAME>
POSTGRES_PASSWORD=<YOUR_SYSTEM_USERNAME>
```

### `packages/wedding-site`

Create a new file named `.env.local` and put the following lines in:
```
SANITY_PROJECT=<SANITY_PROJECT_ID>
SANITY_DATASET=production
SANITY_TOKEN=<SANITY_TOKEN>
AUTH0_SECRET=<SEE_AUTH0_ACCOUNT>
AUTH0_BASE_URL=http://localhost:3000
AUTH0_ISSUER_BASE_URL=<SEE_AUTH0_ACCOUNT>
AUTH0_CLIENT_ID=<SEE_AUTH0_ACCOUNT>
AUTH0_CLIENT_SECRET=<SEE_AUTH0_ACCOUNT>
```
* Log in to the Sanity dashboard and view the project to obtain/create a new Sanity token

### Database Setup

At the moment, the database the application uses is not automatically created on startup. Follow
these steps to get the database up and running. This only needs to be done once when setting up.

1. From the project root, run `docker-compose up -d`
1. Using a client like TablePlus, connect to the database > Create a new Database (`CTRL`+`K` to bring up the dialog)
1. Name the new database `wedding-site-db`
1. From the project root, run `yarn db:migrate:up`

#### Resetting your local database
The easiest way to reset your local database is to connect to the database instance using a client like TablePlus 
and manually-drop the "wedding-site-db" table.

1. Connect to the DB using TablePlus (or similar) > **BE SURE YOU ARE NOT CONNECTED TO THE PRODUCTION DB**
1. Create a new manual SQL query > paste in `DROP DATABASE "wedding-site-db";`
    * _WARNING: We'll lose all data if this is run on production_
1. Re-create the `wedding-site-db` database
1. From the root of the project, run `yarn db:migrate:up`

After running these steps, your database should be in a fresh state and have no data in it.

#### Creating a new migration

To create a new migration, from the root of the project, run `yarn db:migrate:make <spec_name> -x ts`. Then, edit
the newly-created file so that it performs whatever operations you'd like to run for the migration. Once you're
ready to run the migration, from the root, run `yarn db:migrate:up`.

### Running the stack

#### Sanity

From the root, run `yarn studio:dev`

#### Website

From the root, run `yarn web:dev`

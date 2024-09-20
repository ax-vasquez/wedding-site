# wedding-site

The repo for the site that Larah and I created together for our wedding 🎉

## Local Setup

Instructions on running the site locally

### `.env` configurations

#### `packages/sanity`

The `sanity` package does not make use of any `.env` files.

### `packages/wedding-site`

Create a new file named `.env.local` and put the following lines in:
```
SANITY_PROJECT=<SANITY_PROJECT_ID>
SANITY_DATASET=production
SANITY_TOKEN=<SANITY_TOKEN>
```
* Log in to the Sanity dashboard and view the project to obtain/create a new Sanity token

### Running the stack

#### Sanity

From the root, run `yarn studio:dev`

#### Website

From the root, run `yarn web:dev`

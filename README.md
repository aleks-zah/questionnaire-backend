# Questionnaire backend (questionnaire persistence API)

## Getting started

```sh
# Install dependencies
npm install

# or if you're using Yarn
yarn
```

_If you don't use [Yarn](https://yarnpkg.com/) you can just replace `yarn` with `npm` in the commands that follow._

### RethinkDB setup

Enter rethinkdb directory, and run

```sh
docker build -t rdb .
docker run --name -P rdb -itd rdb
```

Then you can begin development:

```sh
yarn run dev
```

This will launch a [nodemon](https://nodemon.io/) process for automatic server restarts when your code changes.

### Working with db

To drop all tables in database:

```sh
yarn run db:drop
```

To hydrate database with dummy data:

```sh
yarn run db:hydrate
```

### Testing

Testing is powered by [Jest](https://facebook.github.io/jest/). This project also uses [supertest](https://github.com/visionmedia/supertest) for demonstrating a simple routing smoke test suite. Feel free to remove supertest entirely if you don't wish to use it.

Start the test runner in watch mode with:

```sh
yarn test
```

You can also generate coverage with:

```sh
yarn test -- --coverage
```

(the extra double hyphen `--` is necessary).

### Linting

Linting is set up using [ESLint](http://eslint.org/). It uses ESLint's default [eslint:recommended](https://github.com/eslint/eslint/blob/master/conf/eslint.json) rules. Feel free to use your own rules and/or extend another popular linting config (e.g. [airbnb's](https://www.npmjs.com/package/eslint-config-airbnb) or [standard](https://github.com/feross/eslint-config-standard)).

Begin linting in watch mode with:

```sh
yarn run lint
```

### Environmental variables in development

The project uses [dotenv](https://www.npmjs.com/package/dotenv) for setting environmental variables during development. Simply copy `.env.example`, rename it to `.env` and add your env vars as you see fit. 

It is **strongly** recommended **never** to check in your .env file to version control. It should only include environment-specific values such as database passwords or API keys used in development. Your production env variables should be different and be set differently depending on your hosting solution. `dotenv` is only for development.

### Deployment

Deployment is specific to hosting platform/provider but generally:

```sh
yarn run build
```

will compile your src into `/dist`, and 

```sh
yarn start
```

will run `build` (via the `prestart` hook) and start the compiled application from the `/dist` folder.

The last command is generally what most hosting providers use to start your application when deployed, so it should take care of everything.

You can find small guides for Heroku, App Engine and AWS in [the deployment](DEPLOYMENT.md) document.

### Based on awesome express-babel boilerplate
https://github.com/vmasto/express-babel

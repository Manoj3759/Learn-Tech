# Future-student-exp-lp

#### URLs

- [staging]()
- [production]()

### Technology stack

This project leverages [Rocket Design System 3](https://master.d34gtp7q60k178.amplifyapp.com/?path=/docs/introduction-migration--docs), an in-house design system project of EdPlus at ASU. It also uses the following technologies:

- NuxtJS Framework v3
- Bootstrap 5
- Airtable
- TypeScript / JavaScript
- yarn

#### Local dev server

- `yarn dev`: to start a local dev server at `http://localhost:3000`.

#### Workflow

- Normal workflow, branch out of `Master` to add new feature to the project. The naming convention of feature branch is `feature/[feature-name]`.
- Once your work is done, issue a PR on `Master` branch, and once its approved, it will be passed onto the `staging` env.
- Once its merged onto the `test` branch, then you will be able to test the functionality on [staging environment]().

### Build Setup

```bash
# install dependencies
$ yarn install
# delete all file in content dir
$ yarn clean-content
# write all json files in content dir
$ yarn build-content
# serve with hot reload at localhost:3000
$ yarn dev
# Review production setup in local
$ yarn start
# generate static project /dist is where the files will reside
$ yarn generate
```
## Team
- **Manoj R** - *Developer* - [Manoj R](mraju10@asu.edu)

From Team,
Happy coding 🎉🙌

# express-packages
[![Build](https://github.com/corlogix/express-packages/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/corlogix/express-packages/actions/workflows/build.yml)

# Development

### Installation
```bash
npm install
```

### Open one bash and run the following to 'watch' for changes
```bash
npm start -- packages/expressico
```

### Open another bash and run the following to 'watch' for changes
```bash
npm start -- examples/expressico
```

# Contributing

## Create a branch
```bash
# can be 'feature' or 'bugfix'
git branch -B feature/useful-branch-name
```
## Commit your code
```bash
# commiting with the 'feat' tag will bump the package to the next 'minor' version 
git commit -m "feat: what I changed here"
# commiting with the 'fix' tag will bump the package to the next 'patch' version 
git commit -m "fix: what I fixed here"
# commiting with the 'chore' tag will not change the version of a package 
git commit -m "chore: nothing related to code changes"
```

[See More Documentation on Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0-beta.4/)

> ## ! NOTE ! 
> Contributors should NOT make breaking changes to a package.
> 
> Please discuss breaking changes with Code Owners
>
> Code Owners will likely make the breaking changes for you.
>

## Pull request
Create a pull-request from your `'feature'` or `'bugfix'` branch to the `'main'` branch.

Code owners will review the pull-request and merge when approved.

## Creating a release

Once your `pull-request` is merged into the `'main'` branch, the Code Owners will create a `"releases"` branch. This is the only branch which pushes new versions to the NPM repository.
_____
# Questions

Please reach out to the Code Owners via email if you have questions.

[corlogixco@gmail.com](mailto:corlogixco@gmail.com)
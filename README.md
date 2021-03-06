# TEAM RUNTIME TERROR - SOEN 490

![CI](https://github.com/kevinlizh1992/rtterror/actions/workflows/pull-request.yml/badge.svg) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=kevinlizh1992_rtterror&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=kevinlizh1992_rtterror)

## Members

| Name               | SID      |
| ------------------ | -------- |
| Kevin Zhong Hao Li | 40094223 |
| Taufique Ahmed     | 27761341 |
| Aymen Metallaoui   | 40057294 |
| Saebom Shin        | 40054234 |
| Niels Louis        | 40077435 |
| Shijun Deng        | 40084956 |
| Kimchheng heng     | 26809413 |
| Yu Xiang Zhang     | 40009567 |
| Quang Jimmy Nguyen | 40066773 |

## Description

A Clinic Management System that is comprised of the following modules:

- Appointment
- Access Control
- Invoice and Records
- Employee Management
- Client Management
- Service Management
- Notification and other

## Libraries and Frameworks

- [NodeJS](https://nodejs.org/)
- [Express.js](http://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Node Package Manager (npm)](https://www.npmjs.com/)

## Pre-Commit Hooks

The project is setup with [Husky](https://github.com/typicode/husky) which allows:

- Pre-Commit format checks with [Prettier](https://prettier.io/docs/en/install.html#git-hooks)
- Commit Message linting following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/#summary)
  - See also [the definition of each \<type>](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type).

### Install

Navigate to project root, and simply run `yarn`. This will install the packages required for pre-commit checks.

### Usage

- All commits of `.js`, `.jsx`, `.ts`, `.tsx` files will be formatted automatically following [this configuration](./.prettierrc).
- All commit messages will be checked according to [this structure](https://www.conventionalcommits.org/en/v1.0.0/#summary).

## Continuous Integration

The project is setup with workflows in GitHub Actions which allows:

- [Test running and coverage generation](https://github.com/kevinlizh1992/rtterror/actions/workflows/pull-request.yml) on pull requests
- [Branch name checking](https://github.com/kevinlizh1992/rtterror/actions/workflows/branch-naming.yml) on branch creation
  - Naming rule: `<type>/descibe-action`
  - See also [the definition of each \<type>](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#type).

# Havaiana

## Introduction

Havaiana is template for building full-stack serverless applications. The goal is to be able to match some out of the box functionality
provided by full featured non-serverless frameworks such as Rails or Django, but with way less magic, configuration, and without the
need to worry about the provisioning of servers or about scaling. Havaina is opinionated about what the right way to write modern
applications, but is also built out of component parts that should be reasonably easy to replace if your opinion differs.

## How to use

### Using `create-next-app`

Execute [`create-next-app`](https://github.com/segmentio/create-next-app) with [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) or [npx](https://github.com/zkat/npx#readme) to bootstrap the example:

```bash
npx create-next-app --example havaiana *-app
# or
yarn create next-app --example havaiana *-app
```

## Requirements

I came to build Havaiana so I could have an easy to deploy and mange solution for creating web services. I wanted to match ease of
spinning up something like Rails or Django with the composability, declarability, and simplicity I was used to from working deeply
with LISPs and functional programming languages. The experience I had working in production environments meant I had a strong opinion
about what a good production level web framework should be doing.

### Operations

* Automated deployments after tests pass
* Easy ability to create other environments
* Linting, autofixing when needed
* Type checking and support for easy refactoring
* Fixtures for testing
* First class testing environments

### Backend

* High availability database that does not sacrifice consistency or relational properties
* Easy scalability of database
* A system for managing migrations
* Authentication, permissioning, and roles
* A REST API and functions
* Serverside rendering of Javascript
* The ability run cron jobs
* Queues

### Frontend

* Offline first capabilities
* CSS modules and variables

### Experimental

* TCR support

## Implementation

In this section we'll be going over some of the technologies I've selected, why, and what goals I am
trying to achieve by using them in the way I am. Here are some of the start bits of infrastructure
and technology.

* Next.js
* Zeit Now
* FaunaDB
* Typescript

### Operations

One of my goals in all of this is to rapidly integrate my code into production. Everything in my operation
technology supports my goal of integrating code as soon as possible. 

Also used in this section

* Github
* Cypress

#### Automated Deployments + Environments

Now now offers a bunch of good tools for deployments. Using Now's easy Github integrations, I can trivially
get a branch to deploy and be visible. Using Github Jobs, I can run automated testing. FaunaDB's capabilities
in letting me create additional databses trivially allows me to create test environments with ease.

#### Linting + Typechecking

Typescript has a very mature environment when it comes to linting, typechecking, refactoring, and editor support.
It's a very easy language to develop in, and by enabling strict typechecking and linting rules, I can get a lot
of benefits in my developing.

#### Testing

The goal is for it to be trivial to spin up a test environment with fixtures, run detailed integration testing,
and integrate. Setting up aggressive 100% coverage requirements, linting, and typechecking supports correctness
and rapid integration. The benefits I enjoy from having strong environments, testing, linting, and typechecking
exist to ensure I can always be integrating and deploying working changes.

Cypress is used here to do integratin testing. It's probably the most impressive testing framework I've seen,
and the feedback it gives is really good. Getting snapshots and videos of failing tests allows me to iterate
on fixing them even quicker.

### Frontend

The theme in the frontend is modernity, organization, the ability to support a design system and work with
designers, and support for an offline first way of building apps. I want a progressive web framework
out of the box.

Also used in this section

* React
* Redux
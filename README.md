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
* Support a common language with designers
* Be principled about data
* Use data in realtime

### Experimental

* TCR support

## Implementation

In this section we'll be going over some of the technologies I've selected, why, and what goals I am
trying to achieve by using them in the way I am. Here are some of the start bits of infrastructure
and technology.

* Next.js + Zeit Now
* Typescript

### Operations

One of my goals in all of this is to rapidly integrate my code into production. Everything in my operation
technology supports my goal of integrating code as soon as possible. 

Also used in this section

* Github
* Cypress

#### Automated Deployments + Environments

Now now offers a bunch of good tools for deployments. Using Now's easy Github integrations, I can trivially
get a branch to deploy and be visible. Using Github CI, I can run automated testing. FaunaDB's capabilities
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

Integration testing is a critical component of the contract between developers and product. These tests
can prove that the code meets the ICs specified in product spec for the work. Cypress allows me to run
individual tests to demonstrate a passing IC.

### Backend

Data is critical in creating applications. The them of the backend section is supporting common patterns
for access, permissioning, and changing of data, as well as supporting a set of common operations on top
of data.

Also used in this section

* FaunaDB

Most of the rest of this document talks about goals, and how the technology I use meets those goals.
The backend section does not follow this rule because FaunaDB and Now are platforms. They provide
so much functionality out of the box that designing an architecture with them was less about having a problem
and looking for a solution, and more about having a platform and figuring out what problems were left
after leveraging the platform.

#### FaunaDB

FaunaDB is amazing. It is a NoSQL database that focuses on the C and P of CAP, while also providing some
pretty dang good A. I suggest reading their whitepaper and the Jepsen report. I'll wait. 

So here is what FaunaDB offers me as a platform

* A serverless database I can pay to scale as I need
* A flexible data model
* A very interesting and power propriatary language for data access and manipulation
* The concept of authentication, permissioning, and roles baked into the database
* Client and Server clients
* The ability to create subdatabases as I want

#### Now

Now finishes up the feature set I want in backends. It's just a dang good serverless platform.

Here's what it offers me

* Github integrations and environments for branches
* Serverless functions and the ability to make RESTful APIs
* Serverside rendering
* The ability to run cron jobs and a RabbitMQ instance via integrations
* The ability to use some other databases if I wanted to (a Redis instance on Digital Ocean comes
  to mind as a possible extra in the future.)

#### Migrations

These platforms currently offer me almost everything in my need to have list.

Migrations are the missing part here. To do this, I set up a Github CI job and built a manual way of
doing migrations

#### Looking Forward

There are some other nice to haves Now does not yet offer. Looking at their integrations section,
we might have them in the future. Also, to be fair, integrations aren't the end all be all. They're
just convenient, and I could set up a lot of these things manually with some effort (like I do with Fauna).
As I evolve this project, I might even do that.

Here are some integrations I'm interested in. All of them could reasonably be implemented manually.

* Sumologic (logging)
* Pagerduty (monitoring)
* Elastic Cloud (searching)

### Frontend

The theme in the frontend is modernity, organization, the ability to support a design system and work with
designers, and support for an offline first way of building apps. I want a progressive web framework
out of the box.

Also used in this section

* React
* Redux
* Redux Offline
* Reselect
* PostCSS
* Figma

#### Be principled about data

Coming to frontend from functional languages, data is always front and foremost on my mind. How are we getting data?
How are we storing data? How do we surface data? A good frontend should be a resiliant and intuitive portal into
the users data. React and Redux are great at managing data. 

React provides me with hooks like `useState` which are
intuitive ways to manage application state. I am able to couple state extremely close to where it will be used,
and not pollute global namespaces with things like input or button states.

Redux provides me a way to manage shared data, and a way to work with data stored in the database. `useSelector` allows
components to delcaratively ask for the data that matters to them, and to provide quick cached results using our
global state. Using selectors and reducers, I can be specific about type information, and snap components together
with confidence based on their data needs.

#### Offline First

Redux Offline is the star of this show. Working together with React + Redux, we are able to seamlessly integrate
with our FaunaDB instance and fetch the data we need. We are able to persist data for fast reconnects, do serverside
rendering when we can, and deal with network conditions.

#### Realtime Data

I think here's the place with the biggest place for improvement. We're doing long polling supported by the offline
functionality provided by Redux Offline. This framework is nice, but its hardly actually realtime. I think its
more resiliant to failure than most of the long polling I have done in the past, but having Fauna provide me
with some way to connect to changes in the database would go a long way here.

#### Design Systems and CSS

Design systems are great. My design tool of choice is not included in the code anywhere, but I have to shout out
Figma. Get your designers to use it. It is great. The designer I work with and I have a relatively simple tiered
system that is reflected in the structure of the codebase you see here.

* Styles
  These are colors, fonts, paddings, numbers. I capture how my designer does styles by using CSS variables. My designer
  and I have a contract, meaning we aim to stay in sync about how styles evolve.
* Components
  Also called design components to differntiate them from the React concept of a component.
  These are under the `./components` directory. These components do not connect to Redux, and are optimized for
  reuse. They generally take data as props, and not by connecting. They compose styles and basic built in components.
  My designer and I also have a contract around components.
* Features
  These are under the `./features`. Usually a feature gets its own directory. The `index.tsx` file contains the
  feature in question, but the directory contains css and other components needed to implement the feature.
  Features are characterized by needed to connect Redux state. Features dispatch actions. Features can be reused,
  but are generally not built with heavy reuse in mind. Feature directories contain extra subcomponents not meant for
  reuse. They are composed of styles, React components, design system components, and their own subcomponents.
  These feature folders can be broken up as features evolve. My designer and I do not have a contract around features,
  meaning the structure and organization of this directory is largely left up to devs.
* Pages
  Represented by the `./pages` directory. These pages should not have a ton of code, and should largely compose
  features and design components. My designer and I have a soft-contract on pages. Design doesn't track the structure of
  pages, but does track how pages look, usually by performing design review on features.

The way this project is organized exists to match this style of working with designers. The work can therefore support

* A structured approach to design atoms using styles
* A reusable component library using design components
* Design specs using features
* Routing using pages
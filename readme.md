# Tradeful API

## Description

The Tradeful API is designed to connect homeowners with tradespeople. It provides endpoints for listing, creating, and managing bookings, tradespeople, and homeowner profiles.

```
tradeful_api
├─ .babelrc
├─ .eslintrc.js
├─ .git
│  ├─ config
│  ├─ description
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ objects
│  │  ├─ info
│  │  └─ pack
│  │     ├─ pack-e099aba4e439a242f8768f1e7d4771138ed239c0.idx
│  │     ├─ pack-e099aba4e439a242f8768f1e7d4771138ed239c0.pack
│  │     └─ pack-e099aba4e439a242f8768f1e7d4771138ed239c0.rev
│  ├─ packed-refs
│  └─ refs
│     ├─ heads
│     │  └─ main
│     ├─ remotes
│     │  └─ origin
│     │     └─ HEAD
│     └─ tags
├─ .gitignore
├─ .husky
│  └─ pre-push
├─ .prettierrc
├─ package-lock.json
├─ package.json
├─ prometheus.yml
├─ readme.md
└─ src
   ├─ config
   │  ├─ database.js
   │  ├─ envConfig.js
   │  ├─ index.js
   │  ├─ limiter.js
   │  ├─ logger.js
   │  ├─ metrics.js
   │  ├─ mongooseConfig.js
   │  └─ swagger.js
   ├─ controllers
   │  ├─ auth
   │  │  ├─ homeowner
   │  │  │  └─ homeownerAuthController.js
   │  │  ├─ index.js
   │  │  └─ tradesperson
   │  │     └─ tradespersonAuthControllers.js
   │  ├─ authController.js
   │  ├─ bookingController.js
   │  ├─ index.js
   │  ├─ tradespersonController.js
   │  ├─ user
   │  │  ├─ homeowner
   │  │  │  └─ homeownerController.js
   │  │  ├─ index.js
   │  │  ├─ tradesman
   │  │  │  └─ tradesmanController.js
   │  │  └─ user
   │  │     └─ userController.js
   │  └─ userController.js
   ├─ middleware
   │  ├─ authMiddleware.js
   │  ├─ errorMiddleware.js
   │  └─ index.js
   ├─ models
   │  ├─ booking
   │  │  └─ bookingModel.js
   │  ├─ bookingModel.js
   │  ├─ index.js
   │  ├─ profiles
   │  │  ├─ homeownerModel.js
   │  │  ├─ index.js
   │  │  ├─ tradespersonModel.js
   │  │  └─ userModel.js
   │  ├─ reviewModel.js
   │  └─ reviews
   │     └─ reviewModel.js
   ├─ routes
   │  ├─ auth
   │  │  ├─ homeowner
   │  │  │  └─ homeownerAuthRoutes.js
   │  │  ├─ index.js
   │  │  └─ tradesperson
   │  │     └─ tradespersonAuthRoutes.js
   │  ├─ bookingRoutes.js
   │  ├─ index.js
   │  ├─ tradespersonRoutes.js
   │  ├─ user
   │  │  ├─ homeowner
   │  │  │  └─ homeownerRoutes.js
   │  │  ├─ index.js
   │  │  ├─ tradesman
   │  │  │  └─ tradesmanRoutes.js
   │  │  └─ user
   │  │     └─ userRoutes.js
   │  └─ userRoutes.js
   ├─ scripts
   │  └─ database
   │     └─ resetDb.js
   ├─ server.js
   ├─ services
   │  ├─ auth
   │  │  ├─ login
   │  │  │  ├─ homeowner
   │  │  │  │  └─ homeownerLoginService.js
   │  │  │  ├─ index.js
   │  │  │  └─ tradesperson
   │  │  │     └─ tradespersonLoginService.js
   │  │  └─ register
   │  │     ├─ homeowner
   │  │     │  └─ registerHomeownerAuthService.js
   │  │     ├─ index.js
   │  │     ├─ tradesperson
   │  │     │  └─ registerTradespersonAuthService.js
   │  │     └─ user
   │  │        └─ registerUserAuthService.js
   │  ├─ database
   │  │  ├─ booking
   │  │  │  └─ bookingDbService.js
   │  │  ├─ index.js
   │  │  └─ profiles
   │  │     ├─ homeowner
   │  │     │  └─ homeownerDatabaseService.js
   │  │     ├─ tradesmen
   │  │     │  └─ tradesmanDatabaseService.js
   │  │     └─ user
   │  │        └─ userDatabaseService.js
   │  ├─ firebase
   │  │  ├─ index.js
   │  │  └─ notifications
   │  │     ├─ index.js
   │  │     └─ notificationService.js
   │  └─ index.js
   ├─ tests
   │  ├─ server
   │  │  └─ server.test.js
   │  └─ services
   │     ├─ auth
   │     └─ db
   │        └─ profiles
   │           ├─ db.test.js
   │           ├─ homeowner
   │           │  └─ homeownerDbService.test.js
   │           ├─ tradesperson
   │           │  └─ tradespersonDbService.test.js
   │           └─ user
   │              └─ userDbService.test.js
   └─ utils
      ├─ apiFeatures.js
      ├─ auth
      │  └─ hash.js
      └─ validators
         ├─ booking
         │  └─ bookingValidator.js
         ├─ homeowner
         │  └─ homeownerValidator.js
         ├─ index.js
         ├─ tradesperson
         │  └─ tradespersonValidator.js
         └─ user
            └─ userValidator.js

```
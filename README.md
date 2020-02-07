# boxer-ratings-ui

A React JS web app which provides the front end for BoxerRatings.com

## Configuration

A .env file must be included in to the root which specifies the API it interacts with:

`REACT_APP_REST_API=http://dev.api.boxeratings.com`

## Development

You can run it locally from localhost:3000 like this:

`npm start`

Use docker-compose to build and run it from your docker host:

```shell script
$ docker-compose up --build -d
```

To push a rebuilt version of the image just do:

```shell script
$ docker push jimmydockerhub/boxer-ratings-ui:latest
```

## Production

To compile a production build do:

`npm run build`

Will probably put this behind Cloudfront on AWS.

## Tests

`npm test`

```shell script
 PASS  src/pages/MyRatings.test.js
 PASS  src/components/Container/Container.test.js
 PASS  src/components/BoxerList/BoxerListLoader.test.js
 PASS  src/components/NavBar/NavBar.test.js
 PASS  src/components/SortableBoxerList/SortableBoxerListLoader.test.js
 PASS  src/pages/ResetPassword.test.js
 PASS  src/components/SortableBoxerList/SortableBoxerList.test.js
 PASS  src/pages/ForgotPassword.test.js
 PASS  src/components/NavBar/Forms/LoginForm.test.js
 PASS  src/pages/OurRatings.test.js
 PASS  src/components/NavBar/Forms/SignUpForm.test.js
 PASS  src/pages/VerifyEmail.test.js
 PASS  src/components/BoxerList/BoxerList.test.js
 PASS  src/components/DivisionList/DivisionMenu.test.js
 PASS  src/components/DivisionList/DivisionSelector.test.js
 PASS  src/components/Message/ConfirmEmailMessage.test.js
 PASS  src/store/Actions/UserActions.test.js
 PASS  src/components/BoxerList/BoxerListItem.test.js
 PASS  src/components/Message/ErrorMessage.test.js
 PASS  src/components/SortableBoxerList/SortableBoxerListItem.test.js
 PASS  src/components/Message/SuccessMessage.test.js
 PASS  src/services/UserService.test.js
 PASS  src/services/RatingService.test.js

Test Suites: 23 passed, 23 total
Tests:       79 passed, 79 total
Snapshots:   7 passed, 7 total
Time:        12.157s
Ran all test suites.

Watch Usage: Press w to show more.
```

To generate a code coverage report do:

`npm test -- --coverage`

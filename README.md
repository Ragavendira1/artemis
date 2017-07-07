# Artemis

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.1.

## Create project

ng new artemis

## Materialize CSS - https://www.npmjs.com/package/angular2-materialize

npm install materialize-css --save
npm install angular2-materialize --save

npm install jquery@^2.2.4 --save
npm install hammerjs --save

## ng2-cookies

npm install ng2-cookies

## font awesome

npm install font-awesome --save

## ng2-chart

npm install ng2-charts --save
npm install chart.js --save
<script src="node_modules/chart.js/src/chart.js"></script>
import { ChartsModule } from 'ng2-charts/ng2-charts';

// In your App's module:
imports: [
   ChartsModule
]

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Environments

GitLab: 			192.168.22.164:80
GlassFish Admin: 	192.168.22.164:7000 - 7999
GlassFish HTTP: 	192.168.22.164:6000 - 6999
GlassFish HTTPS: 	192.168.22.164:9000 - 9999
NodeJS: 			192.168.22.164:5000 - 5999
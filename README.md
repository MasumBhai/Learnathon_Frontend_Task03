# Learnathon Task03 Frontend (angular) part

## Code Explanation for future

to install angular cli globally:

```bash
npm install -g @angular/cli
```

to check the version of angular:

```bash
ng version
```

to create new angular application:

```bash
ng new <application_name>
```

inside the application folder:

```bash
npm install -g npm
```

to generate a new component:

```bash
ng g c <component_name>
```

to make the app.module.ts as the main app module file while creating component:

```bash
ng g c <component_name> --module app
```

to create directive:

```bash
ng g directive <directive-name>
```

to generate a new module:

```bash
ng g m <module_name>
```

to create multiple component inside module:

```bash
ng g c <module_name>/<component_name>
```

to create services inside module:

```bash
ng g service <module_name>/<service_name>
```

to create typescript class:

```bash
ng g class <class_name>
```

to create inline styling:

```bash
ng g c <component_name> --inline-style
```

to create inline template:

```bash
ng g c <component_name> --inline-template
```

to create inline style & template together:

```bash
ng g c <component_name> --inline-style --inline-template
```

to add Material-UI:

```bash
ng add @angular/material
```

to add SweetAlert2:

```bash
npm install --save sweetalert2
```

& add the sweetalert2 path in ```angular.json``` file and

```c
"styles": [
      "src/styles.css",
      "./node_modules/sweetalert2/src/sweetalert2.scss"
    ],
```

to add moment (for date manipulation):

```bash
npm install moment --save
```

inside `app.component.ts` file:

```bash
import * as moment from 'moment';
age18Check(birthday: Date) {
    return moment(birthday).add(18, 'years').format('YYYY-MM-DD') <= moment().format('YYYY-MM-DD');
  }
```

to add ngx-datatables

```bash
npm i @swimlane/ngx-datatable --save
```

to add Angular JWT Library

```bash
npm i @auth0/angular-jwt --save
```
to add Route Guard for applying before a route opens or closes<br/>
The guard type can be `CanActivate`, `CanActivateChild`, `CanDeactivate` and `CanLoad`
```bash
ng g guard <guard_name>
```

You can also use:

```bash
ng generate directive|pipe|service|class|guard|interface|enum|module
```

## How to build

Run `ng build` to build the project. Or run `ng build --prod` command & before that set `environment.ts`
files `production = true` The build artifacts will be stored in the `dist/` directory.

## How to do unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## How to do end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a
package that implements end-to-end testing capabilities.

## How to run

Run `ng serve` or `ng serve --open` for a dev server. Navigate to `http://localhost:4200/`. The application will
automatically reload if you change any of the source files.

## Further Help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Budget error

In our angular.json, we should have a budgets keyword.

```bash
"budgets": [
    {
        "type": "initial",
        "maximumWarning": "2mb",
        "maximumError": "5mb"
    }
]
```

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express

## Deployment

To deploy this project run

```bash
  npm run deploy
```

## Documentation

[Documentation](https://docs.google.com/document/d/1aok0PPZw2ZqO7F74tU7SHv-wztoFhG5e1P7XcatPhOY/edit)

## License

MIT License

Copyright (c) [2022] [Abdullah Al Masum]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Feedback

If you have any feedback, please reach out to me at abdullahmasum6035@gmail.com

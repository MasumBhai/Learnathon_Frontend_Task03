import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './components/log-in/log-in.component';
import {RegisterComponent} from './components/register/register.component';
import {ShowUserComponent} from "./components/show-user/show-user.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'register'},
  {path: 'login', component: LogInComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'show_user', component: ShowUserComponent}
  // loadChildren:() => import('./login/login.module').then(_ => _.LoginModule)  // for lazy-loading of that module
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

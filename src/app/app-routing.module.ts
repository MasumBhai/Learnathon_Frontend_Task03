import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './components/log-in/log-in.component';
import {RegisterComponent} from './components/register/register.component';
import {ShowUserComponent} from "./components/show-user/show-user.component";
import {AuthGuard} from "./guards/auth.guard";
import {JwtAuthGuard} from "./guards/jwt-auth-guard";

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: 'login'}, // Route Guard
    {path: 'login', component: LogInComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'show_user', component: ShowUserComponent,canActivate:[JwtAuthGuard]}
    // {path: 'login', component: LogInComponent, canActivate: [AuthGuard]},
    // {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
    // {path: 'show_user', component: ShowUserComponent, canActivate: [AuthGuard]},
    // loadChildren:() => import('./login/login.module').then(_ => _.LoginModule)  // for lazy-loading of that module
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

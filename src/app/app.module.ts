import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AngularMaterialModule} from './angular-material.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LogInComponent} from './components/log-in/log-in.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from "./app-routing.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {ShowUserComponent} from './components/show-user/show-user.component'
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {AuthService} from "./service/auth.service";
import {AuthGuard} from "./guards/auth.guard";
import { HeaderComponent } from './components/header/header.component';
import {JwtAuthGuard} from "./guards/jwt-auth-guard";
import {JwtModule} from "@auth0/angular-jwt";
import apiUrlLink from '../assets/api_config/api_configuration.json'

const api_url = apiUrlLink.apiServer.url;
//function is use to get jwt token from local storage
export function tokenGetter() {
    return localStorage.getItem("jwt");
}

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LogInComponent,
        ShowUserComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AngularMaterialModule,
        NgbModule,
        HttpClientModule,
        NgxDatatableModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: [api_url],
                disallowedRoutes: []
            }
        }),
    ],
    providers: [ JwtAuthGuard], // AuthService needs to be globally accessed
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}



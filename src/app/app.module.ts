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
import { HttpClientModule } from '@angular/common/http';
import { ShowUserComponent } from './components/show-user/show-user.component'
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {AuthService} from "./service/auth.service";

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LogInComponent,
    ShowUserComponent
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
    NgxDatatableModule
  ],
  providers: [AuthService], // AuthService needs to be globally accessed
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}



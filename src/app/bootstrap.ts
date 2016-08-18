import {NgModule} from '@angular/core';
import {UserService} from './user-service';
import {AppComponent} from './app-component';
import {LoginService} from './login-service';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {DeprecatedFormsModule} from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  providers: [LoginService, UserService],
  imports: [BrowserModule, DeprecatedFormsModule],
  bootstrap: [AppComponent],
})
export class MyAppModule{}

platformBrowserDynamic().bootstrapModule(MyAppModule);

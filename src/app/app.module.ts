import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";


import { AppComponent } from './app.component';

import {routes} from './app.route';
import {HttpService} from "./core/http.service";
import {UserModule} from "./user/user.module";
import {RouteServie} from "./core/route.service";
import {SessionServie} from "./core/session.service";
import {TimelineModule} from "./timeline/timeline.module";
import {NavModule} from "./nav/nav.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot( routes ),
    UserModule,
    TimelineModule,
    NavModule
  ],
  providers: [
    HttpService,
    RouteServie,
    SessionServie
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

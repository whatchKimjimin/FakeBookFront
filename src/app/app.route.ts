import { Routes } from '@angular/router';

import {JoinComponent} from "./user/join/join.component";
import {LoginComponent} from "./user/login/login.component";
import {SessionServie} from "./core/session.service";
import {NewsfeedComponent} from "./timeline/newsfeed/newsfeed.component";
import {ProfileComponent} from "./user/profile/profile.component";


export const routes: Routes = [
  {
    path : 'profile/:id' ,
    component: ProfileComponent
  },
  {
    path : 'join' ,
    component: JoinComponent
  },
  {
    path : 'login' ,
    component: LoginComponent
  },
  {
    path : '**' ,
    component: NewsfeedComponent,
    canActivate: [SessionServie]
  }
];


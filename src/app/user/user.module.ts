import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { JoinComponent } from './join/join.component';
import {FormsModule} from "@angular/forms";
import { ProfileComponent } from './profile/profile.component';
import {TimelineModule} from "../timeline/timeline.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TimelineModule
  ],
  exports: [
    LoginComponent,
    JoinComponent,
    ProfileComponent,
  ],
  declarations: [LoginComponent, JoinComponent, ProfileComponent]
})
export class UserModule { }

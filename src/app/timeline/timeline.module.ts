import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { MytimelineComponent } from './mytimeline/mytimeline.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NewsfeedComponent,
    MytimelineComponent
  ],
  declarations: [NewsfeedComponent, MytimelineComponent]
})
export class TimelineModule { }

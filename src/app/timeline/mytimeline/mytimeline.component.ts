import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../core/http.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-mytimeline',
  templateUrl: './mytimeline.component.html',
  styleUrls: ['./mytimeline.component.css']
})
export class MytimelineComponent implements OnInit {

  USER_ID: number;
  timeline: Object[];

  constructor(private httpService: HttpService , private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.USER_ID = params.id );
  }


  ngOnInit() {
    this.getTimeLine( this.USER_ID );
  }

  getTimeLine( userId ) {
    this.httpService.sendGet('/timeline/me/' + userId ).subscribe( res => {
      if ( res.success === 'true' ) {
        this.timeline = JSON.parse(res.timeLineData);
      } else {
        alert('실패');
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

}

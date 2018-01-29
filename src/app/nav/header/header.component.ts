import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SessionServie} from "../../core/session.service";
import {RouteServie} from "../../core/route.service";
import {HttpService} from "../../core/http.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  ResponseFriendListData: object[];
  ResponseFriendBox: boolean;
  constructor(private httpService: HttpService ,
              private router: Router ,
              private sessionService: SessionServie ,
              private routeService: RouteServie) {
    this.ResponseFriendBox = true;
  }

  ngOnInit() {
    if ( this.sessionService.Active ) {
      this.getResponseFriendList();
    }

  }

  getResponseFriendList() {
    this.httpService.sendGet('/friend/list/response/' + this.sessionService.USER_ID ).subscribe( res => {
      if ( res.success === 'true' ) {
        this.ResponseFriendListData = JSON.parse( res.requestList );
        console.log( this.ResponseFriendListData );
      } else {
        alert('실패');
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  agreeFriend(id , data ) {
    this.httpService.sendGet('/friend/agree/' + id ).subscribe( res => {
      if ( res.success === 'true' ) {
        data.hide = 1;
      } else {
        alert('다시 시도해주세요.');
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  showResponseFriendBox() {
    this.ResponseFriendBox = !this.ResponseFriendBox;
  }

  logout() {
    localStorage.clear();
    location.href = '/login';
  }
}

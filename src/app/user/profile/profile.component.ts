import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpService} from '../../core/http.service';
import {SessionServie} from '../../core/session.service';
import {RouteServie} from "../../core/route.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  USER_ID: number;
  PROFILE_DATA: ProfileData;
  ME_FRIENDS: boolean;
  timelineShow: boolean;
  friendListData: any[];

  constructor(private httpService: HttpService ,
              private route: ActivatedRoute ,
              private sessionService: SessionServie,
              private routeService: RouteServie) {
    this.timelineShow = false;
    this.route.params.subscribe( params => this.USER_ID = parseInt( params.id , 10) );
    this.PROFILE_DATA = new ProfileData();
    if ( this.sessionService.USER_ID === this.USER_ID ) {
      this.ME_FRIENDS = true;
    } else {
      this.ME_FRIENDS = false;
    }
  }

  ngOnInit() {
    this.getProfile( this.USER_ID );
    this.friendCheck();
  }

  getProfile(userId) {
    this.httpService.sendGet('/user/profile/' + userId).subscribe( res => {
      if (res.success === 'true') {
        this.PROFILE_DATA = JSON.parse(res.ProfileData);
        console.log( this.PROFILE_DATA );
      } else {

      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  friendCheck() {
    const friendData = {
      Users_id: this.sessionService.USER_ID,
      Friends_id: this.USER_ID
    };
    console.log(friendData);

    this.httpService.sendPost('/friend/me' , friendData).subscribe( res => {
      console.log(res);
      if (res.success === 'true') {
        this.ME_FRIENDS = true;
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  requestFriend() {
    const requestData = {
      RequestUser_id: this.sessionService.USER_ID,
      ResponseUser_id: this.USER_ID
    };

    this.httpService.sendPost('/friend/request' , requestData).subscribe( res => {
      if (res.success === 'true') {
        this.ME_FRIENDS = true;
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  friendListShow() {
    this.timelineShow = true;

    this.httpService.sendGet('/friend/list/' + this.USER_ID ).subscribe( res => {
      console.log(res);
      if (res.success === 'true') {
        this.friendListData = JSON.parse(res.friendData);
      }else {
        alert('다시 시도해주세요');
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  timeLineShow() {
    this.timelineShow = false;
  }

}

class ProfileData {
  id: number;
  coverImgPath: String;
  profileImgPath: String;
  userName: String;
}

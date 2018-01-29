import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../core/http.service';
import {SessionServie} from '../../core/session.service';
import {RouteServie} from '../../core/route.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {

  timeline: any[];
  timeLineWriteData: TimelineData;
  commentData: any[];
  commentWriteData: any;

  constructor(private httpService: HttpService,
              private sessionService: SessionServie ,
              private routeService: RouteServie) {
    this.timeLineWriteData = new TimelineData();
    this.commentWriteData = new Object();
    this.commentData = new Array();
    if ( this.commentData[0] == null) {
      console.log('null');
    }
  }

  ngOnInit() {
    this.getNewsFeed();
    this.timeLineWriteData.Users_id = this.sessionService.USER_ID;
  }

  getNewsFeed() {
    this.httpService.sendGet('/timeline?userid=' + this.sessionService.USER_ID).subscribe( res => {
      if ( res.success === 'true') {
        this.timeline = JSON.parse( res.timeLineData );
        for ( const timelineData of this.timeline){
          timelineData.commentShow = true;
        }
      } else {

      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  onSubmit() {

    this.httpService.sendPost('/timeline' , this.timeLineWriteData).subscribe( res => {
      if ( res.success === 'true') {
        this.timeline.unshift( {
          username: this.sessionService.USER_NAME ,
          content: this.timeLineWriteData.content,
          WRITEHOUR: 1
        });
        this.timeLineWriteData = new TimelineData();
      } else {
          alert('다시 시도해주세요');
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  liked(timeline_data) {
    const likeData = {
      TimeLines_id: timeline_data.id,
      Users_id: this.sessionService.USER_ID
    };

    this.httpService.sendPost('/timeline/like' , likeData).subscribe( res => {
      if ( res.success === 'true') {
        console.log('성공');
        timeline_data.LikeCount++;
        timeline_data.LIKE = 'TRUE';
      } else {
        alert('다시 시도해주세요');
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  unLiked(timeline_data) {
    const likeData = {
      TimeLines_id: timeline_data.id,
      Users_id: this.sessionService.USER_ID
    };

    this.httpService.sendPost('/timeline/unlike' , likeData).subscribe( res => {
      if ( res.success === 'true') {
        console.log('성공');
        timeline_data.LikeCount--;
        timeline_data.LIKE = 'FALSE';
      } else {
        alert('다시 시도해주세요');
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  showComment(timeline_data) {
    // COMMENT BOX SHOW
    timeline_data.commentShow = !timeline_data.commentShow;
    // COMMENT DATA CHECK
    if ( this.commentData[ timeline_data.id ] != null ) {
      return false;
    }
    // GET COMMENT DATA
    this.httpService.sendGet('/timeline/comment/' + timeline_data.id).subscribe( res => {
      if ( res.success === 'true') {
        console.log('성공');
        this.commentData[ timeline_data.id ] = JSON.parse( res.commentData );
        console.log(this.commentData);
      } else {
        alert('다시 시도해주세요');
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }

  CommentSubmit(timeline_id) {
    // SET USER_ID
    this.commentWriteData.Users_id = this.sessionService.USER_ID;
    // SET TIMELINE_ID
    this.commentWriteData.TimeLines_id = timeline_id;

    // INSERT COMMENT
    this.httpService.sendPost('/timeline/comment' , this.commentWriteData).subscribe( res => {
      if ( res.success === 'true') {
        console.log('성공');
        this.commentWriteData.username = this.sessionService.USER_NAME;
        this.commentData[ timeline_id ].unshift(this.commentWriteData);
        this.commentWriteData = new Object();
      } else {
        alert('다시 시도해주세요');
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );

  }

}


// TIMELINE DATA VO
class TimelineData {
  Users_id: number;
  content: String;
  imgPath: String;
}

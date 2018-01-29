import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/http.service';
import { User } from '../../model/user.model';
import { RouteServie } from '../../core/route.service';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  user: User;

  constructor(private httpService: HttpService, private routeService: RouteServie) {
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submit');
    this.httpService.sendPost('/user', this.user).subscribe( res => {
      if (res.success === 'true' ) {
        alert('성공');
        this.routeService.gotoLogin();
      } else {
        alert(res.message);
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }
}

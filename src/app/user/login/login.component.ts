import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../core/http.service";
import {RouteServie} from '../../core/route.service';
import {User} from "../../model/user.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private httpService: HttpService, private routeService: RouteServie) {
    this.user = new User();
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log('submit');
    console.log(this.user);
    this.httpService.sendGet('/user?useremail=' + this.user.useremail + '&userpassword=' + this.user.userpassword).subscribe( res => {

      if (res.success === 'true' ) {
        localStorage.clear();
        localStorage.setItem('userData', res.UserData);
        location.href = '/';
      } else {
        alert('실패');
      }
    }, error => {
      // alert( error.message );
      alert( '알수 없는 오류가 발생하였습니다.' );
    } );
  }
}

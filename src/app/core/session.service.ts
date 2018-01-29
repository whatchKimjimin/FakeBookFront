import {Injectable} from '@angular/core';
import {RouteServie} from './route.service';


@Injectable()
export class SessionServie {

  Active: boolean;
  USER_ID: number;
  USER_NAME: String;
  constructor(private routeService: RouteServie) {
    if ( localStorage.getItem('userData') === null ) {
      this.Active = false;
    } else {
      this.setUserData(localStorage.getItem('userData'));
      this.Active = true;
    }
  }

  setUserData(userData) {
    const user = JSON.parse(userData);
    this.USER_ID = user.id;
    this.USER_NAME = user.username;
  }

  canActivate() {
    if (this.Active === false) {
      this.routeService.gotoLogin();
    }
    return this.Active;
  }
}

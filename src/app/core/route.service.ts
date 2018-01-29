import {Injectable} from "@angular/core";
import {Router} from "@angular/router";


@Injectable()
export class RouteServie {

  constructor( private router: Router) {
  }

  gotoHome() {
    this.router.navigate(['/']);
  }

  gotoLogin() {
    this.router.navigate(['/login']);
  }

  gotoJoin() {
    this.router.navigate(['/join']);
  }

  gotoProfile( USER_ID ) {
    this.router.navigate(['/profile/' + USER_ID ]);
  }

}

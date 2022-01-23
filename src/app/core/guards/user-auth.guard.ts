import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appToaster } from 'src/app/configs/app-toaster.config';
import { AuthenticationService } from '../authentication/authentication.service';
import { LoggerService } from '../services/logger.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate, CanActivateChild {

  constructor( private router: Router, private logger: LoggerService, private toasterService: ToastrService,
               private authenticationService: AuthenticationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.chekUser(route, state);

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.chekUser(route, state);
  }

  private chekUser(route: any, state: any): boolean {
    // const userType = this.authenticationService.getUserType();
    const isLogin = this.authenticationService.isLogin();
    // if (userType === 'user' && isLogin) {
    //   return true;
    // } else if (isLogin) {
    //   this.toasterService.error(appToaster.errorHead, 'Unauthorized: Access is denied');
    //   this.router.navigate(['auth/403']);
    //   return false;
    // } else {
    //   this.logger.log('Not authenticated, redirecting...');
    //   this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    //   return false;
    // }
    if (isLogin) {
      return true;
    } else {
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}

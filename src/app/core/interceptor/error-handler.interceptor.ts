import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
// import { LoggerService } from '../services/logger.service';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { appToaster } from 'src/app/configs/app-toaster.config';

import * as httpStatusCodes from 'http-status-codes';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(// private logger: LoggerService,
    private toasterService: ToastrService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => this.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (!environment.production) {
      // Do something with the error
      // this.logger.logError('Request error ' + JSON.stringify(response));
    }

    // console.error(error);
    const httpErrorCode = response['status'];
    const error = response['error']
    switch (httpErrorCode) {
      case 401:
        this.router.navigateByUrl('/auth/login');
        break;
      case httpStatusCodes.StatusCodes.FORBIDDEN:
        this.router.navigateByUrl('/auth/403');
        break;
      case 422:
        this.showError(error);
        break;
      case httpStatusCodes.StatusCodes.BAD_REQUEST:
        this.showError(error.message);
        break;
      default:
        this.toasterService.error( appToaster.errorHead, response.message);
    }


    throw response;
  }

  private showError(message: any): boolean {
    const parseMsg = message;
    if (parseMsg.response && typeof parseMsg.response === 'string') {
      this.toasterService.error(appToaster.errorHead, parseMsg.response);
      return true;
    }

    if (parseMsg.errors && typeof parseMsg.errors === 'object') {
      let popMsg: string;
      parseMsg.errors.forEach((msg: any) => {
        if (popMsg) {
          popMsg = popMsg.concat( `${msg.msg} ${msg.param}\n`);
        }
        this.toasterService.error(appToaster.errorHead, popMsg);
      });

      return true;
    }

    return false;
  }
}

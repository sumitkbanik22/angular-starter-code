import { FormsModule } from '@angular/forms';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from './interceptor/api-prefix.interceptor';
import { ErrorHandlerInterceptor } from './interceptor/error-handler.interceptor';
import { HttpTokenInterceptor } from './interceptor/http-token.interceptor';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { UserService } from './http/user/user.service';
import { AuthenticationService } from './authentication/authentication.service';
import { LoaderService } from './services/loader.service';
import { TitleService } from './services/title.service';
import { EnsureModuleLoadedOnceGuard } from './ensureModuleLoadedOnceGuard';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    UserService,
    AuthenticationService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule
  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule, titleService: TitleService) {
    super(parentModule);
    titleService.init();
  }
}

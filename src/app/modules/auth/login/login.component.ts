import { appSettings } from 'src/app/configs/app-settings.config';
import { UserAuthService } from './../../../core/http/user/user-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public isSubmit: boolean ;
  public hide: boolean;
  public returnUrl: string;
  public appSettings = appSettings;

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private fb: FormBuilder, private userAuthService: UserAuthService,
              private toasterService: ToastrService, private authenticationService: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.hide = true;
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || null;
    this.initializeLoginForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClickRegister(): void {
    this.router.navigate(['auth/register']);
  }

  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email, Validators.maxLength(250)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(14)]],
      rememberMe: ['']
    });
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
  get remember()   { return this.loginForm.get('remember'); }

  onClickSignIn(): void {
    this.subscription.add(this.userAuthService.login(this.loginForm.value).subscribe((data: any) => {
      this.toasterService.success(this.appSettings.loginSuccess);
      this.router.navigate(['user/home/dashboard']);
    }));
  }

}

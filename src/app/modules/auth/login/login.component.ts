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
  public returnUrl: string;
  public appSettings = appSettings;

  private subscription: Subscription = new Subscription();

  constructor(private router: Router, private fb: FormBuilder, private userAuthService: UserAuthService,
              private toasterService: ToastrService, private authenticationService: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authenticationService.logout();
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || 'user/home/dashboard';
    this.initializeLoginForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initializeLoginForm(): void {
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(255)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
    });
  }

  onClickLogin(): any {

    this.isSubmit = true;
    if (this.loginForm.invalid) {
      return false;
    }
    this.subscription.add(this.userAuthService.login(this.loginForm.value).subscribe((data: any) => {
      console.log(data);
      this.isSubmit = false;
      this.toasterService.success(this.appSettings.loginSuccess);
      this.router.navigate([this.returnUrl]);
    }));
  }

}

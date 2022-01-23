import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './user/footer/footer.component';
import { HeaderComponent } from './user/header/header.component';
import { LayoutComponent } from './user/layout/layout.component';
import { AuthLayoutComponent } from './auth/auth-layout/auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthHeaderComponent } from './auth/auth-header/auth-header.component';
import { AngularMaterialModule } from 'src/app/shared/module/angular-material.module';
import { RouterModule } from '@angular/router';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LayoutComponent,
  AuthLayoutComponent,
  AuthHeaderComponent
];

const BASE_MODULES = [
  CommonModule,
  FormsModule,
  RouterModule,
  ReactiveFormsModule,
  AngularMaterialModule
];

@NgModule({
  declarations: [
   ...COMPONENTS,
  ],
  imports: [
    ...BASE_MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...BASE_MODULES
  ],
  providers: [

  ]
})
export class LayoutModule { }

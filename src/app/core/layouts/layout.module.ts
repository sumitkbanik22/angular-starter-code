import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './user/footer/footer.component';
import { HeaderComponent } from './user/header/header.component';
import { LayoutComponent } from './user/layout/layout.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LayoutComponent,
  AuthLayoutComponent
];

const BASE_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
   ...COMPONENTS
  ],
  imports: [
    ...BASE_MODULES,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    ...COMPONENTS,
    ...BASE_MODULES
  ],
  providers: [

  ]
})
export class LayoutModule { }

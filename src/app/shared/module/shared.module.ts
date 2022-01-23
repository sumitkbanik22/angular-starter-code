import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from 'src/app/core/layouts/layout.module';

const COMPONENTS: any = [

];

const DIRECTIVES: any = [

];

const PIPES: any = [

];

const BASE_MODULES = [
  LayoutModule,
  FormsModule,
  ReactiveFormsModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES
  ],
  imports: [
    CommonModule,
    ...BASE_MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ...PIPES,
    ...BASE_MODULES
  ]
})
export class SharedModule { }

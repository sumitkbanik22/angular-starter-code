import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable()
export class LoaderService {

  constructor( private loader: NgxUiLoaderService ) {}

  show(): void {
    this.loader.start();
  }
  hide(): void {
    this.loader.stop();
  }
}

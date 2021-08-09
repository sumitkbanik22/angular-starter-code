import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { merge } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { appSettings } from 'src/app/configs/app-settings.config';

const APP_TITLE = appSettings.appTitle;
const SEPARATOR = ' | ';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  static ucFirst(str: string) {
    if ( !str ) {
        return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
) { }

init() {
    const onNavigationEnd = this.router.events.pipe(filter(event => event instanceof NavigationEnd));
    /*
    Change page title on navigation or language change, based on route data
    */
    merge(onNavigationEnd)
      .pipe(
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data)
      ).subscribe(event => {
        const title = event.title;
        if (title) {
          return this.titleService.setTitle(`${title} ${SEPARATOR} ${APP_TITLE} `);
        }  else {
        // If not, we do a little magic on the url to create an approximation
        return this.router.url.split('/').reduce((acc, frag) => {
          if (acc && frag) { acc += SEPARATOR; }
          return this.router.url.split('/').reduce(( acc, frag ) => {
            if ( acc && frag ) { acc += SEPARATOR; }
            return acc + TitleService.ucFirst(frag);
          });
        });
      }
      });
    }
}

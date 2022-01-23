import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Login } from 'src/app/shared/models/login.model';
import { environment } from 'src/environments/environment';

const loggedInUserDetails = 'currentUser';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http: HttpClient) { }

  login(loginData: Login): Observable<any> {
    const href = `${ environment.login }`;
    return this.http.post<any>(href, loginData, {observe: 'response'}).pipe(
        map((data: HttpResponse<any>) => {
            if (data.body.status === 'success') {
                const storage = loginData.rememberMe ? localStorage : sessionStorage;
                storage.setItem(loggedInUserDetails, JSON.stringify({...data.body.response, 'x-auth-token': data.headers.get('x-auth-token')}));
            }
            return data.body.response;
          }
        )
    );
  }

}

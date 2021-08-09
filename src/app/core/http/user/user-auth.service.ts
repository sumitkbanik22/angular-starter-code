import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
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
    return this.http.post<any>(href, loginData).pipe(
        tap((data) => {
            if (data.status === 'success') {
                const storage = loginData.rememberMe ? localStorage : sessionStorage;
                storage.setItem(loggedInUserDetails, JSON.stringify(data));
            }
            return data;
          }
        )
    );
  }

}

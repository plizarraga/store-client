import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private api = environment.api;

  private acccountSource = new BehaviorSubject<IUser>(null);
  public account$ = this.acccountSource.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(body: any) {
    return this.http.post(`${this.api}/sessions/`, body).pipe(
      tap((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.acccountSource.next(user);
        }
      })
    );
  }

  register(body: any) {
    return this.http.post(`${this.api}/users/`, body).pipe(
      tap((user: IUser) => {
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.acccountSource.next(null);
    this.router.navigateByUrl('/');
  }

  checkEmailExists(email: string) {
    return this.http.get(`${this.api}/users/email-exists?email=${email}`);
  }
}

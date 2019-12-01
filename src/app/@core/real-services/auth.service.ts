import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import {NbToastrService} from '@nebular/theme';
import {User} from '../models/user';
import {UserService} from './user.service';
import {SendUserService} from './send-user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem(environment.apiToken),
  });
  public authorized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  fullUrl = environment.apiUrl + '/order_service/brandCities/add';

  constructor(private http: HttpClient,
              private router: Router,
              private userService: UserService,
              private toastrService: NbToastrService,
              private sendUserService: SendUserService,
  ) {

  }

  authorize = (perf) => {
    this.authorized.next(true);
    const token = perf;
    const payload = jwt_decode(token);
    console.log(payload);
    this.sendUserService.sendUserInfo(payload);
    localStorage.setItem(environment.apiToken, token);
    localStorage.setItem(environment.roleName, payload.scopes.authority);
    localStorage.setItem(environment.userName, payload.sub);
    this.toastrService.success('Authorization Success');
    setTimeout(() => {
      this.router.navigate(['shop']);
    }, 500);
  }

  authenticated() {
    return this.http.get(environment.apiUrl + '/zuul/api/employees/authenticated', {
      headers: this.headers,
    });
  }

  authFail = () => {
    this.toastrService.danger('Неверный логин или пароль');
  }

  logininLara(username: string, password: string): Observable<any> {
    return this.http.post('http://unstable.smart-plaza.kz/module/v3/login', {
      username,
      password,
    }, {responseType: 'json'});
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post(environment.apiUrl + '/login', {login, password}, {responseType: 'text'});
  }

  current(): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/api/users/current', {});
  }

  register(user: User) {
    return this.userService.save(user);
  }

  isAuthorized() {
    if (!localStorage.getItem(environment.apiToken)) {
      return false;
      console.log('not authorized');
    } else {
      return true;
      console.log('authorized');
    }
  }

  removeToken() {
    localStorage.removeItem(environment.apiToken);
  }

  removeRole() {
    localStorage.removeItem(environment.roleName);
  }

  removeAll() {
    this.removeRole();
    this.removeToken();
  }

  getToken() {
    return localStorage.getItem(environment.apiToken);
  }

  getRole() {
    return localStorage.getItem(environment.roleName);
  }

  public logout() {
    this.authorized.next(false);
    localStorage.clear();
    this.toastrService.info('You are unauthorized');
    this.sendUserService.clearData();
    this.router.navigate(['/info']);
  }

  getMyRole() {

    if (!this.getMyApi()) {
      return null;
    }
    const base64Url = this.getMyApi().split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return (JSON.parse(window.atob(base64))).role;
  }

  getMyUsername() {
    if (!this.getMyApi()) {
      return null;
    }
    const base64Url = this.getMyApi().split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return (JSON.parse(window.atob(base64))).sub;
  }

  getMyApi() {
    return localStorage.getItem(environment.apiToken);
  }

}

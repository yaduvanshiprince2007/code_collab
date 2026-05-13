import { Injectable, signal } from '@angular/core';
import { ApiService } from './api-service';
import { ILoginReq, ILoginRes } from '../interface/ILogin';
import UrlConsts from '../constraints/urls';
import { IResponse } from '../interface/IResponse';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
import { IProfile } from '../interface/IProfile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenicated = signal<boolean>(false);
  #apiservice!: ApiService;
  userDetail = signal<IProfile | null>(null);

  constructor(private _apiservice: ApiService) {
    this.#apiservice = _apiservice;
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  removeToken() {
    sessionStorage.removeItem('token');
  }

  async validateToken() {
    try {
      const endpoint = UrlConsts.validateToken;
      const res = await firstValueFrom(this.#apiservice.get<IResponse>(endpoint));
      this.isAuthenicated.set( res.success ?? false);
      return res.success;
    } catch (err) {
      this.isAuthenicated.set(false);
      return false;
    }
  }
  userAuthicated(){
    return this.isAuthenicated();
  }

  async userlogin(loginReq: ILoginReq): Promise<IResponse> {
    try {
      const endpoit = UrlConsts.login;
      const data: ILoginReq = loginReq;
      const res = await firstValueFrom(this.#apiservice.post<IResponse>(endpoit, data));
      if (res.success) {
        const loginres = res.data as ILoginRes;
        this.userDetail.set(loginres);
        this.setToken(loginres.accessToken);
      }
      return res;
    } catch (err) {
      const failedres = err as HttpErrorResponse;
      console.log(failedres.message);
      return failedres.error;
    }
  }
}

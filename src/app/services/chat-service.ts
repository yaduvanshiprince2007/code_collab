import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import UrlConsts from '../constraints/urls';
import { IProfile } from '../interface/IProfile';
import { IResponse } from '../interface/IResponse';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  #apiservice!:ApiService;

  constructor(private _apiservice:ApiService) {
    this.#apiservice=_apiservice;
  }

  getFriendsList(){
    const endpoints = UrlConsts.getAllUsers;
    return this.#apiservice.get<IResponse>(endpoints);
  }
}

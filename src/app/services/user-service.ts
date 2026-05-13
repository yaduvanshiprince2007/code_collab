import { inject, Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { IRegisterUser } from '../interface/IProfile';
import UrlConsts from '../constraints/urls';
import { IResponse } from '../interface/IResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  #apiService= inject(ApiService);

  registerUser(input:IRegisterUser){
    this.#apiService.post<IResponse>(UrlConsts.register, input).subscribe({
      next:(res)=>console.log(res),
      error:(err)=>console.log(err)
    })
  }
}

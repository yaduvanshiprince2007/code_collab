import { Injectable, signal } from '@angular/core';
import { ApiService } from './api-service';
import UrlConsts from '../constraints/urls';
import { map, Observable } from 'rxjs';
import { IResponse } from '../interface/IResponse';
import { IProfile } from '../interface/IProfile'; // import your interface

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  #apiService: ApiService;
  currentuserDetail = signal<IProfile | null>(null);

  constructor(apiService: ApiService) {
    this.#apiService = apiService;
  }

  // Return an Observable instead of a Promise
  getprofileDetail(): Observable<IProfile | null> {
    const endpoint = UrlConsts.userProfile;
    
    return this.#apiService.get<IResponse>(endpoint).pipe(
      map((_res: IResponse) => {
        if (_res.success) {
          this.currentuserDetail.set(_res.data as IProfile);
          return _res.data as IProfile;
        }
        return null;
      })
    );
  }
}
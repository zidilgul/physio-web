import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable()
export class ReposService {
  constructor(private http: HttpClient) { }

  getList(url: string) {
    return this.http.get<any[]>(environment.baseUrl + url)
  }

  getById(url: string, id: number) {
    return this.http.get(environment.baseUrl + url + "/" + id);
  }

  post(url: string, object: any) {
    return this.http.post(environment.baseUrl + url, object);
  }

  getListWithParams(url: string, paramObject: any) {
    return this.http.post<any[]>(environment.baseUrl + url, paramObject);
  }

  delete(url: string, id: number) {
    return this.http.delete(environment.baseUrl + url + "/" + id);
  }

}

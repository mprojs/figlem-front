import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.apiUrl = environment.apiUrl;
  }

  // uploadImage(file): Observable<any> {
  //   console.log(file);
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   return this.http
  //     .post(this.apiUrl + '/api/images/upload', formData);
  // }
  //
  // saveFigure(figure: any): Observable<any> {
  //   return this.http.post(this.apiUrl + '/api/figures/save', figure);
  // }
  //
  // loadFigure(id: number): Observable<any> {
  //   return this.http.get(this.apiUrl + '/api/figures/' + id);
  // }
}

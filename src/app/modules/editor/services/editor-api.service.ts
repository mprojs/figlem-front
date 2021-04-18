import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Figure } from '../../../models/editor.models';
import { ImageResponse } from '../../../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class EditorApiService {
  constructor(private http: HttpClient) {}

  loadFigure(id: number): Observable<any> {
    return this.http.get('/api/figures/' + id).pipe(
      map((data: any) => {
        console.log(data);
        return {
          ...data
        } as Figure;
      })
    );
  }

  uploadImage(file: any): Observable<ImageResponse> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return this.http.post<ImageResponse>('/api/images/upload', formData);
  }

  saveFigure(figure: Partial<Figure>): Observable<Figure> {
    return this.http.post<Figure>('/api/figures/save', figure);
  }
}

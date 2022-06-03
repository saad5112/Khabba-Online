import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  baseUrl: string = 'http://localhost:8000/api/cart/';
  constructor(private http: HttpClient) {}

  // createOrder(data: any): Observable<any> {
  //   let url = `${this.baseUrl}/create`;
  //   return this.http.post(url, data).pipe();
  // }
}

// const data = {
//   arr: arrhsd,
//   hdgsd: [223,3444]
// }

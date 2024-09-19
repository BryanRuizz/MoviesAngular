import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private urlApi = 'http://localhost:3000/api/v1/movies';
  constructor(private http: HttpClient) { }

  public getdata(): Observable<any> {
    return this.http.get<any>(this.urlApi);
  }

  public deleteData(id: number): Observable<any> {
    const url = `${this.urlApi}/${id}`;
    return this.http.delete<any>(url);
  }

  
  public updateData(id:any,data: any): Observable<any> {
    // console.log("request update",id,data);
    const url = `${this.urlApi}/${id}`;
    return this.http.patch<any>(url, data);
  }

  public createData(data: any): Observable<any> {
    return this.http.post<any>(this.urlApi, data);
  }

  
}

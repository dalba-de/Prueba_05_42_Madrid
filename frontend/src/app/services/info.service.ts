import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  token: string = sessionStorage.getItem('token')!;

  constructor(private httpClient: HttpClient) { }

  getInfo() {
    const headers = new HttpHeaders({
      'Content-Type':'application/x-www-form-urlencoded',
      "Authorization": `Bearer ${this.token}`
    })
    return this.httpClient.get(`https://api.intra.42.fr/v2/me`, {headers: headers});
  }
}

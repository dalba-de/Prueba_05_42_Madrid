import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";

import { Router, RouterModule, Routes } from '@angular/router';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {

  token: any = [];

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token'))
    {
        this.router.navigate(['index'])
        return ;
    }    
    let uri: string = window.location.href;
    let auth = "/api/auth";
    uri = uri.replace('4200', '3000');
    let output = [uri.slice(0, 21), auth, uri.slice(21)].join('');
    uri = output;
    console.log(uri);
    this.apiService.getToken(uri).subscribe((result)=>{
        this.token = result;
        console.log('token ' + this.token.access_token);
        sessionStorage.setItem('token', this.token.access_token);
        this.router.navigate(['index']);
    })
  }

  getToken(uri: string): void {
    this.apiService.getToken(uri).subscribe(token => this.token = token);
  }

}

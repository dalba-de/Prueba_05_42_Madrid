import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { InfoService } from "../services/info.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  data: any = [];

  constructor(private router: Router, private infoService: InfoService) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('token'))
      this.router.navigate(['login']);

    this.infoService.getInfo().subscribe((data) => {
      console.log(data);
      this.data = data;
    })
    
  }



}

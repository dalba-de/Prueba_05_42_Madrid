import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { InfoService } from "../services/info.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

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

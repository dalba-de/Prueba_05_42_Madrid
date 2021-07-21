import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { InfoService } from "../services/info.service";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  data: any = [];
  piscine_skills: any = [];

  constructor(private router: Router, private infoService: InfoService) { }

  ngOnInit(): void {
    if(!sessionStorage.getItem('token'))
      this.router.navigate(['login']);

    this.infoService.getInfo().subscribe((data) => {
      console.log(data);
      this.data = data;
      this.piscine_skills = this.data.cursus_users[1].skills;
      console.log(this.piscine_skills)
    })
  }

}

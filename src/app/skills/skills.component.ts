import { Component, OnInit } from '@angular/core';
import data from '../data/data.json';
import { DataService } from '../data.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  skills: any;

  skillSets: any;
  nodataFound: any;
  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getresume();
  }

  skillset(set: any) {
    if (set == 1) {
      this.skillSets = this.skills.languages[0].web;
      this.nodataFound = this.skills.languages[0].web?.length;
    } else if (set == 2) {
      this.skillSets = this.skills.languages[1].backend;
      this.skills.languages[1].backend
        ? (this.nodataFound = this.skills.languages[1].backend?.length)
        : (this.nodataFound = 0);
    } else if (set == 3) {
      this.skillSets = this.skills.languages[2].testing;
      this.nodataFound = this.skills.languages[2].testing?.length;
    }
  }
  getresume() {
    this.data.getresume().subscribe((res: any) => {
      for (const key in res) {
        this.skills = res[key].aboutme.skills;
        this.skills ? (this.skillSets = this.skills.languages[0].web) : '';
      }
    });
  }
}

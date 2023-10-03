import { Component, OnInit } from '@angular/core';
import data from '../data/data.json'

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  skills = data.aboutme.skills
 
  skillSet: any;
  nodataFound: any;
  constructor() { }

  ngOnInit(): void {
    this.skillSet = this.skills.languages[0].web
  }

  skillset(set: any) {
    if(set == 'web'){
      this.skillSet = this.skills.languages[0].web
      this.nodataFound = this.skills.languages[0].web?.length
    } else if(set == 'backend'){
      this.skillSet = this.skills.languages[1].backend
      this.nodataFound = this.skills.languages[1].backend?.length
    } else if(set == 'testing'){
      this.skillSet = this.skills.languages[2].testing
      this.nodataFound = this.skills.languages[2].testing?.length
    }
  }
}

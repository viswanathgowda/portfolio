import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  skills = {
    languages: [
      {
        web:
          [
            { 'title': 'HTML', 'des': 'html des', 'icon': 'i-devicon-html5-wordmark' },
            { 'title': 'CSS', 'des': 'CSS des', 'icon': 'i-devicon-css3-wordmark' },
            { 'title': 'Javascript', 'des': 'Javascript des', 'icon': 'i-logos-javascript' },
            { 'title': 'typescript', 'des': 'typescript des', 'icon': 'i-vscode-icons-file-type-typescript-official' },
            { 'title': 'AngularJs', 'des': 'AngularJs des', 'icon':'i-devicon-angularjs-wordmark' },
            { 'title': 'angular2+', 'des': 'angular2+ des', 'icon': 'i-vscode-icons-file-type-angular' }
          ]
      },
      {
        backend: []
      },
      {
        testing: [
          { 'title': 'Manual Testing', 'des': 'Manual Testing des'}
        ]
      }
    ]
  }
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

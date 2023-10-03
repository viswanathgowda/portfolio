import { Component, OnInit } from '@angular/core';
import data from '../data/data.json'

@Component({
  selector: 'app-usecases',
  templateUrl: './usecases.component.html',
  styleUrls: ['./usecases.component.css']
})
export class UsecasesComponent implements OnInit {
  usecases = data.usecases
 
  constructor() { }

  ngOnInit(): void {
  }

}

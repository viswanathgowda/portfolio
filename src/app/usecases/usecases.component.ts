import { Component, OnInit } from '@angular/core';
import data from '../data/data.json'
import { DataService } from '../data.service';

@Component({
  selector: 'app-usecases',
  templateUrl: './usecases.component.html',
  styleUrls: ['./usecases.component.css']
})
export class UsecasesComponent implements OnInit {
  usecases:any;
 
  constructor(private data:DataService) { }

  ngOnInit(): void {
    this.getresume()
  }
   getresume(){
    this.data.getresume().subscribe((res: any) => {
      for(const key in res){
        this.usecases = res[key].usecases
      }
    })
  }
}

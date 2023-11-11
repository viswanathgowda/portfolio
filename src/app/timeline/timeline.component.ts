import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '../shared.service';
import data from '../data/data.json'
import { DataService } from '../data.service';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  viewIn: any
  data:any
  constructor(private rdata:DataService) { }

  ngOnInit(): void {
    this.getresume()
  }
  getresume(){
    this.rdata.getresume().subscribe((res: any) => {
      for(const key in res){
        this.data = res[key].education
      }
    })
  }

}

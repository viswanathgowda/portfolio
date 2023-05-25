import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  viewIn: any
  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    // let callserv: boolean = true
    // this.shared.getReloadObservable().subscribe((data:any) =>{
    //   this.viewIn = data
    //   if(data === '2' && callserv){
    //     callserv = false
    //     console.log(data)
    //     // this.ngOnInit();
        
    //   }
    // })
    
  }


}

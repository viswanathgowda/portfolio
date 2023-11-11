import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import data from './data/data.json'
import { map } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'portfolio';
  resume = data
  constructor(private http: HttpClient){

  }
  ngOnInit(): void {
    
    // this.http.post('https://portfolio-2cdde-default-rtdb.firebaseio.com/resume.json', this.resume)
    // .subscribe(res => {
    //   console.log(res)
    // })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { computeStyles } from '@popperjs/core';
import { env } from 'process';
import { Observable, Subject, map, of, shareReplay, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: any; // cache the data
  private data$!: Observable<any>; // cache the observable
  private clientdata = new Subject<any>()
  public clientdata$: Observable<any> = this.clientdata.asObservable();
  ipAddress: any;
  currentDate!: string;
  currentTimeZone!: string;
  baseUrl: any = environment.firebaseUrl.baseUrl;
  apiUrl: any = environment.ipAddress.ipUrl;

  constructor(private http: HttpClient) {
    this.getresume()
    this.getIpaddress()
    this.getDateAndTimeZone()
  }

  getresume(): Observable<any> {
    if (this.data) {
      // if data is already cached, return an observable of the data
      return of(this.data);
    } else if (this.data$) {
      // if observable is already cached, return the same observable
      return this.data$;
    } else {
      // if nothing is cached, make a new API call and cache the observable
      const url = `${this.baseUrl}/${'resume'}.json`;
      this.data$ = this.http.get<any>(url).pipe(
        // use shareReplay to multicast the observable to multiple subscribers
        shareReplay(1),
        // use tap to cache the data when the observable emits
        tap(data => this.data = data)
      );
      return this.data$;
    }
  }

  getIpaddress() {
    fetch(this.apiUrl)
      .then(response => response.json())
      .then(data => {
        this.ipAddress = data.ip;
        if (this.ipAddress) this.getclientdata()
      });
  }
  // Get the date and timezone using Date and Intl objects
  getDateAndTimeZone() {
    // Get the current date and time
    this.currentDate = new Date().toString()
    // Get the current timezone
    this.currentTimeZone = (Intl.DateTimeFormat().resolvedOptions().timeZone).toString()
  }
  getclientdata(){
    // if nothing is cached, make a new API call and cache the observable
    const url = `${this.baseUrl}/${'client'}.json`;
    this.http.get<any>(url).pipe(
      map(res => {
        for (const key in res) {
          if (res[key].ipAddress == this.ipAddress) {
            let resdate = new Date(res[key].currentDate)
            if ((new Date().getTime() - resdate.getTime()) / 3600000 < 24) {
              let clientdata = {
                  ipAddress: this.ipAddress,
                  view: res[key].view,
                  currentDate: this.currentDate,
                  currentTimeZone: this.currentTimeZone,
                  reputation: (res[key].reputation ? 1+res[key].reputation : 1)
                }
              this.updateclientdat(clientdata, key);
            } else {
              let clientdata = {
                ipAddress: this.ipAddress,
                view: 1+res[key].view,
                currentDate: this.currentDate,
                currentTimeZone: this.currentTimeZone,
                reputation: (res[key].reputation ? 1+res[key].reputation : 1)
              }
              this.updateclientdat(clientdata, key);
            }
          } else {
            // POST API for new client
            let clientdata = {
              ipAddress: this.ipAddress,
              view: 1,
              currentDate: this.currentDate,
              currentTimeZone: this.currentTimeZone,
            }
            console.log(clientdata)
            if(clientdata.ipAddress) this.sendclientdata(clientdata)
          }
        }
        let clientdata = {
          ipAddress: this.ipAddress,
          view: 1,
          currentDate: this.currentDate,
          currentTimeZone: this.currentTimeZone,

        }
        if(res == null){
          if(clientdata.ipAddress) this.sendclientdata(clientdata)
        }
      })
    ).subscribe( () => console.log('cleintdatarecived'))
  }

  sendclientdata(clientdata: { ipAddress: any; view: number; currentDate: string; currentTimeZone: string; reputation? : any}) {
    // if nothing is cached, make a new API call and cache the observable
    const url = `${this.baseUrl}/${'client'}.json`;
    this.http.post<any>(url, clientdata).pipe(
      // use shareReplay to multicast the observable to multiple subscribers
      shareReplay(1),
      // use tap to cache the data when the observable emits
      tap()
    ).subscribe(data => console.log(''))
  }
  updateclientdat(clientdata: { ipAddress: any; currentDate: string; currentTimeZone: string; reputation: number; view?: number; }, documentId: any) {
    const url = `${this.baseUrl}/${'client'}/${documentId}.json`;
    this.http.put<any>(url, clientdata).pipe(
      // use shareReplay to multicast the observable to multiple subscribers
      shareReplay(1),
      // use tap to cache the data when the observable emits
      tap((data)=>{
        this.clientdata.next(data)
      })
    ).subscribe()
  }
}

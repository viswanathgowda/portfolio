import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, of, shareReplay, switchMap, tap } from 'rxjs';
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
  getclientdata() {
    const url = `${this.baseUrl}/client.json`;

    this.http.get<any>(url).pipe(
      switchMap(res => {
        // Initialize data with default values
        let data = {
          views: 0,
          reputation: 0
        };

        // Calculate views and reputation from the response data
        for (const key in res) {
          if (res[key].view || res[key].reputation) {
            data.views += res[key].view || 0;
            data.reputation += res[key].reputation || 0;
          }
        }

        // If client does not exist, increment views and reputation
        if (!Object.keys(res).some(key => res[key].ipAddress === this.ipAddress)) {
          data.views += 1;
          // data.reputation += 1;
          // Send new client data
          let clientdata = {
            ipAddress: this.ipAddress,
            view: 1,
            currentDate: this.currentDate,
            currentTimeZone: this.currentTimeZone,
          };
          return this.sendclientdata(clientdata).pipe(
            map(() => data) // Assuming sendclientdata returns an observable
          );
        }

        // If client exists, update views and reputation
        const existingClientKey: any = Object.keys(res).find(key => res[key].ipAddress === this.ipAddress);
        const existingClient = res[existingClientKey];
        const resdate = new Date(existingClient.currentDate);
        const hoursDifference = (new Date().getTime() - resdate.getTime()) / 3600000;

        let clientdata = {
          ipAddress: this.ipAddress,
          view: existingClient.view + (hoursDifference < 24 ? 0 : 1),
          currentDate: this.currentDate,
          currentTimeZone: this.currentTimeZone,
          reputation: (existingClient.reputation ? existingClient.reputation + 1 : 1),
        };

        return this.updateclientdat(clientdata, existingClientKey).pipe(
          map(() => data) // Assuming updateclientdat returns an observable
        );
      })
    ).subscribe(data => {
      this.clientdata.next(data);
      console.log('client data received');
    });
  }
  sendclientdata(clientdata: any): Observable<any> {
    // Assuming some HTTP request here
    return this.http.post<any>(`${this.baseUrl}/client.json`, clientdata);
  }
  updateclientdat(clientdata: any, key: string): Observable<any> {
    // Assuming some HTTP request here
    return this.http.put<any>(`${this.baseUrl}/client/${key}.json`, clientdata);
  }
}

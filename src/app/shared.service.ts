import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private reloadSubject : BehaviorSubject<string> = new BehaviorSubject<string>('')

  constructor() { }

  reloadComponent(data: any) {
    this.reloadSubject.next(data);
  }

  getReloadObservable() {
    return this.reloadSubject.asObservable();
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.css']
})
export class ContactpageComponent implements OnInit {

  // private map!: google.maps.Map;
  // location = {
  //   'lat': 12.916576,
  //   'lang': 77.610115
  // }
  // center: google.maps.LatLngLiteral = { lat: 51.5074, lng: -0.1278 };
  // zoom = 10;
  // markerPosition: google.maps.LatLngLiteral = { lat: 51.5074, lng: -0.1278 };
  // infoWindowPosition: google.maps.LatLngLiteral = { lat: 51.5074, lng: -0.1278 };
  // infoWindowOpened = false;

  constructor() { }

  ngOnInit(): void {
    this.googleMap()
  }

  googleMap(){
  }
}

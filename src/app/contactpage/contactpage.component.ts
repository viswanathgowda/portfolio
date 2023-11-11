import { Component, OnInit } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { styles } from '../mapstyles';
import * as data from '../data/data.json'
import { DataService } from '../data.service';


@Component({
  selector: 'app-contactpage',
  templateUrl: './contactpage.component.html',
  styleUrls: ['./contactpage.component.css']
})
export class ContactpageComponent implements OnInit {
  resume: any
  arrlglt = [
    {
      icon: 'assets/young-bearded-man-with-striped-shirt.jpg',
      title: 'Its me Vishwa.',
      latd: 12.90601299971035,
		  langtd: 77.60589159417181,
    },
    {
      icon: 'assets/icons8-company-48.jpg',
      title: 'Employer/company',
      latd:  16.5833,
		  langtd: 82.0167
    },  
  ]
 
  private map!: google.maps.Map;
  latitude: any;
  longitude: any;
  like: boolean = false;
  constructor(private rdata: DataService) { }

  ngOnInit(): void {
    this.getresume()
    this.getcurrentLocation()
    this.like = false;
  }

  getcurrentLocation(){
    navigator.geolocation.getCurrentPosition((position) =>{
        this.latitude = position.coords.latitude;
        const latd = parseFloat(this.latitude);
        this.longitude = position.coords.longitude;
        // this.langtd = parseFloat(this.longitude)
        console.log(position, this.latitude, latd)
        let l = {...this.arrlglt[1], latd : this.latitude, langtd: this.longitude}
        this.arrlglt[1] = l
        l ? this.googleMap() : ''
    })
  }
  googleMap(){
    let loader = new Loader({
      apiKey: 'AIzaSyCtfYgcatV9vr5B5LhVWFE_2GFgI2IRU_Q'
    })
    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map")!, {
        center: { lat: this.arrlglt[0].latd, lng: this.arrlglt[0].langtd },
        zoom: 20,
        styles: styles
      })
      if(this.arrlglt.length){
        for(let l of this.arrlglt){
          const marker = new google.maps.Marker({
            position: new google.maps.LatLng(l.latd, l.langtd),
            map: this.map,
            title: l.title,
            icon: {
            url: l.icon,
            scaledSize: new google.maps.Size(36, 36),
            /**
             * The position at which to anchor an image in correspondence to the
             * location of the marker on the map. By default, the anchor is located
             * along the center point of the bottom of the image.
             */
            anchor: new google.maps.Point(18, 18),
            },           
          });
          // Create an info window to share between markers.
          const infoWindow = new google.maps.InfoWindow();
          marker.addListener("click", () => {
            infoWindow.close();
            infoWindow.setContent(marker.getTitle());
            infoWindow.open(marker.getMap(), marker);
          });
        }
      }
    })
    
  }
  share(){
    const url = (window.location.href).toString()
    const data = {
      title: 'portfolio',
      text: 'viswanath',
      url: url
    }
    if(navigator.canShare(data) && navigator.canShare()){
      navigator.share(data)
    }else{
      alert('sharing not supported for this device')
    }
  }
  getresume(){
    this.rdata.getresume().subscribe((res: any) => {
      for(const key in res){
        this.resume = res[key]
        console.log(res)
      }
    })
  }
}

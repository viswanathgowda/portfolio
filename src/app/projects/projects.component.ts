import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import data from '../data/data.json'
import { DataService } from '../data.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  currentIndex: number = 0;
  projects: any;
  

  constructor(private data: DataService) { }

  ngOnInit(): void {
   this.getresume()
  }

  moveLeft() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
    console.log(this.currentIndex)
   this.carouselScrollLeft();
  }
  moveRight() {
    this.currentIndex = Math.min(this.currentIndex + 1, this.projects.length - 4);
    console.log(this.currentIndex)
  }
  carouselScrollLeft() {
    setTimeout(() => {
      let carouselContainer = document.getElementById('carouselContainer');
      if (carouselContainer !== null) {
        // Calculate the scroll position and container width
        let scrollPosition = carouselContainer.scrollLeft;
        let containerWidth = carouselContainer.clientWidth;

        // Calculate the index of the first visible card
        let containerCard = document.getElementById('containerCard');
        let cardWidth : any
        if (containerCard !== null) {
          cardWidth = containerCard.clientWidth
          }
        const visibleCardIndex = Math.floor(scrollPosition / cardWidth);

        // Calculate the scroll position to align the first visible card
        const targetScrollPosition = visibleCardIndex * cardWidth;

        // Scroll the carousel container to the target position
        carouselContainer.scrollTo({
          left: targetScrollPosition,
          behavior: 'smooth',
        });
      }
    }, 0)


  }
  carouselScrollRight() {
    setTimeout(() => {
      let carouselContainer = document.getElementById('carouselContainer');
      if (carouselContainer !== null) {
        // Calculate the scroll position and container width
        let scrollPosition = carouselContainer.scrollLeft;
        let containerWidth = carouselContainer.clientWidth;

        // Calculate the index of the first visible card
        let containerCard = document.getElementById('containerCard');
        let cardWidth : any
        if (containerCard !== null) {
          cardWidth = containerCard.clientWidth
          }
        const visibleCardIndex = Math.floor(scrollPosition / cardWidth);

        // Calculate the scroll position to align the first visible card
        const targetScrollPosition = visibleCardIndex * cardWidth;

        // Scroll the carousel container to the target position
        carouselContainer.scrollTo({
          left: targetScrollPosition,
          behavior: 'smooth',
        });
      }
    }, 0)
  }
  getresume(){
    this.data.getresume().subscribe((res: any) => {
      for(const key in res){
        this.projects = res[key].projects
      }
    })
  }
}


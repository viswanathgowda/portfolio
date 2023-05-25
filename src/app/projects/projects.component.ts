import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  currentIndex: number = 0;


  projects = [
    { 'title': 'weatherApp', 'github': '', 'demo': 'https://viswanathgowda.github.io/weatherApplication/', 'description': 'its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': 'https://primeng.org/timeline', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': '', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': '', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': '', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': '', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': '', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': '', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': '', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': '', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': '', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' },
    { 'title': 'calculatorApp', 'github': '', 'demo': '', 'description': 'its a basic weather application which used google cloud and weather apis, its a basic weather application which used google cloud and weather apis' }


  ]

  constructor() { }

  ngOnInit(): void {
   
  }

  moveLeft() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
    this.carouselScroll();
  }
  moveRight() {
    this.currentIndex = Math.min(this.currentIndex + 1, this.projects.length - 4);
  }
  carouselScroll() {
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


}


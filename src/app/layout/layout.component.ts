import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output, ViewChild } from '@angular/core';
import { SharedService } from '../shared.service';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  @ViewChild('homePage') homePage!: ElementRef;
  @ViewChild('aboutPage') aboutPage!: ElementRef;
  @ViewChild('skillsPage') skillsPage!: ElementRef;
  @ViewChild('projectsPage') projectsPage!: ElementRef;
  @ViewChild('usecases') usecases!: ElementRef;
  @ViewChild('contactPage') contactPage!: ElementRef;
  cardWidth: any;
  currentView: any = true

  isScrollReached = {
    headerTitle: true,
    toolBar: false,
    currentPage: '1'
  };
  resume = {
    basicDeatails: {
      name: 'M Viswanath Gowda',
      email: 'viswavishu40.com',
      phone: '(+91) 9 8 8 8 8',
      address: 'Mumbai, Maharashtra',
      website: 'viswavishu40.com',
      github: 'viswavishu40',
      linkedin: 'viswavishu40',
      twitter: 'viswavish',
    },
    education: {},
    aboutme: {
      des: "Have progressive experience in Information Technology and has been involved in the Design and Development of enterprise integration projects. Strong in design and integration with intuitive problem-solving skills, Passionate about implementing and launching new projects, Ability to translate business requirements into technical solutions.",
      skills: {
        languages: ['HTML', 'CSS', 'Javascript', 'typescript', 'AngularJs', 'angular2+']
      },
    },
    projects: [
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


    ],
    usecases: []

  }

  showSVG = {
    homesvgHover: false,
    aboutsvgHover: false,
    downloadPdf: false
  }
  videoUrl = "C:\POC's\portfolio\src\assets\examplevideo.mp4"
  // currentIndex: number = 0;

  constructor(private shared: SharedService) { }

  ngOnInit(): void {
    let scrollvalue = localStorage.getItem('scrollPosition');
    if (scrollvalue && this.isScrollReached.currentPage !== '1' ? scrollvalue > '200' : false) {
      this.isScrollReached.toolBar = true
    } else {
      this.isScrollReached = {
        headerTitle: true,
        toolBar: false,
        currentPage: '1'
      };
    }
    // this.triggerReRender()
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition > 30) { // Change 100 to your desired scroll position
      this.isScrollReached.headerTitle = false;
    } else {
      this.isScrollReached.headerTitle = true;
    }

    if (scrollPosition > 200) {
      let scrollvalue = scrollPosition.toString()
      localStorage.setItem('scrollPosition', scrollvalue)
      this.isScrollReached.toolBar = true
    } else {
      this.isScrollReached.toolBar = false
    }

    if(scrollPosition > 733){
      this.triggerReRender();
    }
  }

  scrollToElement(pgNo: any) {
    if (this.homePage && pgNo === 1) {
      this.isScrollReached.currentPage = '1'
      this.homePage.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (pgNo === 2) {
      this.isScrollReached.currentPage = '2'
      this.aboutPage.nativeElement.scrollIntoView({ behavior: 'smooth' });
      this.triggerReRender()
    } else if (pgNo === 3) {
      this.isScrollReached.currentPage = '3'
      this.skillsPage.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (pgNo === 4) {
      this.isScrollReached.currentPage = '4'
      this.projectsPage.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if (pgNo === 5) {
      this.isScrollReached.currentPage = '5'
      this.usecases.nativeElement.scrollIntoView({ behavior: 'smooth' });
    } else if(pgNo === 6){
      this.isScrollReached.currentPage = '6'
      this.contactPage.nativeElement.scrollIntoView({behavior: 'smooth'});
    }
  }


  // moveLeft() {
  //   this.currentIndex = Math.max(this.currentIndex - 1, 0);
  //   this.carouselScroll();
  // }

  // moveRight() {
  //   this.currentIndex = Math.min(this.currentIndex + 1, this.resume.projects.length - 4);
  // }

  receivecardWidth(data: any) {
    this.cardWidth = data;
  }
  // carouselScroll() {
  //   setTimeout(() => {
  //     let carouselContainer = document.getElementById('carouselContainer');
  //     if (carouselContainer !== null) {
  //       // Calculate the scroll position and container width
  //       let scrollPosition = carouselContainer.scrollLeft;
  //       let containerWidth = carouselContainer.clientWidth;

  //       // Calculate the index of the first visible card
  //       // const cardWidth = carouselContainer.querySelector('.card').clientWidth;
  //       const visibleCardIndex = Math.floor(scrollPosition / this.cardWidth);

  //       // Calculate the scroll position to align the first visible card
  //       const targetScrollPosition = visibleCardIndex * this.cardWidth;

  //       // Scroll the carousel container to the target position
  //       carouselContainer.scrollTo({
  //         left: targetScrollPosition,
  //         behavior: 'smooth',
  //       });
  //     }
  //   }, 0)


  // }

  triggerReRender() {
    this.currentView = false
    setTimeout(() => {
      this.currentView = true
    }, 0)
    // this.shared.reloadComponent(this.isScrollReached.currentPage);
  }
}

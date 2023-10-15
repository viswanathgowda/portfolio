import { Component, ElementRef, HostListener, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import * as data from '../data/data.json'


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
  @ViewChild('menuOptTemplt', { read: TemplateRef })
  menuOptTemplt!: TemplateRef<any>;
  cardWidth: any;
  currentView: any = true
  isScrollReached = {
    headerTitle: true,
    toolBar: false,
    currentPage: '1',
    currentTab: '0'
  };
  resume = data;

  showSVG = {
    homesvgHover: false,
    aboutsvgHover: false,
    downloadPdf: false
  }
  videoUrl = "C:\POC's\portfolio\src\assets\examplevideo.mp4"
  // currentIndex: number = 0;
  renderCount = 0;
  innerWidth!: number;
  change:boolean = false;
  menuOpt:any

  constructor(private vref:ViewContainerRef) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    let scrollvalue = localStorage.getItem('scrollPosition');
    this.renderCount = 0
    this.isScrollReached.currentTab = '0'
    if (scrollvalue && this.isScrollReached.currentPage !== '1' ? scrollvalue > '700' : false) {
      this.isScrollReached.toolBar = true
    } else {
      this.isScrollReached = {
        headerTitle: true,
        toolBar: false,
        currentPage: '1',
        currentTab: '0'
      };
    }
  }
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (scrollPosition > 30) { 
      this.isScrollReached.headerTitle = false;
    } else {
      this.isScrollReached.headerTitle = true;
    }

    if (scrollPosition > 700) {
      let scrollvalue = scrollPosition.toString()
      localStorage.setItem('scrollPosition', scrollvalue)
      this.isScrollReached.toolBar = true
    } else {
      this.isScrollReached.toolBar = false
    }
    if(scrollPosition >= 460 && scrollPosition <= 764){
      this.renderCount++
      console.log(this.renderCount, 'rendercount')
      if(this.renderCount == 1){
        this.triggerReRender();
      }
    }else {
      this.renderCount = 0
    }
    if(windowHeight == scrollPosition || (windowHeight - 30) * 2 > scrollPosition){
      this.isScrollReached.currentTab = '2'
    }else if((windowHeight - 30) * 2 < scrollPosition && (windowHeight - 30) * 3 > scrollPosition){
      this.isScrollReached.currentTab = '3'
    }else if((windowHeight - 30) * 3 < scrollPosition && (windowHeight - 30) * 4 > scrollPosition){
      this.isScrollReached.currentTab = '4'
    }else if((windowHeight - 30) * 4 < scrollPosition && (windowHeight - 30) * 5 > scrollPosition){
      this.isScrollReached.currentTab = '5'
    }else if((windowHeight - 30) * 5 < scrollPosition && (windowHeight - 30) * 6 > scrollPosition){
      this.isScrollReached.currentTab = '6'
    }
  }
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  scrollToElement(pgNo: any) {
    if(this.menuOpt){
      this.menuOpt.destroy();
    }
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
 
  triggerReRender() {
    this.currentView = false
    setTimeout(() => {
      this.currentView = true
    }, 0)
  }
  mobileMenu( event: any){
    this.change ? this.change = false : this.change = true;
    this.change ? this.menuOpt = this.vref.createEmbeddedView(this.menuOptTemplt) : this.menuOpt.destroy();
   }
}

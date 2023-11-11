import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProjectsComponent } from './projects/projects.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SharedService } from './shared.service';
import { SkillsComponent } from './skills/skills.component';
import { UsecasesComponent } from './usecases/usecases.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { ScrollableDirective } from './scrollable.directive';
import { HttpClientModule } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
// import { getFirestore, provideFirestore } from '@angular/fire/firestore';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ProjectsComponent,
    TimelineComponent,
    SkillsComponent,
    UsecasesComponent,
    ContactpageComponent,
    SafeUrlPipe,
    ScrollableDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

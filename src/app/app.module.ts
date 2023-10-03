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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }

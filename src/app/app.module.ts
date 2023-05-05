import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { ProjectsComponent } from './projects/projects.component';
import { MessagesComponent } from './messages/messages.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { ResourcesComponent } from './resources/resources.component';
import { ProjectModifyComponent } from './project-modify/project-modify.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    AboutComponent,
    ProjectsComponent,
    MessagesComponent,
    ProjectFormComponent,
    ProjectDetailsComponent,
    ChatbotComponent,
    TimelineComponent,
    ProfileComponent,
    PostComponent,
    ResourcesComponent,
    ProjectModifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }

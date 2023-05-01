import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { MessagesComponent } from './messages/messages.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { ResourcesComponent } from './resources/resources.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },{
    path:'',
    component:HomeComponent
  },{
    path:'register',
    component:RegisterComponent
  },{
    path:'contact',
    component:ContactComponent
  },{
    path:'about',
    component:AboutComponent
  },{
    path:'projects',
    component:ProjectsComponent
  },{
    path:'projects/form',
    component:ProjectFormComponent
  },{
    path:'messages',
    component:MessagesComponent
  },{
    path:'timeline',
    component:TimelineComponent
  },{
    path:'profile',
    component:ProfileComponent
  },{
  path:'post',
  component:PostComponent
  },{
    path:'resources',
    component:ResourcesComponent
  }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

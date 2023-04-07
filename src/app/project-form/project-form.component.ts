import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  constructor(_dataService:DataService){

  }
  submitProject(name:string,budget:string,industry:string,sector:string,description:string){
    
  }
}

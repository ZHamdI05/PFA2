import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-project-modify',
  templateUrl: './project-modify.component.html',
  styleUrls: ['./project-modify.component.css']
})
export class ProjectModifyComponent {
  constructor(_dataService:DataService){

  }
  submitProject(name:string,budget:string,industry:string,sector:string,description:string,region:string){
    let project={
      // projectId:number,
    projectName:name,
    description:description,
    status:'in progress',
    createdOn:new Date(),
    budget:parseInt(budget),
    region:region,
    industry:industry,
    sector:sector
    }

  }
  
}

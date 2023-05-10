import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent {
  constructor(private _dataService:DataService, private router:Router){

  }
  ngOnInit(){
    if(this._dataService.getUserData()){ this.router.navigate(['login']);}

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
    
    this._dataService.submitProject(project);
  }
}

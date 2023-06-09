import { Component, OnDestroy } from '@angular/core';
import { DataService } from '../data.service';
import { Subscription } from 'rxjs';
import { IProject } from '../interfaces/ProjectInterface';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
  public project!: IProject;
  
  private subscription: Subscription;
  constructor(private _dataService:DataService){
    this.subscription = this._dataService.getEvent().subscribe((event) => {
      this.project = event;
    });
  }
  
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

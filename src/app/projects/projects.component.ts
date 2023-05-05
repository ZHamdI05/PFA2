import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { IProject } from '../ProjectInterface';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  constructor(private _dataService:DataService){
  }
  public twoWayBindingPriceFrom='';
  public twoWayBindingPriceTo='';
  public priceFilterFrom=parseInt(this.twoWayBindingPriceFrom);
  public priceFilterTo=parseInt(this.twoWayBindingPriceTo);
  public searchPrompt='';
  // public statusRadio:HTMLInputElement|null = document.querySelector('input[name="status"]:checked');
  // public statusValue = this.statusRadio ? this.statusRadio.value : null;
  public projects:IProject[]=[];
  
  ngOnInit(){
    // use when needed
    this.projects=[
      {
        projectId:10,
        projectName:'name',
        description:'desc',
        status:'on hold',
        createdOn:'10/10/1000',
        budget:1000,
        region:'reg',
        industry:'ind',
        sector:'sec'
      }
    ]
  }
  search(prompt:string){

    this._dataService.searchProject(prompt).subscribe((p:any) => this.projects=p);
    let statusRadio:HTMLInputElement|null = document.querySelector('input[name="status"]:checked');
    let statusValue = statusRadio ? statusRadio.value : null;
    console.log(this.projects);
    // do filtering here
  }
  rate(projectId:string){
    let rateRadio:HTMLInputElement|null = document.querySelector('input[name="rate"]:checked');
    let rateValue = rateRadio ? rateRadio.value : null;
  }
  showProjectDetails(id:string|number){
    const projectDetails=document.getElementById('projectDetails');
    const close:any=document.getElementById('close');
    if(projectDetails){
      const project = this.projects.find((p:any) => p.projectId === id);

      this._dataService.setProjectData(project);
      
      this._dataService.emitEvent(project);
      projectDetails.style.display="block";
      close.style.display="block";
    }
  }
  closeDetails(){
    const projectDetails=document.getElementById('projectDetails');
    const close:any=document.getElementById('close');
    if(projectDetails){projectDetails.style.display="none";}
    close.style.display="none";
  }
  
}

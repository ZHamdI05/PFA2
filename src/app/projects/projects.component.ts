import { Component } from '@angular/core';
import { DataService } from '../data.service';

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
  public projects:any;
  
  ngOnInit(){
    // use when needed
    this.projects=[
      {
        ProjectId:10,
        ProjectName:'string',
        Description:'desc',
        Status:'on hold',
        CreatedOn:'2024/01/01',
        Budget:1000,
        Region:'reg',
        Industry:'ind',
        Sector:'sect'
      }
    ]
  }
  search(prompt:string){

    this._dataService.searchProject(prompt).subscribe(p => this.projects=p);
    let statusRadio:HTMLInputElement|null = document.querySelector('input[name="status"]:checked');
    let statusValue = statusRadio ? statusRadio.value : null;
    // do filtering here
  }
  rate(projectId:string){
    let rateRadio:HTMLInputElement|null = document.querySelector('input[name="rate"]:checked');
    let rateValue = rateRadio ? rateRadio.value : null;
  }
  showProjectDetails(id:string|number){
    const projectDetails=document.getElementById('projectDetails');
    if(projectDetails){
      const project = this.projects.find((p:any) => p.ProjectId === id);

      this._dataService.setProjectData(project);
      
      this._dataService.emitEvent(project);
      projectDetails.style.display="block";
    }
  }
  closeDetails(){
    const projectDetails=document.getElementById('projectDetails');
    if(projectDetails){projectDetails.style.display="none";}
  }
}

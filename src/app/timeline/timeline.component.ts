import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  constructor(private dataService:DataService, private router:Router){}
  public posts=[{
    creatorName:'Hamdi wahed',
    creationDate:new Date(),
    content:'some content',
    likes:100,
    comments:[{},{},{}],
    
  }];
  ngOnInit(){
    this.router.navigate(['login']);

    let loginToken=this.dataService.getToken();
  }

  gotoProfile(){
    this.router.navigate(['profile']);
  }
}

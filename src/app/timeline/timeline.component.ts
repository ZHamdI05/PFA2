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
  ngOnInit(){
    let loginToken=this.dataService.getToken();
  }

  gotoProfile(){
    this.router.navigate(['profile']);
  }
}

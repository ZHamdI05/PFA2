import { Component, Input } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() public post:any;
  constructor(private dataService:DataService){}
  ngOnInit(){
    
  }
  like(){
    //do something
  }
  comment(){
    //do something
  }
}

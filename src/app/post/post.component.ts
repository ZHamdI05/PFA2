import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() public post:any;
  constructor(private dataService:DataService){}
  public user:any;
  ngOnInit(){
    this.user=this.dataService.getUserData();
  }
  @ViewChild('commentContent') commentContent!:ElementRef;
  public liked:boolean=false;
  like(){
    this.liked=!this.liked;
    if(this.liked){this.post.likes+=1}else{this.post.likes-=1}
    // it shouldn't be like this
  }
  comment(content:string){
    const newComment={
      user:this.user.firstName+' '+this.user.lastName,//should be extracted from session storage
      dateCommentaire:new Date(),
      content:content,
    }; 
    this.post.comments.push(newComment);
    this.commentContent.nativeElement.value='';
  }
}

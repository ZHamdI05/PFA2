import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
}) 
export class MessagesComponent {
  public users:any;
  public messages:{
      // id:number,
      messageDate:Date,
      message:string,
      from:string,
      to:string,
      type:{
        "chat-left":boolean,
        "chat-right":boolean
      }
      
  }[]=[];
  constructor(private _dataService:DataService,private router:Router){}
  public activeUser:any;
  ngOnInit(){
    if(!this._dataService.getUserData().firstName){ this.router.navigate(['login']);}
    this.users=[
      {
        id:1,
        firstName:"Hamdi",
        lastName:"Zor",
      },{
        id:2,
        firstName:"Hedi",
        lastName:"Zoom",
      }
    ];
    this.activeUser=this.users[0];
    // this.messages=[{
    //   id:0,
    //   messageDate:new Date(),
    //   message:"lorem ipsum?",
    //   from:this.activeUser,
    //   to:"Me",
    //   type:{
    //     "chat-left":this.activeUser
    //   },
    // },{
    //   id:1,
    //   messageDate:new Date(),
    //   message:"lorem ipsum yes",
    //   from:"Me",
    //   to:this.activeUser
    // },{
    //   id:2,
    //   messageDate:new Date(),
    //   message:"lorem ipsum not yet",
    //   from:this.activeUser,
    //   to:"Me"
    // }
    // ]
    // [
    //   {
    //     userId:1,
    //     messages:''
    // }];
  }
  
  createImageUrl(byteArray:string){


    const blob = new Blob([byteArray], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    return url;
    // create an <img> element and set its `src` attribute to the temporary URL
    // const img = document.createElement('img');
    // img.src = url;
    // add the <img> element to the DOM
    // document.body.appendChild(img);
    

    }
    searchContact(name:string){

    }
    @ViewChild('message')message!: ElementRef;
    public sendMessage(msg:string){
      let now=new Date();
      this.messages[this.messages?.length]={from:'Me',messageDate:now,type:{"chat-left":false,"chat-right":true},message:msg,to:this.activeUser.firstName};
      this.message.nativeElement.value='';
      console.log(this.messages);
    }
    public openConversation(id:number){
      // get conversation
    }
}

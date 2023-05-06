import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  public users:any;
  public messages:any;
  constructor(private _dataService:DataService){

  }
  public activeUser:any;
  ngOnInit(){
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
    ]
    this.activeUser=this.users[0];
    this.messages=[{
      id:0,
      messageDate:new Date(),
      message:"lorem ipsum?",
      from:this.activeUser,
      to:"Me"
    },{
      id:1,
      messageDate:new Date(),
      message:"lorem ipsum yes",
      from:"Me",
      to:this.activeUser
    },{
      id:2,
      messageDate:new Date(),
      message:"lorem ipsum not yet",
      from:this.activeUser,
      to:"Me"
    }
    ]
    // [
    //   {
    //     userId:1,
    //     messages:''
    // }];
  }
  public conversation:any;
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
      let response:any;
      let now=new Date();
      this.conversation[this.conversation?.length]={user:'Me',sendDate:now,type:{"chat-left":false,"chat-right":true},message:prompt};
      this._dataService.chatbotMessage(msg).subscribe(res => response=res);// check response format
      now=new Date();
      this.conversation[this.conversation?.length]={user:'Hamdi Zor',sendDate:now,type:{"chat-left":true,"chat-right":false},message:response.message};//verify
      
      this.message.nativeElement.value='';

    }
    public openConversation(id:number){
      // get conversation
    }
}

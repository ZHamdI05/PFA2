import { Component } from '@angular/core';
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
    this.messages=[{
      id:0,
      messageDate:new Date(),
      content:"lorem ipsum?",
      from:"Skander",
      to:""
    },{
      id:1,
      messageDate:new Date(),
      content:"lorem ipsum yes",
      from:"",
      to:"Skander"
    },{
      id:2,
      messageDate:new Date(),
      content:"lorem ipsum not yet",
      from:"Skander",
      to:""
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
    public sendMessage(msg:string){
      let response:any;
    let now=new Date();
    this.conversation[this.conversation?.length]={user:'Me',sendDate:now,type:{"chat-left":false,"chat-right":true},message:prompt};
    this._dataService.chatbotMessage(msg).subscribe(res => response=res);// check response format
    now=new Date();
    this.conversation[this.conversation?.length]={user:'Fekrti Assistant',sendDate:now,type:{"chat-left":true,"chat-right":false},message:response.message};//verify
    // document.getElementById('msg-text')?.value?='';
    let element = document.getElementById('chats');
    console.log(element);
    if(element) {element.scrollTop = element.scrollHeight;
    console.log('element');}
    }
    public openConversation(id:number){
      // get conversation
    }
}

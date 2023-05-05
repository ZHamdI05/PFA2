import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { IChatbotResponse } from './responseinterface';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  constructor(private dataService:DataService){}
  public conversation:{
    sendDate: Date;
    user: string;
    message: string;
  }[] | any;
  public userName='';
  ngOnInit(){
    this.conversation=[
      {
        user:'Fekrti Assistant',
        sendDate:new Date(),
        type:{"chat-left":true,
        "chat-right":false},
        message:"Hello, How can I help you today?"
      },{
        user:'Me',
        sendDate:new Date(),
        type:{"chat-left":false,
        "chat-right":true},
        message:"I need more information about Developer Plan."
      }
    ]
  }
  sendMessage(prompt:string){
    let response:IChatbotResponse[]=[];
    let now=new Date();
    this.conversation[this.conversation?.length]={user:'Me',sendDate:now,type:{"chat-left":false,"chat-right":true},message:prompt};
    this.dataService.chatbotMessage(prompt).subscribe(res => {
      now=new Date();
      this.conversation[this.conversation?.length]={user:'Fekrti Assistant',sendDate:now,type:{"chat-left":true,"chat-right":false},message:res[0].text};
    });// check response format
    now=new Date();
    //this.conversation[this.conversation?.length]={user:'Fekrti Assistant',sendDate:now,type:{"chat-left":true,"chat-right":false},message:response[0].text};//verify
    // document.getElementById('msg-text')?.value?='';
    let element = document.getElementById('chats');
    console.log(element);
    if(element) {element.scrollTop = element.scrollHeight;
    console.log('element');}

  }

}

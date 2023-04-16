import { Component } from '@angular/core';
import { DataService } from '../data.service';

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
    let response:any;
    let now=new Date();
    this.conversation[this.conversation?.length]={user:'Me',sendDate:now,type:{"chat-left":false,"chat-right":true},message:prompt};
    this.dataService.chatbotMessage(prompt).subscribe(res => response=res);// check response format
    now=new Date();
    this.conversation[this.conversation?.length]={user:'Fekrti Assistant',sendDate:now,type:{"chat-left":true,"chat-right":false},message:response.message};//verify


  }

}

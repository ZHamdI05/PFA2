import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { IChatbotResponse } from '../interfaces/ChatbotResponse';

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
      // {
      //   user:'Fekrti Assistant',
      //   sendDate:new Date(),
      //   type:{"chat-left":true,
      //   "chat-right":false},
      //   message:"Hello, How can I help you today?"
      // },{
      //   user:'Me',
      //   sendDate:new Date(),
      //   type:{"chat-left":false,
      //   "chat-right":true},
      //   message:"I need more information about Developer Plan."
      // }
    ]
  }
  @ViewChild('message')message!: ElementRef;
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
    
    this.message.nativeElement.value='';
  }
  
}

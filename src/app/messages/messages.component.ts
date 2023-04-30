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

    }
    public openConversation(id:number){
      // get conversation
    }
}

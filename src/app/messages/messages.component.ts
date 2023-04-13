import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent {
  public users:any;
  constructor(private _dataService:DataService){

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
  
}

import { Component } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MySocialNetwork.UI';
  public loginToken='';
  public expanded={ 
    "expanded": false,
    past:false
  }
  
  expandChat() {
    
    this.expanded.expanded = !this.expanded.expanded ;
    
  }
  shrinkChat(){
    this.expanded.expanded = false;
  }
  
}

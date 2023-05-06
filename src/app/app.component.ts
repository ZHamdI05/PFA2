import { Component, ElementRef, ViewChild } from '@angular/core';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('reg')reg!: ElementRef;
  @ViewChild('log')l!: ElementRef;
  title = 'MySocialNetwork.UI';
  public loginToken='';
  public expanded={ 
    "expanded": false,
    past:false
  }
  loggedIn(){
        this.l.nativeElement.style='';
        this.reg.nativeElement.style='';
  }
  expandChat() {
    
    this.expanded.expanded = !this.expanded.expanded ;
    
  }
  shrinkChat(){
    this.expanded.expanded = false;
  }
  
}

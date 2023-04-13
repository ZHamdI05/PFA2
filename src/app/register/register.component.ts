import { Component } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private dataService:DataService){}
  public registerUser(first:string,last:string,email:string,pass:string){
    let userData={
      firstName: first,
      lastName:last,
      email:email,
      password:pass
    }
    this.dataService.register(userData).subscribe();
    // do something with validate
  }
}

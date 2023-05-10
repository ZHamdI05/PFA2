import { Component, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../data.service';
import { HttpResponse } from '@angular/common/http';

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
    // remove this next line and uncomment the ones after
    this.dataService.setUserData(first,last,email,pass);
    alert('registration complete');
    // this.dataService.register(userData).subscribe(res=> {
    //   if(res.status===200){
    //     alert('Account created');
    //   }
    //   else{}
    // });
    // do something with validate
  }

}

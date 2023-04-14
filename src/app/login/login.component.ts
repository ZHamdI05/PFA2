import { Component/*, EventEmitter, Output */} from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginToken='';
  constructor(private dataService:DataService, private router:Router){}
  // @Output() childEvent=new EventEmitter<string>();
  // sendToParent(){
  //   this.childEvent.emit(this.loginToken);
  // }
  public login(email:string,pass:string){
    this.loginToken='';
    let loginData={
      email:email,
      password:pass
    }
    this.dataService.login(loginData).subscribe((rep:any) => this.loginToken=rep.loginToken);
    if(this.loginToken===''){
      alert('wrong email or password');
    }
    else{
      this.dataService.setToken(this.loginToken);
      this.router.navigate(['feed']);// this should be all, change feed to something else
      
    }
  }

}

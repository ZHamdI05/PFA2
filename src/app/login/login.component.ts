import { Component/*, EventEmitter, Output */} from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginResp={
    loginToken:'',
    userId:''
  }
  
  constructor(private dataService:DataService, private router:Router){}
  // @Output() childEvent=new EventEmitter<string>();
  // sendToParent(){
  //   this.childEvent.emit(this.loginToken);
  // }
  public login(email:string,pass:string){
    this.loginResp.loginToken='';
    this.loginResp.userId='';
    let loginData={
      email:email,
      password:pass
    }
    this.dataService.login(loginData).subscribe((rep:any) => this.loginResp=rep);// I may need the id too
    if(this.loginResp.loginToken===''){
      alert('wrong email or password');
    }
    else{
      this.dataService.setToken(this.loginResp);
      this.router.navigate(['timeline']);// this should be all, change feed to something else
      
    }
  }

}

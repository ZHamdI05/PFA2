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
    access_token:'',
    token_type:'Bearer',
    expires_in:'',
    user:{
      id:-1,
      firstName:'',
      lastName:'',
      email:'',
      password:'',
      profilePicture:''
    }
  }
  
  constructor(private dataService:DataService, private router:Router){}
  // @Output() childEvent=new EventEmitter<string>();
  // sendToParent(){
  //   this.childEvent.emit(this.loginToken);
  // }
  public login(email:string,pass:string){
    let loginData={
      email:email,
      password:pass
    }
    
    this.dataService.login(loginData).subscribe(rep => {
      if(this.loginResp.access_token===''){
        alert('wrong email or password');
      }
      else{
        this.dataService.setToken(this.loginResp.access_token);
        this.router.navigate(['timeline']);// this should be all, change feed to something else
        }  
    });
    
  }

}

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
    let userData=this.dataService.getUserData();
    if(userData.email===email&&userData.password===pass){
      alert('login successful');
      this.router.navigate(['profile']);
    }else{
      alert('wrong email or password');
    }
    this.dataService.login(loginData).subscribe(rep => {
      if(rep.access_token==undefined){
        alert('wrong email or password');
        
      }else{
        this.dataService.setToken(this.loginResp.access_token);
        this.router.navigate(['timeline']);
      }
      
      
    });
    
  }

}

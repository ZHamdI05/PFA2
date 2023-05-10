import { Component, ElementRef, ViewChild } from '@angular/core';
import { Buffer } from 'buffer';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public editActive={"active":false}
  public overviewActive={"active":true}
  public activeUser!: {
    firstName: string;
    lastName: string;
    bio: string;
  };
  constructor(private dataService:DataService,private router:Router){}
  ngOnInit(){
    this.activeUser={
      firstName:this.dataService.getUserData().firstName!,
      lastName:this.dataService.getUserData().lastName!,
      bio:'No bio is set'
  }
    if(!this.activeUser){
      this.router.navigate(['login']);
    }
    
  }
  
  goOverview(){
    this.overviewActive.active=true;
    this.editActive.active=false;

  }
  goEdit(){
    this.editActive.active=true;
    this.overviewActive.active=false;

  }
  public url:string='';
  removeImage(pfp:any){
    this.url='';
    
    pfp.value=null
  }
  changePfp(event:any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const byteArray = new Uint8Array(arrayBuffer);
      // Here you can use the byteArray as needed, for example to send it to the server
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      // this.url = URL.createObjectURL(blob);
      let base64Image = btoa(
        new Uint8Array(byteArray).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );
      const buf=Buffer.from(byteArray);
      base64Image=buf.toString('base64');
      
      // Set the base64 string as the src attribute of the img tag
      const imgElement = document.getElementById('my-img');
      this.url = 'data:image/png;base64,' + base64Image;
    };
    reader.readAsArrayBuffer(file);
    
  }
  public posts:any=[
    // {
    // creatorName:this.activeUser.firstName+' '+this.activeUser.lastName,//should be user.firstname + ' ' + user.lastName
    // creationDate:new Date(),
    // content:'some content',
    // likes:100,
    // comments:[],
    
  // }
];
  @ViewChild('postContent') postContent!: ElementRef;
  @ViewChild('firstName') firstName!: ElementRef;
  @ViewChild('lastName') lastName!: ElementRef;
  @ViewChild('bio') bio!: ElementRef;
  @ViewChild('oldPassword') oldPassword!: ElementRef;
  @ViewChild('newPassword') newPassword!: ElementRef;
  @ViewChild('newPasswordConfirm') newPasswordConfirm!: ElementRef;

  public makeAPost(content:string){
    const post={
      creatorName:this.activeUser.firstName+' '+this.activeUser.lastName,//should be user.firstname + ' ' + user.lastName
      creationDate:new Date(),
      content:content,
      likes:0,
      comments:[],
    }
    this.posts.push(post);
    this.postContent.nativeElement.value='';
  }
  password1: string='';
  password2: string='';
  passwordsMatch='';
  checkPasswords() {
    if(this.password1===''||this.password2===''){
      this.passwordsMatch='';
    }else{
      if (this.password1 === this.password2) {
        this.passwordsMatch='';
      } else {
        this.passwordsMatch="Passwords don't match";
      }
    }
  }
  reset(){
    this.firstName.nativeElement.value=this.activeUser.firstName;
    this.lastName.nativeElement.value=this.activeUser.lastName;
    this.bio.nativeElement.value=this.activeUser.bio;
    this.oldPassword.nativeElement.value='';
    this.newPassword.nativeElement.value='';
    this.newPasswordConfirm.nativeElement.value='';
  }
  updateUserData(firstName:string,lastName:string,bio:string,oldpassword:string,newPassword:string,newPasswordConfirm:string){
    this.activeUser.firstName=firstName;
    this.activeUser.lastName=lastName;
    this.activeUser.bio=bio;
    this.dataService.setUserData(this.activeUser.firstName,this.activeUser.lastName,this.dataService.getUserData().email!,this.dataService.getUserData().password!);
    if(oldpassword){
      // check password authenticity and do something
    }
  }
}

import { Component } from '@angular/core';
import { Buffer } from 'buffer';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  public editActive={"active":false}
  public overviewActive={"active":true}
  
  constructor(){}
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
  public posts=[{
    creatorName:'Hamdi Zor',//should be user.firstname + ' ' + user.lastName
    creationDate:new Date(),
    content:'some content',
    likes:100,
    comments:[],
    
  }];
  public makeAPost(content:string){
    const post={
      creatorName:'Hamdi Zor',//should be user.firstname + ' ' + user.lastName
      creationDate:new Date(),
      content:content,
      likes:0,
      comments:[],
    }
    this.posts.push(post);

  }
}

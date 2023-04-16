import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMessage } from './messages/MessageInterface';
import { IProject } from './ProjectInterface';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public loginToken='';
  constructor(private http:HttpClient) { }
  public messageUrl='';
  public projectUrl='https://localhost:7007/api/Search/';
  public registerUrl='';
  public loginUrl='';
  public chatbotUrl='';
  getMessages(id:number){
    return this.http.get<IMessage[]>(this.messageUrl+'/'+id);
  }
  searchProject(prompt:string){
    let promptParams = new HttpParams().set('prompt', prompt);
    const p:any=this.http.get<IProject[]>(`${this.projectUrl}`+prompt);
    console.log("check "+p[0]);
    return p;//,{params:promptParams}
    
  }
  private projectData:any;
  setProjectData(data: any) {
    this.projectData = data;
  }

  getProjectData() {
    return this.projectData;
  }
  private eventSubject = new Subject<any>();

  public emitEvent(event: any) {
    this.eventSubject.next(event);
  }

  public getEvent() {
    return this.eventSubject.asObservable();
  }

  public register(userData:any){
    return this.http.post(this.registerUrl,userData);
    
  }
  public login(loginData:any){
    return this.http.post(this.loginUrl,loginData);
  }
  public setToken(t:string){
    this.loginToken=t;
  }
  public getToken(){
    return this.loginToken;
  }
  public chatbotMessage(message:string){
    return this.http.post(this.chatbotUrl,{prompt:message})//check the api
  }
}

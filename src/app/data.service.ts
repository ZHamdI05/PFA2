import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMessage } from './MessageInterface';
import { IProject } from './ProjectInterface';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { IResponse } from './chatbot/responseinterface';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public loginToken='xx';
  public userId='11';
  constructor(private http:HttpClient) { }
  public messageUrl='';
  public projectUrl='https://localhost:7007/api/Search/';
  public registerUrl='';
  public loginUrl='';
  public chatbotUrl='http://localhost:5005/webhooks/rest/webhook';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    })
  };
  getMessages(id:number){
    return this.http.get<IMessage[]>(this.messageUrl+'/'+id);
  }
  searchProject(prompt:string){
    let promptParams = new HttpParams().set('prompt', prompt);
    const p:any=this.http.get<IProject[]>(`${this.projectUrl}`+prompt);
    console.log("check ");
    console.log(p);
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
  public setToken(loginResp:any){
    sessionStorage.setItem('loginToken', loginResp.loginToken);
    this.loginToken=loginResp.loginToken;
    sessionStorage.setItem('userId', loginResp.userId);
    this.userId=loginResp.userId;
  }
  public getToken(){
    this.loginToken=sessionStorage.getItem('loginToken')+'';
    return {loginToken:this.loginToken,userId:this.userId};
  }
  public logout(){
    sessionStorage.removeItem('loginToken');
    this.loginToken='';
    sessionStorage.removeItem('userId');
    this.userId='';
    
  }
  public chatbotMessage(message:string){
    return this.http.post<IResponse[]>(this.chatbotUrl,{prompt:message},this.httpOptions);//check the api
  }
}

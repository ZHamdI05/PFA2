import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMessage } from './interfaces/MessageInterface';
import { IProject } from './interfaces/ProjectInterface';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { IChatbotResponse } from './interfaces/ChatbotResponse';
import { ILoginResponse } from './interfaces/LoginResponse';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  submitProject(project: { projectName: string; description: string; status: string; createdOn: Date; budget: number; region: string; industry: string; sector: string; }) {
    this.http.post<IProject>(this.projectUrl,project,this.httpOptions);
  }
  public access_token='';
  // public userId='11';
  constructor(private http:HttpClient) { }
  public messageUrl='';
  public projectUrl='https://localhost:7007/api/Project'
  public projectSearchUrl='https://localhost:7007/api/Search';
  public registerUrl='https://localhost:7007/api/Registration';
  public loginUrl='https://localhost:7007/api/Login';
  public chatbotUrl='http://localhost:5005/webhooks/rest/webhook';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Authorization':'Bearer '+this.access_token,
    })
  };
  getMessages(id:number){
    return this.http.get<IMessage[]>(this.messageUrl+'/'+id);
  }
  searchProject(prompt:string){
    let promptParams = new HttpParams().set('prompt', prompt);
    const p:any=this.http.get<IProject[]>(`${this.projectSearchUrl}`+prompt);
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
    return this.http.post<{status:number}>(this.registerUrl,userData);
    
  }
  public login(loginData:any){
    return this.http.post<ILoginResponse>(this.loginUrl,loginData);
  }
  public setToken(loginResp:any){
    sessionStorage.setItem('access_token', loginResp.access_token);
    this.access_token=loginResp.access_token;
    // sessionStorage.setItem('userId', loginResp.userId);
    // this.userId=loginResp.userId;
  }
  public getToken(){
    this.access_token=sessionStorage.getItem('access_token')+'';
    // return {access_token:this.access_token,userId:this.userId};
  }
  public logout(){
    sessionStorage.removeItem('access_token');
    this.access_token='';
    // sessionStorage.removeItem('userId');
    // this.userId='';
    
  }
  public chatbotMessage(message:string){
    return this.http.post<IChatbotResponse[]>(this.chatbotUrl,{message:message,sender:'test'});//get sender name from sessionStorage
  }
  public getAllProjects(){
    return this.http.get<IProject[]>(this.projectUrl,this.httpOptions);
  }
  public setUserData(first:string,last:string,email:string,pass:string){
    sessionStorage.setItem('email',email);
    sessionStorage.setItem('first',first);
    sessionStorage.setItem('last',last);
    sessionStorage.setItem('pass',pass);
  }
  public getUserData(){
    return{
      firstName:sessionStorage.getItem('first'),
      lastName:sessionStorage.getItem('last'),
      email:sessionStorage.getItem('email'),
      password:sessionStorage.getItem('pass')
    }
  }
  public setTempProject(name:string,budget:string,industry:string,sector:string,description:string,region:string){
    sessionStorage.setItem('projectExists','true');
    sessionStorage.setItem('projectId', (Math.floor(Math.random() * 100) + 1).toString());
    // projectId:number,
    sessionStorage.setItem('projectName',name);
    //projectName:name,
    sessionStorage.setItem('projectDescription',description);
    //description:description,
    sessionStorage.setItem('projectStatus','in progress');
    //status:'in progress',
    sessionStorage.setItem('projectDate',(new Date()).toString());
    //createdOn:new Date(),
    sessionStorage.setItem('projectBudget',budget);
    //budget:parseInt(budget),
    sessionStorage.setItem('projectRegion',region);
    //region:region,
    sessionStorage.setItem('projectIndustry',industry);
    //industry:industry,
    sessionStorage.setItem('projectSector',sector);
    //sector:sector
  }
  public getTempProject():any|null{
    if(sessionStorage.getItem('projectExists')=='true'){
    return {
      projectId:sessionStorage.getItem('projectId'),
      projectName:sessionStorage.getItem('projectName'),
      description:sessionStorage.getItem('projectDescription'),
      status:sessionStorage.getItem('projectStatus'),
      createdOn:sessionStorage.getItem('projectDate'),
      budget:parseInt(sessionStorage.getItem('projectBudget')!),
      region:sessionStorage.getItem('projectRegion'),
      industry:sessionStorage.getItem('projectIndustry'),
      sector:sessionStorage.getItem('projectSector')
    }}else{
      return null;
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IMessage } from './messages/MessageInterface';
import { IProject } from './ProjectInterface';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  public messageUrl='';
  public projectUrl='http://127.0.0.1:7007/api/Search/';
  getMessages(id:number){
    return this.http.get<IMessage[]>(this.messageUrl+'/'+id);
  }
  searchProject(prompt:string){
    let promptParams = new HttpParams().set('prompt', prompt);
    return this.http.get<IProject[]>(`${this.projectUrl}`+prompt);//,{params:promptParams}
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
}

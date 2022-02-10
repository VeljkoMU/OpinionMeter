import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataManagerService {

  public username: String = "";
  private password: String = "";

  constructor(private httpClient : HttpClient) { }

  public register(password: string, username:string): any{
    let result = this.httpClient.post("http://localhost:5500/userdata/register", {
      username: username,
      password:password
    }, {observe: "response"});

    result.subscribe(response=>{
      if(response.status){
        this.username = username;
        this.password = password;
      }
    });
    return result;
  }

  public login(password: string, username:string): any{
    let result = this.httpClient.post("http://localhost:5500/userdata/login", {
      username: username,
      password:password
    }, {observe: "response"});

    result.subscribe(response=>{
      if(response.status){
        this.username = username;
        this.password = password;
      }
    });
    return result;
  }
}

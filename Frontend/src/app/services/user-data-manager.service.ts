import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDataManagerService {

  public username: String = "";
  private password: String = "";
  public gender: string = "";
  public region: string = "";
  public education: string = "";
  public employment: string = "";

  constructor(private httpClient : HttpClient) { }

  public register(password: string, username:string, gender: string, education: string, emp: string, region: string): any{
    let result = this.httpClient.post("http://localhost:5500/userdata/register", {
      username: username,
      password:password,
      gender: gender,
      edu: education,
      emp: emp,
      region: region
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

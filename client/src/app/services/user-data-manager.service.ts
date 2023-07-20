import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, shareReplay } from 'rxjs';
import { changeUserAction } from 'src/store/actions';
import { State } from 'src/store/app-state';

@Injectable({
  providedIn: 'root'
})
export class UserDataManagerService {

  public username: String = "";
  public gender: string = "";
  public region: string = "";
  public education: string = "";
  public employment: string = "";

  constructor(private httpClient : HttpClient,
              private store: Store<State>) { }

  public register(password: string, username:string, gender: string, education: string, emp: string, region: string): any{
    let result = this.httpClient.post("/userdata/register", {
      username: username,
      password:password,
      gender: gender,
      edu: education,
      emp: emp,
      region: region
    }, {observe: "response", withCredentials: true}).pipe(
      shareReplay(1)
    );

    result.subscribe(response=>{
      if(response.status){
        this.username = username;

        this.store.dispatch(changeUserAction({
          user: {
            username: username,
            gender: gender,
            education: education,
            employment: emp,
            region: region
          }
        }))
      }
    });
    return result;
  }

  public confirmCradentials() {
    const response = this.httpClient.get("/userdata/confirmCredentials", {withCredentials: true}).pipe(
      shareReplay(1)
    );

    response.subscribe((res: any) => {
      if(res.username) {
        this.getMyAccountData();
      }
    });
  }

  public logout(): any {
    let result = this.httpClient.get("/userdata/logout", {observe: "response", withCredentials: true})

    result.subscribe(response => {
      if(response.status) {
        this.store.dispatch(changeUserAction({
          user: undefined
        }))
      }
    });

    return result
  }

  public login(password: string, username:string): any{
    let result = this.httpClient.post("/userdata/login", {
      username: username,
      password: password
    }, {observe: "response", withCredentials: true}).pipe(
      shareReplay(1)
    );

    result.subscribe(response=>{
      if(response.status){
        this.username = username;
        this.getMyAccountData();
      }
    });
    return result;
  }

  public getMyAccountData(): any {
    let results = this.httpClient.get("/userdata/getUserData", {withCredentials: true}).pipe(
      shareReplay(1)
    );

    results.subscribe((response:any) => {
      if(response) {
        this.username = response.username;
        this.store.dispatch(changeUserAction({
          user: {
            username: response.username,
            gender: response.gender,
            education: response.education,
            employment: response.employment,
            region: response.region
          }
        }))
      }
    });

    return results;
  }
}

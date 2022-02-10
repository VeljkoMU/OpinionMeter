import { Component, OnInit } from '@angular/core';
import { UserDataManagerService } from 'src/app/services/user-data-manager.service';
import {NgModel} from "@angular/forms"
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-user-authorization',
  templateUrl: './user-authorization.component.html',
  styleUrls: ['./user-authorization.component.css']
})
export class UserAuthorizationComponent implements OnInit {

  public isRegister:boolean = false;

  public username: string = "";
  public pass: string = "";

  constructor(private authServise: UserDataManagerService,
              private uiService: UIService) { }

  ngOnInit(): void {
  }

  public setState(state: number){
      if(state==1)
        this.isRegister = false;
      else
        this.isRegister = true;
  }

  public register(){
    this.authServise.register(this.pass, this.username).subscribe((res: any)=>{
      if(res.status){
        this.uiService.gotoMain();
      }
      else
        alert("Nista!");
    });
  }

  public login(){
    this.authServise.login(this.pass, this.username).subscribe((res: any)=>{
      if(res.status){
      //alert("nesto");
      this.uiService.gotoMain();
      }
      else
        alert("Greska!");
      this.uiService.gotoMain();
    });
  }

}

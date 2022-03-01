import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-votes-meter',
  templateUrl: './votes-meter.component.html',
  styleUrls: ['./votes-meter.component.css']
})
export class VotesMeterComponent implements OnInit {

  @Input() public positive: string="";
  @Input() public negative: string = "";
  public pos: number = 0;
  public neg: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.pos = parseInt(this.positive);
    this.neg = parseInt(this.negative);
  }

}

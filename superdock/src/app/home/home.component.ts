import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  isCollapsed = false;

  toggleCollapsed(value: boolean): void {
    this.isCollapsed = value;
  }
  ngOnInit() {

  }

}

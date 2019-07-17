import { StoreService } from './../store.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import API from "../../API.js"

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() collapsed = new EventEmitter<boolean>();
  @Input("isCollapsed") isCollapsed: boolean = false;

  constructor(
    private http: HttpClient,
    private store: StoreService
  ) { }

  state: any = this.store.state;
  ngOnInit() {
    //用户信息
    this.http.get("/api" + API.local.user).subscribe((data: any) => {
      this.store.state.userInfo = data;
    });
  }

  toggleCollapsed() {
    this.collapsed.emit(!this.isCollapsed);
  }
}

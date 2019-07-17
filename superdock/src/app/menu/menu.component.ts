import { StoreService } from './../store.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import API from "../../API.js";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input("isCollapsed") isCollapsed: boolean;

  constructor(
    private translate: TranslateService,
    private http: HttpClient,
    private store: StoreService
  ) { }

  state = this.store.state;
  ngOnInit() {
    this.initData();
  }

  initData() {
    //任務管理子菜单
    let url = API.config.suffix !== '' ? API.local["plans"] + API.config.suffix : API.local["plans"];
    url = "/api" + url;
    this.http.get(url).subscribe((menuData: any) => {
      this.store.state.plans = menuData;
    });
    //机场/无人机子菜单
    let urlNodes = API.config.suffix !== '' ? API.local["nodes"] + API.config.suffix : API.local["nodes"];
    urlNodes = "/api" + urlNodes;
    this.http.get(urlNodes).subscribe((menuData: any) => {
      this.store.state.nodes = menuData;
    })
  }
  getStatusText(status) {
    switch (status) {
      case 0: return 'normal';
      case 1: return 'shutdown';
      case 2: return 'net_error';
      default: return 'never_online';
    }
  }

  depotNodes() {
    return this.store.state.nodes.filter(node => node.type_name === 'depot');
  }
  airNodes() {
    return this.store.state.nodes.filter(node => node.type_name === 'air');
  }
}

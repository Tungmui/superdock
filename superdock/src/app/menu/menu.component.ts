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
  nodeStatus: any[] = JSON.parse(localStorage.getItem("nodeStatus"));
  nodes: any[] = JSON.parse(localStorage.getItem("nodes"));
  userInfo: any = JSON.parse(localStorage.getItem("userInfo"));
  plans: any[] = JSON.parse(localStorage.getItem("plans"));
  constructor(
    private translate: TranslateService,
    private http: HttpClient
  ) { }

  ngOnInit() {
  }

  initData() {
    //获取菜单栏
    let url = API.config.suffix !== '' ? API.local["plans"] + API.config.suffix : API.local["plans"];
    url = "/api" + url;
    this.http.get(url).subscribe((menuData: any) => {
      console.log(menuData);
      localStorage.setItem("plans", JSON.stringify(menuData));
      this.plans = menuData;
    })
    const StatusIcon = {
      0: 'el-icon-success',
      1: 'el-icon-info',
      2: 'el-icon-error'
    };

    const StatusColor = {
      0: '#67C23A',
      1: '#909399',
      2: '#F56C6C'
    };
    this.translate.get("header").subscribe(data => {
      this.nodeStatus = this.nodeStatus.map(st => {
        const node = this.nodes.find(node => st.id == node.id);
        return {
          icon: StatusIcon[st.status] || 'el-icon-warning',
          color: StatusColor[st.status] || '#E6A23C',
          text: `${data[node.type_name]} ${node.name} ${data[this.getStatusText(st.status)]}`
        };
      });
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
    return this.nodes.filter(node => node.type_name === 'depot');
  }
  airNodes() {
    return this.nodes.filter(node => node.type_name === 'air');
  }
}

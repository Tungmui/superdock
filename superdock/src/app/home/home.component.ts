import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private translate: TranslateService
  ) { }
  nodeStatus: any[] = JSON.parse(localStorage.getItem("nodeStatus"));
  nodes: any[] = JSON.parse(localStorage.getItem("nodes"));
  userInfo: any = JSON.parse(localStorage.getItem("userInfo"));
  ngOnInit() {
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
}
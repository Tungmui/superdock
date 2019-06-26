import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import * as flvjs from 'flv.js';

@Component({
  selector: 'app-plan-view',
  templateUrl: './plan-view.component.html',
  styleUrls: ['./plan-view.component.scss']
})
export class PlanViewComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private translate: TranslateService,
    private http: HttpClient
  ) { }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
  }
  plan: any;
  planLog: any;
  player: any;
  flvPlayer: any;
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      createDate: [null, [Validators.required]],
      planName: [null, [Validators.required]],
      frequency: [null, [Validators.required]],
      startDate: [null, [Validators.required]]
    });
    this.route.params.subscribe(params => {
      //获取plan信息
      this.http.get("/api/api/v1/plans/" + params.id).subscribe((data: any) => {
        this.plan = data;
        this.validateForm.get("name").setValue(this.plan.name);
        this.validateForm.get("description").setValue(this.plan.description);
        this.validateForm.get("createDate").setValue(this.plan.created_at);
        this.validateForm.get("startDate").setValue(this.plan.start_time);
        this.drones();
        this.translate.get(`plan.edit.cycle_type_${this.plan.cycle_types_id + 1}`).subscribe((str: any) => {
          console.log(str);
          this.validateForm.get("frequency").setValue(str);
        })
      });
      //获取plan log
      this.http.get(`/api/api/v1/plans/${params.id}/plan_logs/`).subscribe(data => {
        this.planLog = data;
      })
    })
  }
  ngAfterContentInit(): void {
    // 获取DOM对象
    this.player = document.getElementById('videoElement');

    if (flvjs.default.isSupported()) {
      // 创建flvjs对象
      this.flvPlayer = flvjs.default.createPlayer({
        type: 'flv',        // 指定视频类型
        isLive: true,       // 开启直播
        hasAudio: false,    // 关闭声音
        cors: true,         // 开启跨域访问
        url: "https://api.sb.im:3389/live/ganghang-outdoor.flv",   // 指定流链接
      });

      // 将flvjs对象和DOM对象绑定
      this.flvPlayer.attachMediaElement(this.player);
      // 加载视频
      this.flvPlayer.load();
      // 播放视频
      this.flvPlayer.play();
    }

  }
  drones() {
    let nodes = JSON.parse(localStorage.getItem("nodes"));
    nodes = nodes.find(item => item.id == this.plan.node_id);
    this.validateForm.get("planName").setValue(nodes.name);
  }
  add() {
    let plan = {
      name: this.validateForm.get("name").value,
      description: this.validateForm.get("description").value,
      node_id: this.plan.node_id,
      cycle_types_id: this.plan.cycle_types_id
    }
    this.http.post("/api/api/v1/plans/", plan).subscribe(data => {
      console.log(data);
      if (data) {
        alert("添加成功");
      }
    })
  }
  edit() {
    let plan = {
      id: this.plan.id,
      name: this.validateForm.get("name").value,
      description: this.validateForm.get("description").value,
      node_id: this.plan.node_id,
      cycle_types_id: this.plan.cycle_types_id
    }
    this.http.patch("/api/api/v1/plans/" + this.plan.id, plan).subscribe(data => {
      console.log(data);
      if (data) {
        alert("修改成功");
      }
    })
  }
  delete() {
    this.http.delete("/api/api/v1/plans/" + this.plan.id).subscribe(data => {
      console.log(data);
      this.router.navigate(["home"]);
    })
  }

  handleDownload(url, name) {
    // this.downloadFile({ url, name: `plan_${this.plan.id}_${name}` });
    console.log(url, name);
    this.http.get(url, { observe: 'response', responseType: "blob" }).subscribe((data: any) => {
      this.downfile(data, name);
    })
  }

  handleMapDownload() {
    this.http.get("/api" + this.plan.map_path, { observe: "response", responseType: "blob" }).subscribe((data: any) => {
      this.downfile(data, `plan_${this.plan.id}.waypoints`);
    })
  }
  downfile(data: any, name: string) {
    // 创建隐藏的可下载链接
    var eleLink = document.createElement('a');
    eleLink.download = name;
    eleLink.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = data.body;
    eleLink.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(eleLink);
    eleLink.click();
    // 然后移除
    document.body.removeChild(eleLink);
  }
}

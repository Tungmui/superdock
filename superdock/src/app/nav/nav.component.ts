import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Output() collapsed = new EventEmitter<boolean>();
  @Input("isCollapsed") isCollapsed: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  toggleCollapsed() {
    this.collapsed.emit(!this.isCollapsed);
  }
}

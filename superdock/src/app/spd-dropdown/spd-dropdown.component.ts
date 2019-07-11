import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-spd-dropdown',
  templateUrl: './spd-dropdown.component.html',
  styleUrls: ['./spd-dropdown.component.scss']
})
export class SpdDropdownComponent implements OnInit {
  isShow: boolean = false;
  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef
  ) { }

  private clickOutsideSubscription = Subscription.EMPTY;
  ngOnInit() {
    this.clickOutsideSubscription = fromEvent<MouseEvent>(document, 'click').subscribe(data => {
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.close();
      }
    })
  }

  trigger() {
    this.isShow = !this.isShow;
    console.log(this.elementRef.nativeElement);
  }

  close() {
    this.isShow = false;
  }
  ngOnDestroy(): void {
    this.clickOutsideSubscription.unsubscribe();
  }
}

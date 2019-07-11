import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpdDropdownComponent } from './spd-dropdown.component';

describe('SpdDropdownComponent', () => {
  let component: SpdDropdownComponent;
  let fixture: ComponentFixture<SpdDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpdDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpdDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

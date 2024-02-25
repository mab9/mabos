import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetailComponent } from './dashboard-detail.component';

describe('DashboardDetailComponent', () => {
  let component: DashboardDetailComponent;
  let fixture: ComponentFixture<DashboardDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

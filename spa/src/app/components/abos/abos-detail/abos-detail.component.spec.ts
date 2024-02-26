import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosDetailComponent } from './abos-detail.component';

describe('DashboardDetailComponent', () => {
  let component: AbosDetailComponent;
  let fixture: ComponentFixture<AbosDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbosDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbosDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

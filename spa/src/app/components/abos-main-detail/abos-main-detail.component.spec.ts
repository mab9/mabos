import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosMainDetailComponent } from './abos-main-detail.component';

describe('AbosMainDetailComponent', () => {
  let component: AbosMainDetailComponent;
  let fixture: ComponentFixture<AbosMainDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbosMainDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbosMainDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

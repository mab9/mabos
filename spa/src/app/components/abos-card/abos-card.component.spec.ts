import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosCardComponent } from './abos-card.component';

describe('AbosCardComponent', () => {
  let component: AbosCardComponent;
  let fixture: ComponentFixture<AbosCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbosCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

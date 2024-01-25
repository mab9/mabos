import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosComponent } from './abos.component';

describe('AbosComponent', () => {
  let component: AbosComponent;
  let fixture: ComponentFixture<AbosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosReactiveComponent } from './abos-reactive.component';

describe('AbosReactiveComponent', () => {
  let component: AbosReactiveComponent;
  let fixture: ComponentFixture<AbosReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbosReactiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbosReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

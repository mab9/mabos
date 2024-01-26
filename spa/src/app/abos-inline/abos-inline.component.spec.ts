import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosInlineComponent } from './abos-inline.component';

describe('AbosInlineComponent', () => {
  let component: AbosInlineComponent;
  let fixture: ComponentFixture<AbosInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbosInlineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AbosInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

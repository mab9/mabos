import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosMainComponent } from './abos-main.component';

describe('AbosComponent', () => {
  let component: AbosMainComponent;
  let fixture: ComponentFixture<AbosMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbosMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

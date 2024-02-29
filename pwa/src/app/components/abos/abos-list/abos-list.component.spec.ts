import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbosListComponent } from './abos-list.component';

describe('AbosComponent', () => {
  let component: AbosListComponent;
  let fixture: ComponentFixture<AbosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {KeycloakService} from "keycloak-angular";

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {

    const mockKeycloakService = {
      // mock properties and methods as needed
    };

    await TestBed.configureTestingModule({
      imports: [ProfileComponent, HttpClientTestingModule],
      providers: [
        { provide: KeycloakService, useValue: mockKeycloakService },
        // any other providers your component needs
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

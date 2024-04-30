import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationContainer } from './organization.container';

describe('OrganizationContainer', () => {
  let component: OrganizationContainer;
  let fixture: ComponentFixture<OrganizationContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationContainer]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

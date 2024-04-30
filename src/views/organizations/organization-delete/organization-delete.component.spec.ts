import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDeleteComponent } from './organization-delete.component';

describe('OrganizationDeleteComponent', () => {
  let component: OrganizationDeleteComponent;
  let fixture: ComponentFixture<OrganizationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizationDeleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

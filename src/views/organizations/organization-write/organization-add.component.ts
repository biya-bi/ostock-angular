import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { Organization } from '../../../models/organization';
import { OrganizationWriteComponent } from './organization-write.component';

@Component({
  selector: 'app-organization-add',
  templateUrl: './organization-write.component.html',
  styleUrl: './organization-write.component.css'
})
export class OrganizationAddComponent extends OrganizationWriteComponent implements OnInit {

  constructor(protected override readonly router: Router, private readonly apiConnector: ApiConnector) {
    super(router);
  }

  ngOnInit(): void {
    // TODO: Get title from localized resources
    this.title$ = of('Add an organization');
    this.initFormGroup();
  }

  protected override onSubmit(organization: Organization): Observable<Organization> {
    return this.apiConnector.createOrganization(organization);
  }

}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, take, tap } from 'rxjs';
import { ApiConnector } from '../../../connectors/api.connector';
import { ModalResponse } from '../../../models/modal-response';
import { OrganizationDetailsComponent } from '../organization-details/organization-details.component';
import { OrganizationListComponent } from '../organization-list/organization-list.component';
import { OrganizationEditComponent } from '../organization-write/organization-edit.component';

@Component({
  selector: 'app-organization-container',
  templateUrl: './organization.container.html',
  styleUrl: './organization.container.css'
})
export class OrganizationContainer {

  constructor(private readonly apiConnector: ApiConnector, private readonly router: Router, private readonly activatedRoute: ActivatedRoute) { }

  onActivate(component: any) {
    if (component instanceof OrganizationListComponent) {
      this.apiConnector.readOrganizations().pipe(take(1), tap(organizations => component.organizations = organizations)).subscribe();
    } else if (component instanceof OrganizationDetailsComponent || component instanceof OrganizationEditComponent) {
      this.activatedRoute.queryParams.pipe(
        take(1),
        switchMap(params => this.apiConnector.readOrganization(params['uri'])),
        tap(organization => component.organization = organization)
      ).subscribe();
    }
  }

  onResponse(response: ModalResponse) {
    if (response.answer === 'YES') {
      this.activatedRoute.queryParams.pipe(take(1),
        switchMap(params => this.apiConnector.deleteOrganization(params['uri'])),
        tap(() => {
          response.closeElement.click();
          this.router.navigate(['/organizations']);
        })).subscribe();
    }
  }

}

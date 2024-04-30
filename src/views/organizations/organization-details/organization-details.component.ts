import { Component, Input } from '@angular/core';
import { Organization } from '../../../models/organization';

@Component({
  selector: 'app-organization-details',
  templateUrl: './organization-details.component.html',
  styleUrl: './organization-details.component.css'
})
export class OrganizationDetailsComponent {

  @Input() organization: Organization;

}

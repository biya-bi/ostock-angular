import { Component, Input } from '@angular/core';
import { Organization } from '../../../models/organization';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrl: './organization-list.component.css'
})
export class OrganizationListComponent {

  @Input() organizations: Organization[];

}

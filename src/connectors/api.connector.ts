import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, map, of } from 'rxjs';
import { OrganizationCollectionModel } from '../models/organization-collection.model';
import { Organization } from '../models/organization';

@Injectable({
  providedIn: 'root'
})
export class ApiConnector {

  private readonly url = 'http://localhost:8072/api';
  private readonly organizationEndpoint = this.url + '/v1/organization';

  constructor(private readonly httpClient: HttpClient, private readonly oAuthService: OAuthService) { }

  private getOptions() {
    return {
      headers: {
        Authorization: 'Bearer ' + this.oAuthService.getAccessToken()
      }
    }
  }

  createOrganization(organization: Organization): Observable<Organization> {
    return this.httpClient.post<Organization>(this.organizationEndpoint, organization, this.getOptions());
  }

  readOrganizations(): Observable<Organization[]> {
    return this.httpClient.get<OrganizationCollectionModel>(this.organizationEndpoint, this.getOptions()).pipe(map(m => m._embedded.organizationList));
  }

  readOrganization(uri: string): Observable<Organization> {
    return uri ? this.httpClient.get<Organization>(uri, this.getOptions()) : of(null);
  }

  updateOrganization(organization: Organization): Observable<Organization> {
    return this.httpClient.put<Organization>(organization._links.update.href, organization, this.getOptions());
  }

  deleteOrganization(url: string): Observable<void> {
    return this.httpClient.delete<void>(url, this.getOptions());
  }

}

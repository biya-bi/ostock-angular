import { Organization } from "./organization"

export interface OrganizationCollectionModel {
    _embedded: {
        organizationList: Organization[]
    }
}
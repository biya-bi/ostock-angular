import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { Organization } from '../../../models/organization';

@Component({
    template: '',
})
export abstract class OrganizationWriteComponent {

    protected title$: Observable<string>;

    formGroup: FormGroup;

    constructor(protected readonly router: Router) { }

    submit(): void {
        const organization = { ...this.formGroup.value, asOf: Math.ceil(new Date(this.formGroup.value.asOf).valueOf() / 1000) };
        this.onSubmit(organization).pipe(take(1), tap(() => this.router.navigate(['/organizations']))).subscribe();
    }

    protected abstract onSubmit(organization: Organization): Observable<Organization>;

    protected initFormGroup(organization?: Organization): void {
        this.formGroup = new FormGroup({
            id: new FormControl(organization?.id),
            name: new FormControl(organization?.name),
            contactName: new FormControl(organization?.contactName),
            contactEmail: new FormControl(organization?.contactEmail),
            contactPhone: new FormControl(organization?.contactPhone),
            _links: new FormControl(organization?._links),
        });
    }

}

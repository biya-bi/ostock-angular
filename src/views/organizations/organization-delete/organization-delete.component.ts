import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalResponse } from '../../../models/modal-response';

@Component({
  selector: 'app-organization-delete',
  templateUrl: './organization-delete.component.html',
  styleUrl: './organization-delete.component.css'
})
export class OrganizationDeleteComponent {

  @ViewChild('closeButton') closeButton: ElementRef<HTMLElement>;

  @Output() response = new EventEmitter<ModalResponse>();

}

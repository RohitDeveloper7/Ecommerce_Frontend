import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-fields',
  templateUrl: './custom-fields.component.html',
  styleUrls: ['./custom-fields.component.scss']
})
export class CustomFieldsComponent {
  text: string | undefined;
  @Input() steps!: Number;
}

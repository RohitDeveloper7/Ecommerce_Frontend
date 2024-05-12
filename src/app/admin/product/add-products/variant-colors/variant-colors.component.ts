import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-variant-colors',
  templateUrl: './variant-colors.component.html',
  styleUrls: ['./variant-colors.component.scss']
})
export class VariantColorsComponent {
  variationColor: FormGroup;
  previewCclorData: any[] = [];
  colorPickerValue: string = '#000000';
  @Input() steps!: Number;
  constructor(private formBuilder: FormBuilder) { 

    this.variationColor = this.formBuilder.group({
      input1: ["", Validators.required],
      radio: ["", Validators.required],
      fileText: ["", Validators.required],
      color: [""]
    });

  }

  onColorSubmit() {
    if (this.variationColor.valid) {
      this.previewCclorData.push({ ...this.variationColor.value });
      this.variationColor.reset(); // Reset form
      this.colorPickerValue = '#000000'; // Reset color picker
    }
  }

  deleteColorPreviewItem(index: number) {
    this.previewCclorData.splice(index, 1);
  }
}

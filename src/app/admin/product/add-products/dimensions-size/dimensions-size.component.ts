import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dimensions-size',
  templateUrl: './dimensions-size.component.html',
  styleUrls: ['./dimensions-size.component.scss']
})
export class DimensionsSizeComponent {
  formData: FormGroup;
  @Input() steps!: Number;
  previewData: any[] = [];

  constructor(private formBuilder: FormBuilder) {
    this.formData = this.formBuilder.group({
      input1: ["", Validators.required],
      radio: ["", Validators.required],
      fileText: ["", Validators.required]
    }); 

  }
 
  onSubmit() {
    this.previewData.push({ ...this.formData.value });
    this.formData.reset();
  }

  
  
  deletePreviewItem(index: number) {
    this.previewData.splice(index, 1);
  }

}

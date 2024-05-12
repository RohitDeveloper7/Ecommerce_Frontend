import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.scss']
})
export class UploadImagesComponent {
  showDeleteIcon: boolean[] = [];
  imageSrcList: string[] = [];
  @Input() steps!: Number;
  
  toggleDeleteIcon(index: number): void {
    this.showDeleteIcon[index] = !this.showDeleteIcon[index];
  }

  handleFileInput(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageSrcList.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  deleteImage(index: number): void {
    this.imageSrcList.splice(index, 1);
    this.showDeleteIcon.splice(index, 1);
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  providers: [MessageService]
})
export class BannerComponent implements OnInit {

  imageExtensionsArray: any = ['apng', 'jpg', 'avif', 'gif', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'webp'];
  categoryImg: any = [];
  // bannerDatas : any = []
  banner_id: any
  @ViewChild('imageInput') imageInputVariable: any = ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder, public messageService: MessageService, public global: GlobalService) { }

  ngOnInit() {
    this.getBanner()
  }
 
  bannerDatas: any = [ ];



  addBannerImage = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    banner_image: ["", Validators.required],
    type: ["", Validators.required],
    id: ["", Validators.required],
  })

  updateBanner = this.fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required],
    image: ["", Validators.required],
    type: ["", Validators.required],
    id: ["", Validators.required],
  })


  handleFileInput(event: any) {
    const file = event?.target?.files?.[0];
    if (file) {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      if (this.imageExtensionsArray && this.imageExtensionsArray.includes(fileExtension)) {
        this.categoryImg = file;
        console.log(" this.categoryImg", this.categoryImg);

        this.addBannerImage.get('image')?.setErrors(null); // Set image control as valid
      } else {
        this.imageInputVariable.nativeElement.value = '';
        this.addBannerImage.get('image')?.setErrors({ 'invalidImage': true }); // Set image control as invalid
      }
    }
  }


  addBannerData() { 
    const formData = new FormData();
    formData.append('file', this.categoryImg);
    formData.append('title', this.addBannerImage.get('title')?.value!);
    formData.append('description', this.addBannerImage.get('description')?.value!);
    formData.append('type', this.addBannerImage.get('type')?.value!);
    formData.append('id', this.addBannerImage.get('id')?.value!);
    this.global.postAuthenticateData(this.global.basepath + '/admin/addBanner', formData).subscribe(
      (res: any) => {
        this.getBanner()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
        this.addBannerImage.reset();
        this.imageInputVariable.nativeElement.value = ''; // Reset the file input
        this.categoryImg = null; // Reset the selected image
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.error });
      }
    );
  }

  getBanner() {
    this.global.getAuthenticateData(this.global.basepath + '/admin/getBanner').subscribe((res: any) => {
      this.bannerDatas = res.data;
    })
  }

  updateBannerData() {

    const formData = new FormData();
    formData.append('images', this.categoryImg);
    formData.append('title', this.updateBanner.get('title')?.value!);
    formData.append('description', this.updateBanner.get('description')?.value!);
    formData.append('type', this.updateBanner.get('type')?.value!);
    formData.append('id', this.updateBanner.get('id')?.value!);
    this.global.postAuthenticateData(this.global.basepath + '/admin/addBanner', formData).subscribe(
      (res: any) => {
        this.getBanner()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
        this.updateBanner.reset();
        this.imageInputVariable.nativeElement.value = ''; // Reset the file input
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.error });
      }
    );
  }

  deleteBanner() {
    if (this.banner_id) {
      this.bannerDatas = this.bannerDatas.filter((item: any) => item.id !== this.banner_id);
    }
    // Assuming your data array is named 'dataArray'

    this.global.postAuthenticateData(this.global.basepath + '/admin/delete', { id: this.banner_id }).subscribe(
      (res: any) => {
        this.getBanner()
        this.messageService.clear();
        this.messageService.add({ severity: 'success', summary: res.message });
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.message });
      })


  }

  patchValue(data: any) {
    this.updateBanner.patchValue(data)
    this.banner_id = data.id
  }

}


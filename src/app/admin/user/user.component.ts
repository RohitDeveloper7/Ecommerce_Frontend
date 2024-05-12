import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { GlobalService } from 'src/app/global.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers:[MessageService]
})
export class UserComponent {

  users: any = []
  user_id: any

  constructor(public global: GlobalService, public messageService: MessageService) {
  }

  ngOnInit() {
    this.getUsers()
  }

  getUsers() {
    this.global.getAuthenticateData(this.global.basepath + '/user/getUser').subscribe((res: any) => {
      this.users = res.data;
      console.log("users", this.users)
    })
  }

  deleteuser() {
    console.log("this.category_id", this.user_id);
    this.global.postAuthenticateData(this.global.basepath + '/admin/user/delete', { id: this.user_id }).subscribe(
      (res: any) => {
        this.getUsers()
      },
      (err: any) => {
        console.log(err);
        this.messageService.clear();
        this.messageService.add({ severity: 'error', summary: err.error.message });
      })
  } 

  patchValue(data: any) {
    console.log("data", data);

    this.user_id = data;
  }

}

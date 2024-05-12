import { Component } from '@angular/core';
import { GlobalService } from '../global.service';
import { PhoneNumberPipe } from '../shared/phone-number.pipe';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
phoneNumber(arg0: string) {
throw new Error('Method not implemented.');
}
  users: any = []

  userEdit: boolean = false;
  pswdEdit: boolean = false;
  changeMobileStep: number = 0;
  changeEmailStep: number = 0;
  activeTab: any = sessionStorage.getItem('userMyprofileTab') ? sessionStorage.getItem('userMyprofileTab') : 'my-profile';
  password: any = 'password';
  newPassword: any = 'password';
  confirmPassword: any = 'password';
  products: any = [
    {
      orderId: '#HOPE000001',
      products: 'TV',
      quantity: '1',
      amount: '1500'
    },
    {
      orderId: '#HOPE000002',
      products: 'Laptop',
      quantity: '1',
      amount: '1200'
    },
    {
      orderId: '#HOPE000003',
      products: 'Smartphone',
      quantity: '2',
      amount: '800'
    },
    {
      orderId: '#HOPE000004',
      products: 'Headphones',
      quantity: '1',
      amount: '100'
    },
    {
      orderId: '#HOPE000005',
      products: 'Camera',
      quantity: '1',
      amount: '700'
    },
    {
      orderId: '#HOPE000006',
      products: 'Printer',
      quantity: '1',
      amount: '300'
    },
    {
      orderId: '#HOPE000007',
      products: 'Tablet',
      quantity: '1',
      amount: '500'
    },
    {
      orderId: '#HOPE000008',
      products: 'Gaming Console',
      quantity: '1',
      amount: '400'
    },
    {
      orderId: '#HOPE000009',
      products: 'Smartwatch',
      quantity: '1',
      amount: '250'
    },
    {
      orderId: '#HOPE000010',
      products: 'Blender',
      quantity: '1',
      amount: '50'
    },
    {
      orderId: '#HOPE000011',
      products: 'Microwave',
      quantity: '1',
      amount: '150'
    },
    {
      orderId: '#HOPE000012',
      products: 'Vacuum Cleaner',
      quantity: '1',
      amount: '200'
    },
    {
      orderId: '#HOPE000013',
      products: 'Toaster',
      quantity: '1',
      amount: '30'
    },
    {
      orderId: '#HOPE000014',
      products: 'Coffee Maker',
      quantity: '1',
      amount: '80'
    },
    {
      orderId: '#HOPE000015',
      products: 'Hair Dryer',
      quantity: '1',
      amount: '40'
    },
    {
      orderId: '#HOPE000016',
      products: 'Iron',
      quantity: '1',
      amount: '20'
    },
    {
      orderId: '#HOPE000017',
      products: 'Water Bottle',
      quantity: '1',
      amount: '10'
    },
    {
      orderId: '#HOPE000018',
      products: 'Backpack',
      quantity: '1',
      amount: '60'
    },
    {
      orderId: '#HOPE000019',
      products: 'Sneakers',
      quantity: '1',
      amount: '80'
    },
    {
      orderId: '#HOPE000020',
      products: 'Watch',
      quantity: '1',
      amount: '150'
    },
    {
      orderId: '#HOPE000021',
      products: 'Sunglasses',
      quantity: '1',
      amount: '100'
    }
  ]

  constructor(public global: GlobalService) {
  }

  ngOnInit() {
    this.getUsers()
    window.scroll(0, 0)
  }

  changeTo(val: any) {
    if (val == 'address') {
      // this.getUserAddress()
    }
    this.activeTab = val;
    sessionStorage.setItem('userMyprofileTab', val)
  }

  getUsers() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const apiUrl = `${this.global.basepath}/user/get-user?id=${userId}`;
      this.global.getAuthenticateData(apiUrl).subscribe((res: any) => {
        this.users = res.data;
        console.log("users", this.users);
      }, error => {
        console.error('Error fetching user data:', error);
      });
    } else {
      console.error('User ID not found in localStorage.');
    }
  }
  
}

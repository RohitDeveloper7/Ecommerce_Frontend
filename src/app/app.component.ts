import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hope';

  constructor(private router: Router) { }

  onAdminPage() {
    if (this.router.url.includes('/admin')) {
      return true;
    }
    else {
      return false;
    }
  }

  onAdminLogin() {
    if (this.router.url.includes('/admin/auth/admin-login')) {
      return true;
    }
    else {
      return false;
    }
  }
}

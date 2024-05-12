import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
   activeTab: any = sessionStorage.getItem('useractiveTab') ? sessionStorage.getItem('useractiveTab') : 'home';

  currentYear: number = new Date().getFullYear();

  constructor(private router: Router,) {
  }

  scrollToTop() {
    // Scroll to top of the page
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  navigateTo(val: any) {
    this.activeTab = val;
    sessionStorage.setItem('useractiveTab', val)
    this.router.navigate(['/shared/',val])
  }
}

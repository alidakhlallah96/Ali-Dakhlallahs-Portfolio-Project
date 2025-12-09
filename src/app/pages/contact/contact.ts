import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css']
})
export class Contact {

  popup: string | null = null;

  constructor(private router: Router) {}

  showPopup(type: string) {
    this.popup = type;
  }

  closePopup() {
    this.popup = null;
  }

  getPopupText(): string {
    switch (this.popup) {
      case 'email':
        return 'W0687251@stclairconnect.ca';
      case 'phone':
        return '226-506-9214';
      case 'linkedin':
        return 'linkedin.com/in/ali-dakhklallah-661aa6232/';
      case 'github':
        return 'github.com/alidakhlallah96';
      default:
        return '';
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profile: Profile = {
    name: 'Ali Dakhlallah',
    title: 'Mobile App Development Student & Developer',
    bio: 'Banking professional turned developer. Experience in Angular, Java, PHP, MySQL, Python.',
    location: 'Windsor, Ontario',
    email: 'ali@example.com',
    github: 'https://github.com/YOUR_USERNAME',
    linkedin: 'https://www.linkedin.com/in/YOUR_LINK'
  };

  constructor() {}

  getProfile(): Profile {
    return this.profile;
  }
}

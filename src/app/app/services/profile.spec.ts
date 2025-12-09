import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a valid profile object', () => {
    const profile = service.getProfile();

    expect(profile).toBeTruthy();
    expect(profile.name).toBeDefined();
    expect(typeof profile.name).toBe('string');

    expect(profile.email).toBeDefined();
    expect(profile.github).toBeDefined();
    expect(profile.linkedin).toBeDefined();
  });
});

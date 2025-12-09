import { Injectable } from '@angular/core';
import { Skills } from '../models/skills';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  private skills: Skills[] = [
    {
      category: 'Frontend',
      items: ['Angular', 'TypeScript', 'HTML', 'CSS']
    },
    {
      category: 'Backend',
      items: ['PHP', 'MySQL', 'Node.js', 'Express']
    },
    {
      category: 'Programming',
      items: ['Java', 'Python', 'OOP', 'Data Structures']
    },
    {
      category: 'Tools',
      items: ['Git', 'IntelliJ', 'VS Code', 'Figma']
    }
  ];

  constructor() {}

  getSkills(): Skills[] {
    return this.skills;
  }
}

import { Injectable } from '@angular/core';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private projects: Project[] = [
    {
      id: 1,
      title: "BattleBoats",
      description: "A JavaFX-based Battleship-inspired strategy game with grids, turns, and CPU logic.",
      tech: ["Java", "JavaFX"],
      image: "assets/projects/BattleBoats.png"
    },
    {
      id: 2,
      title: "The Video Game Vault",
      description: "A complete JavaFX desktop inventory application for buying, selling, and managing video games.",
      tech: ["Java", "JavaFX"],
      image: "assets/projects/placeholder.png"
    },
    {
      id: 3,
      title: "My Favorite NFL Players Website",
      description: "An Angular website that displays NFL players using routing, services, and detail pages.",
      tech: ["Angular", "TypeScript"],
      image: "assets/projects/placeholder.png"
    },
    {
      id: 4,
      title: "Live Auction",
      description: "A live auction. where users can buy or sell items. With payments being made through paypal",
      tech: ["PHP", "PayPal"],
      image: "app/"
    },
    {
      id: 5,
      title: "Contact me Mini Game",
      description: "An angular mini game I created for my Portfolio project Final Assignment.",
      tech: ["Angular", "TypeScript"],
      image: "assets/projects/placeholder.png"
    }
  ];

  constructor() {}

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: number): Project | undefined {
    return this.projects.find(p => p.id === id);
  }
}

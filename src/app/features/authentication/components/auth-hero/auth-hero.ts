import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-hero',
  styles: `
    :host {
      display: block;
    }
  `,
  templateUrl: './auth-hero.html',
})
export class AuthHero {
  protected readonly stations = ['Xin chào', 'Hello', 'Guten Tag', 'Hola', 'Bonjour'];
  protected readonly current = 2;

  /** Position of a station along the line, from 0 (first) to 1 (last). */
  protected offset(index: number): number {
    return index / (this.stations.length - 1);
  }
}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Authentication } from './features/authentication/authentication';

@Component({
  imports: [RouterOutlet, Authentication],
  selector: 'app-root',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('lango');
}

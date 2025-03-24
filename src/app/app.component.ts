import { Component } from '@angular/core';

import { MovieListComponent } from './movie-list/movie-list.component';

@Component({
  selector: 'app-root',
  imports: [MovieListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'filmdatenbank';
}

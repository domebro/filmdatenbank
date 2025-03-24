import { HttpClient } from '@angular/common/http';
import { Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css',
})
export class MovieListComponent {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiKey = environment.tmdbApiKey;
  private apiUrl = 'https://api.themoviedb.org/3';

  // Signal für die Filmliste
  movies: WritableSignal<any[]> = signal([]);

  constructor() {
    this.fetchMovies();
  }

  fetchMovies() {
    const url = `${this.apiUrl}/trending/movie/week?api_key=${this.apiKey}&language=de-DE`;

    this.http.get<any>(url).subscribe((response) => {
      this.movies.set(response.results || []);
    });

  }

  viewDetails(movieId: number) {
    this.router.navigate(['/movie', movieId]);
  }
}

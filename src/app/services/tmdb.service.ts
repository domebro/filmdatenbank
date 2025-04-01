import { map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;
  private http = inject(HttpClient);

  movies: WritableSignal<any[]> = signal([]);

  constructor() {}

  // 🔹 Beliebte Filme abrufen
  fetchTrendingMovies() {
    const url = `${this.apiUrl}/trending/movie/week?api_key=${this.apiKey}&language=de-DE`;
    this.http.get<{ results: any[] }>(url).subscribe((response) => {
      this.movies.set(response.results || []);
    });
  }

  // 🔹 Einzelne Film-Details abrufen
  getMovieDetails(movieId: number): Signal<any> {
    const url = `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&language=de-DE`;
    return toSignal(this.http.get<any>(url), { initialValue: null });
  }

  // 🔹 Streaming-Anbieter abrufen
  getWatchProviders(movieId: number): Signal<any[]> {
    const url = `${this.apiUrl}/movie/${movieId}/watch/providers?api_key=${this.apiKey}`;
    return toSignal(
      this.http
        .get<any>(url)
        .pipe(map((response) => response.results?.DE?.flatrate || [])),
      { initialValue: [] }
    );
  }
}

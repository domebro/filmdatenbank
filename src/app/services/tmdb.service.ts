import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = environment.tmdbApiKey;

  constructor(private http: HttpClient) {}

  // 🔹 Beliebte Filme abrufen
  getPopularMovies() {
    return this.http.get(
      `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=de-DE`
    );
  }

  // 🔹 Filmsuche
  searchMovies(query: string) {
    return this.http.get(
      `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&language=de-DE`
    );
  }

  // 🔹 Einzelne Film-Details abrufen
  getMovieDetails(movieId: number) {
    return this.http.get(
      `${this.apiUrl}/movie/${movieId}?api_key=${this.apiKey}&language=de-DE`
    );
  }
}

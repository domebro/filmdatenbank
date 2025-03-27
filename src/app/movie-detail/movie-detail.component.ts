import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Signal, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent {
  private route = inject(ActivatedRoute);
  private movieService = inject(TmdbService);

  // 🔹 Signal für die Filmdetails
  movie: Signal<any>;

  constructor() {
    const movieId = this.route.snapshot.paramMap.get('id');
    this.movie = this.movieService.getMovieDetails(Number(movieId));
  }
}

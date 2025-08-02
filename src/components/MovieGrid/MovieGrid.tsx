
import styles from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';
import { getImageUrl } from '../../types/movieService';

// Інтерфейс для пропсів компонента
interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

import React from 'react';

const MovieGrid: React.FC<MovieGridProps> = ({ movies, onSelect }) => {
  return (
    <ul className={styles.grid}>
      {movies.map(movie => (
        <li key={movie.id} onClick={() => onSelect(movie)}>
          <div className={styles.card}>
            <img
              className={styles.image}
              src={getImageUrl(movie.poster_path, 'w500')}
              alt={movie.title}
              loading="lazy"
            />
            <h2 className={styles.title}>{movie.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieGrid;



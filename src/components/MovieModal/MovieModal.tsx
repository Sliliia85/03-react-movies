import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './MovieModal.module.css';
import  type { Movie } from '../../types/movie';
import { getImageUrl } from '../../types/movieService';

// Інтерфейс для пропсів компонента
interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const modalRoot = document.getElementById('modal-root') as HTMLElement;
const body = document.body;

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  // useEffect для обробки клавіші Esc та заборони скролінгу
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    body.style.overflow = 'hidden'; // Забороняємо скролінг
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = 'unset'; // Повертаємо скролінг
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} aria-label="Close modal" onClick={onClose}>
          &times;
        </button>
        <img
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default MovieModal;

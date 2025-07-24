import css from "./MovieModal.module.css";
import { type Movie } from "../../types/movie";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
   
        const keyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
               onClose() 
            }
        }
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", keyDown);
    
        return () => {
            window.removeEventListener("keydown", keyDown);
            document.body.style.overflow = "";
        }
  }, [onClose])
   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
     if (e.target === e.currentTarget) {
       onClose();
     }
   };
    
return createPortal(
  <div
    className={css.backdrop}
    onClick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
  >
    <div className={css.modal}>
      <button
        className={css.closeButton}
        aria-label="Close modal"
        onClick={onClose}
      >
        &times;
      </button>
      <img
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className={css.image}
      />
      <div className={css.content}>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
        <p>
          <strong>Release Date:</strong> {movie.release_date}
        </p>
        <p>
          <strong>Rating:</strong> {movie.vote_average}/10
        </p>
      </div>
    </div>
  </div>,
  document.body
);
}

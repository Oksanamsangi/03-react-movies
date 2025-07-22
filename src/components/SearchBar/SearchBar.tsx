import { useState, type FormEvent } from "react";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimedQuery = query.trim();
    if (trimedQuery === "") return;
    onSubmit(trimedQuery);
    setQuery("");
  };
  return (
    <div>
      <header className={styles.header}>
         {" "}
        <div className={styles.container}>
             {" "}
          <a
            className={styles.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
                  Powered by TMDB    {" "}
          </a>
             {" "}
          <form className={styles.form} onSubmit={handleSubmit}>
                 {" "}
            <input
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
                 {" "}
            <button className={styles.button} type="submit">
                      Search      {" "}
            </button>
               {" "}
          </form>
           {" "}
        </div>
      </header>
    </div>
  );
}

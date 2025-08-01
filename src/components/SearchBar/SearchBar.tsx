import styles from "./SearchBar.module.css";
import { toast } from "react-hot-toast";


interface SearchBarProps {
  onSubmit: (query: string) => void | Promise<void>;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const handleSubmit = async (formData: FormData) => {
    const query = (formData.get("query") as string)?.trim();

    if (!query) {
      toast.error("No movies found for your request");
      return;
    }

    await onSubmit(query);
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <a
            className={styles.link}
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by TMDB
          </a>

          <form className={styles.form} action={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              name="query"
              autoComplete="off"
              placeholder="Search movies..."
              autoFocus
            />
            <button className={styles.button} type="submit">
              Search
            </button>
          </form>
        </div>
      </header>
    </div>
  );
}


import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [query, setQuery] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const quickSearches = ["pikachu", "charizard", "gengar"];

  function handleSubmit(event) {
    event.preventDefault();

    const name = query.trim().toLowerCase();

    if (name === "") {
      setError("Type a Pokémon name first.");
      return;
    }

    setError(null);
    navigate(`/pokemon/${name}`);
  }

  return (
    <div className="search">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search a Pokémon by name…"
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <p className="status status-error">{error}</p>}

      <div className="quick-searches">
        {quickSearches.map((pokemonName) => (
          <button
            key={pokemonName}
            type="button"
            className="quick-search-button"
            onClick={() => navigate(`/pokemon/${pokemonName}`)}
          >
            {pokemonName}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchForm;

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../config.js";
import { capitalize } from "../utils.js";

function DetailPage() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    async function loadPokemon() {
      setIsLoading(true);
      setError(null);
      setPokemon(null);

      try {
        const response = await fetch(`${API_BASE_URL}/pokemon/${name}`);

        if (!response.ok) {
          throw new Error(`No Pokémon named "${name}" — check the spelling.`);
        }

        const data = await response.json();

        if (isCurrent) {
          setPokemon(data);
        }
      } catch (err) {
        if (isCurrent) {
          setError(err.message);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    }

    loadPokemon();

    return () => {
      isCurrent = false;
    };
  }, [name]);

  if (isLoading) return <p className="status">Loading {name}…</p>;
  if (error) return <p className="status status-error">{error}</p>;

  const artwork =
    pokemon.sprites.other["official-artwork"].front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="detail-page">
      <Link to="/" className="back-link">← Back to list</Link>
      <section className="detail-card">
        <div className="detail-art-panel">
          <span className="detail-number">#{String(pokemon.id).padStart(3, "0")}</span>
          <img
            className="detail-artwork"
            src={artwork}
            alt={pokemon.name}
            width={260}
            height={260}
          />
        </div>

        <div className="detail-info-panel">
          <h2>{capitalize(pokemon.name)}</h2>

          <div className="type-list">
            {pokemon.types.map((t) => (
              <span key={t.type.name} className={`type-pill type-${t.type.name}`}>
                {t.type.name}
              </span>
            ))}
          </div>

          <div className="pokemon-facts">
            <div>
              <span>Height</span>
              <strong>{pokemon.height / 10} m</strong>
            </div>
            <div>
              <span>Weight</span>
              <strong>{pokemon.weight / 10} kg</strong>
            </div>
            <div>
              <span>Ability</span>
              <strong>{capitalize(pokemon.abilities[0].ability.name)}</strong>
            </div>
          </div>

          <ul className="stat-list">
            {pokemon.stats.map((s) => (
              <li key={s.stat.name}>
                <div className="stat-row">
                  <span className="stat-name">{s.stat.name}</span>
                  <span className="stat-value">{s.base_stat}</span>
                </div>
                <div className="stat-track">
                  <span
                    className="stat-bar"
                    style={{ width: `${Math.min(s.base_stat, 100)}%` }}
                  ></span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default DetailPage;

import { Outlet, Link } from "react-router-dom";

function Layout() {
  return (
    <div className="app">
      <header className="app-header">
        <Link to="/" className="app-title-link">
          <span className="app-eyebrow">Trainer dashboard</span>
          <h1>PokéDex Mini</h1>
        </Link>
        <p className="app-tagline">
          Explore classic Pokémon with fast search, clean cards, and battle-ready stats.
        </p>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;

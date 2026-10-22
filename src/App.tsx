import { useEffect } from "react";
import { Glossary } from "./components/Glossary";
import { Home } from "./components/Home";
import { ProgressProvider } from "./components/ProgressContext";
import { QuizSession, sessionTitle } from "./components/QuizSession";
import { Stats } from "./components/Stats";
import { ThemeToggle } from "./components/ThemeToggle";
import { TERM_BY_ID } from "./data";
import { href, navigate, parseHash, useHash, type Route } from "./lib/router";

function title(route: Route): string {
  switch (route.name) {
    case "home":
      return "Quiz TypeScript";
    case "quiz":
      return sessionTitle(route.request);
    case "glossary":
      return route.termId ? (TERM_BY_ID.get(route.termId)?.term ?? "Glossaire") : "Glossaire";
    case "stats":
      return "Statistiques";
  }
}

// Vrai dès que l'utilisateur a navigué dans l'application (sinon : lien direct).
let navigatedInApp = false;
window.addEventListener("hashchange", () => {
  navigatedInApp = true;
});

function goBack(route: Route) {
  if (navigatedInApp && window.history.length > 1) window.history.back();
  else navigate(route.name === "glossary" && route.termId ? href.glossary() : href.home());
}

export function App() {
  const hash = useHash();
  const route = parseHash(hash);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    document.title = route.name === "home" ? "Quiz TypeScript" : `${title(route)} · Quiz TS`;
  }, [hash]);

  return (
    <ProgressProvider>
      <header className="app-header">
        {route.name === "home" ? (
          <span className="logo" aria-hidden="true">
            TS?
          </span>
        ) : (
          <button type="button" className="icon-button" onClick={() => goBack(route)} aria-label="Retour">
            ←
          </button>
        )}
        <h1 className="app-title">{title(route)}</h1>
        <ThemeToggle />
      </header>
      <main className="app-main">
        <Screen key={hash} route={route} />
      </main>
    </ProgressProvider>
  );
}

function Screen({ route }: { route: Route }) {
  switch (route.name) {
    case "home":
      return <Home />;
    case "quiz":
      return <QuizSession request={route.request} />;
    case "glossary":
      return <Glossary termId={route.termId} />;
    case "stats":
      return <Stats />;
  }
}

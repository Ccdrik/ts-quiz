# Quiz TypeScript

Application web **mobile-first** pour apprendre TypeScript sous forme de quiz, avec un glossaire de cours intégré. Installable sur l'écran d'accueil (PWA) et utilisable **hors ligne**. Tout le contenu est en français.

- 8 thèmes (débutant → avancé), 4 types de questions : texte à trous, réponse libre, QCM, vrai/faux
- Formats « Nommer l'élément », « Trouver l'erreur », « Quel est le type inféré ? »
- Correction tolérante (casse, accents, espaces, `;` final), explication, mini-exemple et liens vers le glossaire
- Sessions de 10 questions, récapitulatif des erreurs, mode **Révisions** (répétition espacée, boîtes de Leitner)
- Statistiques par thème, glossaire avec recherche et suivi « maîtrisé / à revoir », mode clair / sombre
- Progression sauvegardée dans le `localStorage` du navigateur, aucun backend

## Stack

Vite · React · TypeScript (strict) · vite-plugin-pwa · Vitest · CSS simple.

```
src/
├── components/   écrans et composants React (questions/, glossaire, stats…)
├── data/         contenu typé : un fichier de questions par thème + glossary/
├── lib/          logique pure et testée : correction, répétition espacée, sessions, stockage
└── types.ts      Question (union discriminée), GlossaryTerm, Progress…
```

## Lancer en local

Prérequis : Node.js 20 ou plus récent.

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # tests Vitest
npm run build      # vérification des types + build de production dans dist/
npm run preview    # sert le build (service worker actif, test hors ligne possible)
```

Les tests vérifient la logique de correction et de répétition espacée, l'intégrité du contenu (identifiants, liens du glossaire, cohérence des trous et des QCM), et **compilent chaque extrait de code avec le compilateur TypeScript** : les extraits « Trouver l'erreur » doivent échouer, tous les autres doivent compiler.

## Tester sur son téléphone (réseau local)

1. Le téléphone et l'ordinateur doivent être sur le même Wi-Fi.
2. Lancer le serveur en l'exposant sur le réseau :
   ```bash
   npm run dev:host      # équivaut à : vite --host
   ```
3. Vite affiche une adresse `Network`, par exemple `http://192.168.1.20:5173`. L'ouvrir dans le navigateur du téléphone.
4. Si la page ne s'ouvre pas, autoriser Node.js dans le pare-feu de l'ordinateur.

> Le service worker (mode hors ligne, installation) ne fonctionne qu'en **HTTPS** ou sur `localhost`. Sur le réseau local en HTTP, l'application marche mais ne s'installe pas : pour tester l'installation, déployer (voir ci-dessous).

## Déploiement gratuit

Le build utilise une base relative (`base: "./"`) et un routage par hash (`#/glossaire`…) : le dossier `dist/` fonctionne tel quel à la racine d'un domaine comme dans un sous-dossier, sans configuration de réécriture d'URL.

### Vercel

1. Pousser le dépôt sur GitHub, puis sur [vercel.com](https://vercel.com) : *Add New → Project* et importer le dépôt.
2. Vercel détecte Vite (build `npm run build`, dossier `dist`). Cliquer sur *Deploy*.

Fonctionne aussi avec un dépôt privé.

### GitHub Pages

Le workflow `.github/workflows/deploy.yml` lance les tests, compile et publie l'application à chaque push sur `main`.

1. Une seule fois : dans le dépôt, *Settings → Pages → Build and deployment → Source : GitHub Actions*.
2. Pousser sur `main` (ou relancer le workflow depuis l'onglet *Actions*).
3. L'application est publiée sur `https://<utilisateur>.github.io/<dépôt>/`, ici https://ccdrik.github.io/ts-quiz/.

GitHub Pages gratuit nécessite un dépôt **public** (sinon, utiliser Vercel).

## Installer sur l'écran d'accueil

Une fois l'application ouverte en HTTPS :

- **Android (Chrome)** : menu ⋮ → *Installer l'application* (ou *Ajouter à l'écran d'accueil*).
- **iPhone (Safari)** : bouton Partager → *Sur l'écran d'accueil*.

Après la première ouverture, tout le contenu est en cache : l'application fonctionne en mode avion. Les mises à jour sont téléchargées automatiquement à la visite suivante avec réseau.

## Ajouter du contenu

- Questions : `src/data/<theme>.ts`. Chaque question a un `id` stable (`theme-NN`) qui sert de clé à la progression : ne pas le changer après publication.
- Code surligné (format « nommer ») : entourer l'élément de `[[…]]`. Trous : `{{0}}`, `{{1}}`… dans `template`.
- Texte entre `` `backticks` `` affiché comme du code.
- Glossaire : `src/data/glossary/<theme>.ts`. Dans un exemple, une erreur volontaire se signale par `// @ts-expect-error` pour que le test de compilation reste vert.
- `npm test` signale tout lien cassé ou extrait qui ne compile pas.

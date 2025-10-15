# MicroSaaS

![CI](https://github.com/2024-devops-alt-dist/microsaas-al/actions/workflows/ci.yml/badge.svg)

Progressive web application — **Node.js (Express + TypeScript) API**, **React Client**, **PostgreSQL**  
Structure monorepo :  
- `api/` — Backend Express (TypeScript)  
- `client/` — Frontend React  
- PostgreSQL — Base de données

---

## 📦 Prérequis

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- Node.js ≥ 18 (pour usage local)

---

## ⚙️ Configuration

1. Créer un fichier `.env` à la racine du projet, basé sur `.env.template`.
2. Créer un fichier `.env` dans le dossier api, basé sur `.env.template`.
3. Créer un fichier `.env` et `.env.production` dans le dossier client, basé sur `.env.template`.

---

## 🚀 Lancer l'application avec Docker

```bash
docker compose up -d
```

- API Express sur [http://localhost:3000](http://localhost:3000)
- Client React sur [http://localhost:5173](http://localhost:5173)
- PostgreSQL interne sur le port 5432

---

## 🖥️ Installation et lancement en local

### 1. API (Express)

```bash
cd api
npm install
npm run dev      # Démarre l'API en mode développement
npm run lint     # Lint du code
npm run test     # Lance les tests
npm run build    # Build TypeScript
```

### 2. Client (React)

```bash
cd client
npm install
npm run dev      # Démarre le client en mode développement
npm run lint     # Lint du code
npm run test     # Lance les tests
npm run build    # Build de production
```

---

## 🐘 PostgreSQL

- Port interne : 5432
- Utilisateur par défaut : `postgres`
- Base de données : `db`
- Les variables sont définies dans `docker-compose.yml` et `.env`

---

## 📜 Scripts utiles

| Dossier  | Commande         | Description                  |
|----------|------------------|------------------------------|
| `api`    | `npm run dev`    | Démarrer l'API en dev        |
| `api`    | `npm run lint`   | Linter le code API           |
| `api`    | `npm run test`   | Tester l'API                 |
| `api`    | `npm run build`  | Build TypeScript             |
| `client` | `npm run dev`    | Démarrer le client en dev    |
| `client` | `npm run lint`   | Linter le code client        |
| `client` | `npm run test`   | Tester le client             |
| `client` | `npm run build`  | Build de production          |

---

## 🛠️ Structure du projet

```
microsaas-al/
│
├── api/         # Backend Express (TypeScript)
├── client/      # Frontend React
├── db/          # Scripts init PostgreSQL (optionnel)
├── docker-compose.yml
├── .env.template
└── README.md
```

---

## 🏁 CI/CD

- Vérification automatique du code et des builds via GitHub Actions ([ci.yml](.github/workflows/ci.yml))

---

## 📚 Documentation

- [Express](https://expressjs.com/)
- [React](https://react.dev/)
- [PostgreSQL](https://www.postgresql.org/)
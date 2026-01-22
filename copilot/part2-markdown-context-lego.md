# PARTIE 2: Fichiers Markdown comme "Mémoire LEGO" du Contexte

## Concept: Les fichiers Markdown = Briques LEGO de Contexte

**La métaphore LEGO:**
```
Chaque fichier markdown = une brique LEGO avec un "connecteur" spécial

┌─────────────────────────────────────────────────────────┐
│                    BRIQUE ARCHITECTURE                   │
│  ┌──────────────────────────────────────────────────┐   │
│  │ # Architecture du système                        │   │
│  │ - Microservices pattern                          │   │
│  │ - Event-driven communication                     │   │
│  │ - API Gateway: Kong                              │   │
│  └──────────────────────────────────────────────────┘   │
│  CONNECTEUR: ".github/copilot-instructions.md" →       │
│              Voir @ARCHITECTURE.md                     │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│                    BRIQUE PRODUIT                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │ # Vision Produit                                 │   │
│  │ - User management SaaS                           │   │
│  │ - Multi-tenant avec isolation par client        │   │
│  └──────────────────────────────────────────────────┘   │
│  CONNECTEUR: "Pour comprendre le contexte business"     │
└─────────────────────────────────────────────────────────┘
           ↓
┌─────────────────────────────────────────────────────────┐
│                    BRIQUE GUIDES                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ # Guidelines de développement                    │   │
│  │ - Tests obligatoires pour tout nouveau code      │   │
│  │ - Code review obligatoire                        │   │
│  └──────────────────────────────────────────────────┘   │
│  CONNECTEUR: "Suites les guidelines de..."             │
└─────────────────────────────────────────────────────────┘

           ↓ ASSEMBLAGE ↓

┌─────────────────────────────────────────────────────────┐
│              CONTEXTE COMPLET POUR COPILOT               │
│  Architecture + Produit + Guidelines = Compréhension    │
│             complète du "pourquoi" et "comment"         │
└─────────────────────────────────────────────────────────┘
```

**Pourquoi LEGO ?**
- **Modulaire:** Chaque fichier est autonome
- **Assemblable:** On combine ce dont on a besoin
- **Réutilisable:** La même brique sert à plusieurs constructions
- **Extensible:** On ajoute des briques au fur et à mesure

---

## Les 4 Types de Briques LEGO Contextuelles

### Type 1: BRIQUE ARCHITECTURE (ARCHITECTURE.md)

**Rôle:** Expliquer COMMENT le système est construit

**Contenu idéal (max 2 pages):**
```
# Architecture du Système

## Pattern Global
- Microservices avec communication événementielle
- Chaque service est indépendant et possède sa propre DB

## Technologies Clés
- Backend: Node.js + TypeScript
- Frontend: React + Next.js
- Database: PostgreSQL (par service)
- Message Queue: RabbitMQ

## Décisions Architecturales
- Pourquoi microservices ? → Scalabilité per-service
- Pourquoi PostgreSQL ? → Transactions ACID nécessaires
- Pourquoi RabbitMQ ? → Fiabilité des messages

## Points d'Entrée
- API Gateway: port 3000
- Auth Service: port 3001
- User Service: port 3002
```

**Quand Copilot l'utilise:**
- Vous demandez: "Ajoute un nouveau endpoint"
- Copilot sait: "C'est un microservice, donc je dois créer la route, le handler, et publier un événement"

### Type 2: BRIQUE PRODUIT (PRODUCT.md)

**Rôle:** Expliquer POURQUOI le système existe

**Contenu idéal (max 2 pages):**
```
# Vision et Fonctionnalités Produit

## Notre Mission
Permettre aux entreprises de gérer leurs utilisateurs avec une expérience SaaS fluide.

## Fonctionnalités Principales
1. **Authentification:** Email/password, OAuth, SSO
2. **Gestion utilisateur:** CRUD complet, rôles, permissions
3. **Multi-tenancy:** Isolation complète des données clients

## User Stories Prioritaires
- En tant qu'admin, je peux gérer les utilisateurs de mon organisation
- En tant que dev, je peux intégrer l'auth via API
- En tant qu'utilisateur, je peux reset mon password myself

## Non-Fonctionnels
- Performance: < 200ms pour 95% des requêtes
- Disponibilité: 99.9% uptime SLA
- Scalabilité: Supporte 10k+ req/s
```

**Quand Copilot l'utilise:**
- Vous demandez: "Implémente la feature X"
- Copilot sait: "Ah, c'est pour une gestion SaaS multi-tenant, donc je dois gérer l'isolation des données"

### Type 3: BRIQUE GUIDELINES (CONTRIBUTING.md ou GUIDELINES.md)

**Rôle:** Expliquer LES RÈGLES du jeu

**Contenu idéal (max 1 page):**
```
# Guidelines de Développement

## Règles de Codage
- TypeScript strict mode activé
- Pas de `any`, utiliser les types explicites
- Fonctions max 50 lignes, sinon split
- Nommage: camelCase pour variables, PascalCase pour classes

## Test Requirements
- Tests unitaires obligatoires pour toute nouvelle fonction
- Couverture minimale: 80%
- Framework: Jest + Supertest pour API

## Code Review
- Toute PR doit être reviewée par au moins 1 personne
- Les tests doivent passer avant merge
- Commentaires explicatifs pour code complexe

## Git Workflow
- Branch naming: `feature/`, `bugfix/`, `hotfix/`
- Commit messages: Conventional Commits
- Pas de commits direct sur `main`
```

**Quand Copilot l'utilise:**
- Vous demandez: "Génère une nouvelle fonction"
- Copilot sait: "Je dois utiliser TypeScript strict, et générer aussi les tests unitaires"

### Type 4: BRIQUE INSTRUCTIONS (copilot-instructions.md)

**Rôle:** Le "chef d'orchestre" qui relie les briques

**Contenu idéal:**
```
# [Nom du Projet] - Instructions pour Copilot

Tu es un assistant expert pour ce projet. Voici ton contexte:

## 🎯 Objectif du Projet
Lire @PRODUCT.md pour comprendre la vision et les fonctionnalités.

## 🏗️ Architecture Technique
Lire @ARCHITECTURE.md pour comprendre la structure du système.

## 📋 Règles à Suivre
Lire @GUIDELINES.md pour connaître les standards de développement.

## 🔧 Comment Travailler

### Pour une Nouvelle Fonctionnalité:
1. Comprendre le contexte business dans PRODUCT.md
2. Vérifier l'architecture dans ARCHITECTURE.md
3. Suivre les guidelines de GUIDELINES.md
4. Toujours générer les tests unitaires
5. Toujours documenter le code

### Pour un Bugfix:
1. Identifier la racine du problème
2. Corriger en suivant les patterns existants
3. Ajouter un test pour éviter la régression
4. Documenter le fix dans le code

### Pour une Refactor:
1. Préserver le comportement existant
2. Améliorer la lisibilité/maintenabilité
3. Ne pas changer l'API publique
4. Mettre à jour les tests si nécessaire

## ⚠️ Ce qu'il Ne Faut PAS Faire
- Ne jamais utiliser de librairies non listées dans package.json
- Ne pas skip les tests "pour aller plus vite"
- Ne pas hardcoder de credentials
- Ne pas changer la structure de DB sans review

## 🆘 En Cas de Doute
Demande des clarifications plutôt que de deviner.

**Note:** Si tu trouves des informations contradictoires dans ces documents, signale-le et demande confirmation.
```

**Quand Copilot l'utilise:**
- À **CHAQUE** interaction, ce fichier est automatiquement inclus
- Il agit comme un "meta-contexte" qui pointe vers les autres briques

---

## Le Mécanisme de "Connexion" des Briques

### Comment les fichiers se connectent entre eux

**Schéma de connexion:**
```
copilot-instructions.md
  │
  ├─→ @PRODUCT.md
  │     └─→ Comprend le POURQUOI
  │
  ├─→ @ARCHITECTURE.md
  │     └─→ Comprend le COMMENT
  │
  ├─→ @GUIDELINES.md
  │     └─→ Connaît les RÈGLES
  │
  └─→ @EXEMPLES.md (optionnel)
        └─→ A des patterns à suivre
```

### La syntaxe de connexion: @mentions

**Dans copilot-instructions.md:**
```markdown
## Contexte Projet
- Pour la vision produit: voir @PRODUCT.md
- Pour l'architecture technique: voir @ARCHITECTURE.md
- Pour les guidelines: voir @GUIDELINES.md
```

**Résultat:**
Quand Copilot voit `@PRODUCT.md`, il va lire le fichier et l'inclut dans le contexte de cette interaction.

---

## Visualisation: Le Contexte comme Assemblage LEGO

### Diagramme d'assemblage

**ÉTAT 1: Sans fichiers markdown (Contexte nu)**
```
┌─────────────────────────────────┐
│    Prompt Utilisateur           │
│  "Ajoute une fonction login"    │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│    Code existant (partiel)      │
│  - Quelques fichiers ouverts    │
│  - Peu de contexte              │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│    Réponse Copilot              │
│  ✗ Génération générique         │
│  ✗ Pas de cohérence architecture│
│  ✗ Pas de tests                 │
│  ✗ Pas de documentation         │
└─────────────────────────────────┘
```

**ÉTAT 2: Avec fichiers markdown (Contexte LEGO)**
```
┌─────────────────────────────────┐
│    Prompt Utilisateur           │
│  "Ajoute une fonction login"    │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│    + BRIQUE ARCHITECTURE        │
│    "Microservices, JWT, etc."   │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│    + BRIQUE GUIDELINES          │
│    "Tests obligatoires, TS..."  │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│    Code existant                │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│    Réponse Copilot              │
│  ✓ Architecture cohérente       │
│  ✓ Tests générés                │
│  ✓ Documentation incluse        │
│  ✓ Patterns respectés           │
└─────────────────────────────────┘
```

---

## Concrètement: Comment les Utiliser

### Scénario 1: Nouvelle Fonctionnalité

**Prompt:**
```
"Implémente la fonctionnalité de reset de password"
```

**Sans markdown:**
- Copilot génère du code générique
- Pas de cohérence avec l'architecture existante
- Probablement pas de tests

**Avec markdown:**
1. Copilot lit `copilot-instructions.md`
2. Suit le lien vers `@PRODUCT.md` → comprend que c'est une feature SaaS multi-tenant
3. Suit le lien vers `@ARCHITECTURE.md` → sait qu'il faut utiliser le pattern microservices
4. Suit le lien vers `@GUIDELINES.md` → génère les tests unitaires
5. Génère une implémentation cohérente avec TOUT le contexte

### Scénario 2: Bug Fix

**Prompt:**
```
"Le login ne fonctionne pas avec les emails en majuscules"
```

**Avec markdown:**
1. Copilot vérifie `@GUIDELINES.md` → voit que les tests sont obligatoires
2. Corrige le bug en normalisant l'email
3. Ajoute un test pour éviter la régression
4. Documente le fix dans le code

### Scénario 3: Refactor

**Prompt:**
```
"Refactor cette fonction pour qu'elle soit plus lisible"
```

**Avec markdown:**
1. Copilot lit `@GUIDELINES.md` → voit "max 50 lignes par fonction"
2. Lit `@ARCHITECTURE.md` → connaît les patterns du projet
3. Split la fonction en respectant les patterns
4. Met à jour les tests

---

## Best Practices pour les Briques LEGO

### Règle 1: Un fichier = Une responsabilité

**Mauvais:**
```markdown
# PROJECT.md
- Architecture (100 lignes)
- Guidelines (50 lignes)
- Product vision (80 lignes)
- Setup instructions (30 lignes)
- FAQ (40 lignes)
```

**Bon:**
```
PROJECT/
├── ARCHITECTURE.md (100 lignes, architecture seulement)
├── PRODUCT.md (80 lignes, vision seulement)
├── GUIDELINES.md (50 lignes, règles seulement)
└── copilot-instructions.md (connecte les briques)
```

### Règle 2: KISS - Keep It Short & Simple

**Recommandé:**
- ARCHITECTURE.md: max 2 pages
- PRODUCT.md: max 2 pages
- GUIDELINES.md: max 1 page

**Pourquoi ?**
- Copilot a un budget token limit
- L'info pertinente doit être facile à trouver
- Moins de texte = moins de bruit

### Règle 3: Mises à jour régulières

**Quand mettre à jour:**
- Architecture change → Update ARCHITECTURE.md
- Nouvelle guideline → Update GUIDELINES.md
- Nouvelle feature → Update PRODUCT.md

**Comment:**
- Utiliser Copilot lui-même !
- Prompt: "Update ARCHITECTURE.md with the new payment service"
- Review et valider le changement

### Règle 4: Liens explicites entre briques

**Dans ARCHITECTURE.md:**
```markdown
## Database Schema
Pour les détails sur les entités business, voir @PRODUCT.md

## API Design
Pour les standards d'API, voir @GUIDELINES.md
```

**Dans PRODUCT.md:**
```markdown
## Performance Requirements
Pour savoir comment on implémente la performance, voir @ARCHITECTURE.md
```

---

## Exemples Concrets de Fichiers

### ARCHITECTURE.md - Exemple complet

```markdown
# Architecture Technique - UserAuth SaaS

## Pattern Global
Microservices avec isolation par client (multi-tenant)

## Services
1. **auth-service** (port 3001)
   - Gestion authentification
   - JWT tokens
   - OAuth integration

2. **user-service** (port 3002)
   - CRUD utilisateurs
   - Gestion des rôles
   - Profil utilisateur

3. **notification-service** (port 3003)
   - Emails de bienvenue
   - Reset password
   - Notifications système

## Communication
- Events: RabbitMQ (fanout exchanges)
- REST: Inter-service communication
- GraphQL: Frontend → Backend

## Data Storage
- PostgreSQL par service (isolé)
- Redis pour sessions et cache
- S3 pour avatars users

## Deployment
- Docker containers
- Kubernetes orchestration
- Helm charts pour deployments

## Pour plus de détails
- Business logic: @PRODUCT.md
- Development rules: @GUIDELINES.md
```

### GUIDELINES.md - Exemple complet

```markdown
# Guidelines de Développement

## Règles de Codage
- TypeScript strict mode
- ESLint + Prettier obligatoires
- Pas de console.log en prod
- Variables explicites (pas de x, y, tmp)

## Structure de Code
```
src/
├── controllers/  # Route handlers
├── services/     # Business logic
├── models/       # DB schemas
├── utils/        # Helpers
└── tests/        # Tests
```

## Tests
- Jest pour unit tests
- Supertest pour API tests
- Min 80% couverture
- Tests avant code (TDD)

## Git Workflow
- `feature/ticket-description`
- `feat:`, `fix:`, `docs:` prefixes
- PR description template obligatoire

## Documentation
- JSDoc pour fonctions exportées
- README dans chaque module
- Architecture updates pour changements majeurs
```

### copilot-instructions.md - Exemple complet

```markdown
# Copilot Instructions - UserAuth SaaS

Tu es l'assistant de développement pour ce projet SaaS d'authentification.

## 📚 Contexte obligatoire
Pour toute demande, lis d'abord:
- @ARCHITECTURE.md - comprends la structure microservices
- @PRODUCT.md - comprends le contexte SaaS multi-tenant
- @GUIDELINES.md - connais les règles de développement

## 🎯 Tes Priorités

1. **Cohérence architecture:** Respecte le pattern microservices
2. **Tests obligatoires:** Toujours générer/mettre à jour les tests
3. **Type safety:** TypeScript strict, pas de `any`
4. **Documentation:** Commente le code complexe

## 🔨 Comment Implémenter une Feature

```
1. Comprendre le besoin ( PRODUCT.md)
2. Identifier le service concerné ( ARCHITECTURE.md)
3. Créer/modifier les types TypeScript
4. Implémenter la business logic
5. Écrire les tests (TDD si possible)
6. Documenter les changements
```

## ⚠️ À Éviter

- Ne pas mélanger les services (un fichier = un service)
- Ne pas skip les tests "pour accélérer"
- Ne pas utiliser de lib non documentée
- Ne pas hardcoder de config (utiliser .env)

## 🆘 Quand tu doutes

Demande des clarifications plutôt que de deviner.
Ex: "Dois-je créer un nouveau microservice ou étendre user-service ?"

## 📝 Quand tu détectes des incohérences

Si les docs (PRODUCT/ARCHITECTURE/GUIDELINES) se contredisent:
1. Signale-le explicitement
2. Propose une résolution
3. Demande confirmation avant d'implémenter
```

---

## Visualisation: Flux de Travail avec Briques LEGO

### Diagramme séquence

```
Développeur              Fichiers Markdown              Copilot
    │                          │                          │
    ├─ "Crée feature X"        │                          │
    │                          │                          │
    │                    ┌─────┴─────┐                   │
    │                    │ copilot-  │                   │
    │                    │ instruct  │                   │
    │                    └─────┬─────┘                   │
    │                          │                          │
    │                    ┌─────┴─────┐                   │
    │                    │ @PRODUCT  │                   │
    │                    └─────┬─────┘                   │
    │                          │                          │
    │                    ┌─────┴─────┐                   │
    │                    │ @ARCH     │                   │
    │                    └─────┬─────┘                   │
    │                          │                          │
    │                    ┌─────┴─────┐                   │
    │                    │ @GUIDE    │                   │
    │                    └─────┬─────┘                   │
    │                          │                          │
    │                          ├─────────────────────────>│
    │                          │   Contexte complet       │
    │                          │   (Architecture +        │
    │                          │    Product + Guidelines) │
    │                          │                          │
    │                          │                          │
    │<─────────────────────────┴──────────────────────────┤
    │  Code généré cohérent avec TOUT le contexte        │
    │  - Architecture respectée                           │
    │  - Tests inclus                                     │
    │  - Patterns respectés                               │
    │                                                     │
```

---

## Conclusion: Les Briques LEGO en Pratique

### Résumé des bénéfices

✅ **Contexte persistant:** Les docs survivent aux "nouveaux chats"
✅ **Cohérence:** Tout le code suit les mêmes patterns
✅ **Onboarding:** Les nouveaux devs comprennent vite
✅ **Moins de friction:** Copilot "devine" moins, "comprend" plus
✅ **Scalable:** S'adapte à la croissance du projet

### Quick Start

1. **Créez ARCHITECTURE.md** (max 2 pages)
2. **Créez PRODUCT.md** (max 2 pages)
3. **Créez GUIDELINES.md** (max 1 page)
4. **Créez copilot-instructions.md** avec des @mentions
5. **Testez:** Demandez à Copilot d'implémenter une feature
6. **Itérez:** Affinez les docs selon les résultats

### Le Mindset

> Vos fichiers markdown ne sont pas de la documentation "passive".
> Ce sont des ACTIFS de contexte que Copilot utilise à CHAQUE interaction.
>
> Investir dans ces docs = investir dans la qualité de Copilot.

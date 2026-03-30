# 🏋️ MuscleMap — Guide anatomique interactif

Un site web interactif pour comprendre quels muscles sont ciblés par chaque exercice de musculation.

## ✨ Fonctionnalités

- **Corps humain SVG interactif** — vue avant/arrière, cliquez sur un muscle pour filtrer les exercices
- **45 exercices** couvrant 12 groupes musculaires (pectoraux, dos, épaules, bras, abdos, jambes…)
- **Filtres** : tous / libres / machines
- **Recherche** en temps réel par nom, groupe ou muscle
- **Fiche détaillée** par exercice : muscles ciblés (principaux/secondaires), guide d'exécution pas à pas, matériel, conseils, exercices similaires
- **Mise en surbrillance** des muscles ciblés (rouge = principal, rose = secondaire)
- Design médical / anatomique — sobre et lisible

## 📁 Structure

```
muscleMap/
├── index.html          ← Page principale
├── style.css           ← Styles complets
├── app.js              ← Logique applicative
├── data/
│   └── exercises.js    ← Base de données des 45 exercices
└── README.md
```

## 🚀 Déploiement

### Option 1 — GitHub Pages (recommandé, gratuit)

1. Créez un dépôt GitHub : `github.com/votre-pseudo/musclemap`
2. Uploadez tous les fichiers (respectez la structure ci-dessus)
3. Allez dans **Settings → Pages → Source → main branch / root**
4. Votre site sera en ligne sur : `https://votre-pseudo.github.io/musclemap`

### Option 2 — Netlify (drag & drop, gratuit)

1. Allez sur [netlify.com](https://netlify.com) → Sign up
2. Faites glisser le dossier `muscleMap/` sur la zone de dépôt
3. URL automatique générée en 30 secondes
4. Optionnel : connectez un dépôt GitHub pour les mises à jour automatiques

### Option 3 — Vercel (gratuit)

```bash
npm install -g vercel
cd muscleMap
vercel
```

### Test local

Aucune dépendance, aucun build requis. Ouvrez simplement `index.html` dans un navigateur.

> ⚠️ Pour éviter les erreurs CORS avec les fichiers JS, utilisez un petit serveur local :
> ```bash
> # Python 3
> python -m http.server 8000
> # Node.js
> npx serve .
> ```

## 🔧 Personnalisation

### Ajouter un exercice

Dans `data/exercises.js`, ajoutez un objet au tableau `EXERCISES` :

```javascript
{
  id: "mon-exercice",           // identifiant unique (slug)
  name: "Nom de l'exercice",
  group: "Groupe musculaire",   // doit correspondre à un groupe existant
  primaryMuscles: ["biceps"],   // clés du dictionnaire MUSCLES
  secondaryMuscles: ["forearms"],
  type: "free",                 // "free" ou "machine"
  difficulty: "Débutant",       // "Débutant", "Intermédiaire" ou "Avancé"
  equipment: "Haltères",
  icon: "💪",
  steps: ["Étape 1...", "Étape 2..."],
  tip: "Conseil pratique...",
  related: ["barbell-curl"]     // ids d'exercices similaires
}
```

### Modifier les groupes musculaires SVG

Les SVG sont dans `index.html`. Chaque groupe musculaire a un attribut `data-muscle` qui correspond à une clé du dictionnaire `MUSCLES` dans `exercises.js`.

## 🗺️ Feuille de route

- [ ] Page profil utilisateur (morphologie → recommandations personnalisées)
- [ ] Animations du mouvement sur le SVG
- [ ] Mode sombre
- [ ] Chronomètre / minuteur de repos
- [ ] Programme d'entraînement personnalisé
- [ ] Export PDF du programme

## 📄 Technologies

- HTML5 / CSS3 / JavaScript vanilla
- SVG anatomique custom (aucune bibliothèque externe)
- Polices : DM Sans + DM Serif Display (Google Fonts)
- Déployable sur GitHub Pages, Netlify, Vercel — aucun backend requis

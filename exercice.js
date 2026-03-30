// ============================================================
//  MUSCLEMAP — Base de données des exercices
// ============================================================

const MUSCLES = {
  pectorals:   { name: "Pectoraux",        icon: "🫁", anteriorIds: ["ant-pectorals"] },
  deltoids:    { name: "Épaules",          icon: "💪", anteriorIds: ["ant-deltoids"], posteriorIds: ["post-deltoids"] },
  trapezius:   { name: "Trapèzes",         icon: "🦴", anteriorIds: ["ant-trapezius"], posteriorIds: ["post-trapezius"] },
  lats:        { name: "Grand dorsal",     icon: "🔻", posteriorIds: ["post-lats"] },
  rhomboids:   { name: "Rhomboïdes",       icon: "🔷", posteriorIds: ["post-rhomboids"] },
  lowerback:   { name: "Bas du dos",       icon: "📐", posteriorIds: ["post-lowerback"] },
  biceps:      { name: "Biceps",           icon: "💪", anteriorIds: ["ant-biceps"] },
  triceps:     { name: "Triceps",          icon: "📐", posteriorIds: ["post-triceps"] },
  forearms:    { name: "Avant-bras",       icon: "🤝", anteriorIds: ["ant-forearms"], posteriorIds: ["post-forearms"] },
  abdominals:  { name: "Abdominaux",       icon: "⚡", anteriorIds: ["ant-abdominals"] },
  glutes:      { name: "Fessiers",         icon: "🍑", posteriorIds: ["post-glutes"] },
  quadriceps:  { name: "Quadriceps",       icon: "🦵", anteriorIds: ["ant-quadriceps"] },
  hamstrings:  { name: "Ischio-jambiers",  icon: "🦵", posteriorIds: ["post-hamstrings"] },
  calves:      { name: "Mollets",          icon: "🦶", anteriorIds: ["ant-calves"], posteriorIds: ["post-calves"] }
};

const EXERCISES = [
  {
    id: "deadlift",
    name: "Soulevé de terre",
    group: "Bas du dos",
    primaryMuscles: ["lowerback", "glutes", "hamstrings"],
    secondaryMuscles: ["lats", "trapezius", "forearms", "quadriceps"],
    type: "free",
    difficulty: "Avancé",
    equipment: "Barre",
    icon: "🏋️",
    steps: [
      "Pieds largeur bassin, barre au-dessus du milieu du pied.",
      "Fléchissez les jambes, saisissez la barre, dos droit, regard légèrement devant.",
      "Poussez le sol vers le bas pour décoller la barre. La barre reste contre les tibias/cuisses.",
      "Extension simultanée des hanches et des genoux. Debout : contractez les fessiers."
    ],
    tip: "Le soulevé de terre complet est un apprentissage technique. Débutez léger, progressez en technique.",
    related: ["romanian-deadlift", "squat", "cable-row"]
  },
  {
    id: "back-extension",
    name: "Extension lombaires",
    group: "Bas du dos",
    primaryMuscles: ["lowerback"],
    secondaryMuscles: ["glutes", "hamstrings"],
    type: "free",
    difficulty: "Débutant",
    equipment: "Banc à lombaires ou sol",
    icon: "📐",
    steps: [
      "Sur le banc à lombaires, cuisses appuyées, bassin en dehors du bord.",
      "Bras croisés sur la poitrine ou mains derrière la tête.",
      "Descendez le buste vers le sol en contrôlant, puis remontez jusqu'à l'alignement (pas en hyperextension).",
      "Contractez les lombaires et les fessiers en haut."
    ],
    tip: "Excellent exercice de gainage dynamique pour les lombaires. Indispensable en prévention.",
    related: ["deadlift", "plank"]
  }
  // Ajoute la suite de tes exercices ici...
];

const EXERCISE_MAP = {};
EXERCISES.forEach(ex => { EXERCISE_MAP[ex.id] = ex; });

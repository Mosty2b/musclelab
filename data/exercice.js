// ============================================================
//  MUSCLEMAP — Base de données des exercices
//  45 exercices | 12 groupes musculaires
// ============================================================

const MUSCLES = {
  pectorals:   { name: "Pectoraux",        icon: "🫁", anteriorIds: ["ant-pectorals"] },
  deltoids:    { name: "Épaules",           icon: "💪", anteriorIds: ["ant-deltoids"], posteriorIds: ["post-deltoids"] },
  trapezius:   { name: "Trapèzes",          icon: "🦴", anteriorIds: ["ant-trapezius"], posteriorIds: ["post-trapezius"] },
  lats:        { name: "Grand dorsal",      icon: "🔻", posteriorIds: ["post-lats"] },
  rhomboids:   { name: "Rhomboïdes",        icon: "🔷", posteriorIds: ["post-rhomboids"] },
  lowerback:   { name: "Bas du dos",        icon: "📐", posteriorIds: ["post-lowerback"] },
  biceps:      { name: "Biceps",            icon: "💪", anteriorIds: ["ant-biceps"] },
  triceps:     { name: "Triceps",           icon: "📐", posteriorIds: ["post-triceps"] },
  forearms:    { name: "Avant-bras",        icon: "🤝", anteriorIds: ["ant-forearms"], posteriorIds: ["post-forearms"] },
  abdominals:  { name: "Abdominaux",        icon: "⚡", anteriorIds: ["ant-abdominals", "ant-obliques"] },
  obliques:    { name: "Obliques",          icon: "↗", anteriorIds: ["ant-obliques"] },
  glutes:      { name: "Fessiers",          icon: "🔴", posteriorIds: ["post-glutes"] },
  quadriceps:  { name: "Quadriceps",        icon: "🦵", anteriorIds: ["ant-quadriceps"] },
  hamstrings:  { name: "Ischio-jambiers",   icon: "🦵", posteriorIds: ["post-hamstrings"] },
  calves:      { name: "Mollets",           icon: "🦶", anteriorIds: ["ant-calves"], posteriorIds: ["post-calves"] },
  hipflexors:  { name: "Fléchisseurs hanche", icon: "🔵", anteriorIds: ["ant-hipflexors"] },
};

const EXERCISES = [
  // ─── PECTORAUX ───────────────────────────────────────────
  {
    id: "bench-press",
    name: "Développé couché barre",
    group: "Pectoraux",
    primaryMuscles: ["pectorals"],
    secondaryMuscles: ["deltoids", "triceps"],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Barre olympique, banc plat, rack",
    icon: "🏋️",
    steps: [
      "Allongez-vous sur le banc, pieds bien à plat au sol, omoplates serrées et dos naturellement arqué.",
      "Saisissez la barre légèrement plus large que les épaules, paumes vers l'avant.",
      "Dérackez et descendez la barre lentement jusqu'à effleurer le bas des pectoraux.",
      "Poussez la barre vers le haut en expirant, sans verrouiller complètement les coudes.",
      "Contrôlez la phase excentrique (descente) sur 2–3 secondes."
    ],
    tip: "Ne décollez jamais les fesses du banc. Gardez les poignets droits et alignés avec les avant-bras.",
    related: ["bench-press-dumbbell", "incline-press", "cable-crossover"]
  },
  {
    id: "bench-press-dumbbell",
    name: "Développé couché haltères",
    group: "Pectoraux",
    primaryMuscles: ["pectorals"],
    secondaryMuscles: ["deltoids", "triceps"],
    type: "free",
    difficulty: "Débutant",
    equipment: "Haltères, banc plat",
    icon: "🏋️",
    steps: [
      "Allongez-vous sur le banc, haltères sur les cuisses. Basculez-les en position de départ avec un coup de rein.",
      "Paumes face aux pieds, haltères au niveau de la poitrine, coudes à 45-75°.",
      "Poussez les haltères vers le haut jusqu'à quasi extension, sans choc entre eux.",
      "Redescendez lentement en contrôlant le poids, en augmentant l'étirement des pectoraux."
    ],
    tip: "La rotation des poignets en fin de mouvement (vers l'intérieur) intensifie la contraction.",
    related: ["bench-press", "incline-press", "dips"]
  },
  {
    id: "incline-press",
    name: "Développé incliné",
    group: "Pectoraux",
    primaryMuscles: ["pectorals"],
    secondaryMuscles: ["deltoids", "triceps"],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Barre ou haltères, banc incliné 30–45°",
    icon: "📈",
    steps: [
      "Réglez le banc entre 30 et 45° — au-delà, le travail bascule trop sur les deltoïdes.",
      "Saisissez la barre légèrement plus large que les épaules.",
      "Descendez vers la partie supérieure de la poitrine (clavicules).",
      "Remontez en ligne droite en expirant."
    ],
    tip: "Cible spécifiquement le chef claviculaire du grand pectoral (pectoraux hauts).",
    related: ["bench-press", "cable-crossover", "push-up"]
  },
  {
    id: "cable-crossover",
    name: "Écartés câbles croisés",
    group: "Pectoraux",
    primaryMuscles: ["pectorals"],
    secondaryMuscles: ["deltoids"],
    type: "machine",
    difficulty: "Intermédiaire",
    equipment: "Machine câbles double poulie haute",
    icon: "🔀",
    steps: [
      "Positionnez les poulies en hauteur. Saisissez les poignées, faites un pas en avant.",
      "Légère inclinaison du buste en avant, coudes légèrement fléchis.",
      "Ramenez les poignées ensemble vers le bas en avant du sternum.",
      "Contrôlez la phase excentrique lentement pour maximiser l'étirement."
    ],
    tip: "Idéal en fin de séance pour isoler et finir les pectoraux. Variez la hauteur des poulies.",
    related: ["pec-deck", "bench-press", "dips"]
  },
  {
    id: "pec-deck",
    name: "Pec-Deck (Butterfly)",
    group: "Pectoraux",
    primaryMuscles: ["pectorals"],
    secondaryMuscles: [],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Machine Pec-Deck",
    icon: "🦋",
    steps: [
      "Réglez le siège pour que les coudes soient à hauteur des épaules.",
      "Placez les avant-bras contre les coussinets ou les mains sur les poignées.",
      "Ramenez les bras vers l'avant en contractant les pectoraux au maximum.",
      "Revenez lentement en arrière sans dépasser l'alignement des épaules."
    ],
    tip: "Machine parfaite pour apprendre à recruter les pectoraux en isolation.",
    related: ["cable-crossover", "bench-press-dumbbell", "incline-press"]
  },
  {
    id: "dips",
    name: "Dips (pectoraux)",
    group: "Pectoraux",
    primaryMuscles: ["pectorals"],
    secondaryMuscles: ["triceps", "deltoids"],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Barres parallèles ou banc",
    icon: "⬇️",
    steps: [
      "Montez sur les barres, bras tendus. Inclinez légèrement le buste en avant (>15°) pour cibler les pectoraux.",
      "Descendez jusqu'à ce que les coudes forment 90°, voire un peu plus bas selon la souplesse.",
      "Repoussez fort vers le haut en expirant. Gardez le buste incliné tout au long du mouvement."
    ],
    tip: "Un buste vertical cible davantage les triceps. Plus penché = plus de pectoraux.",
    related: ["bench-press", "push-up", "cable-crossover"]
  },

  // ─── ÉPAULES ─────────────────────────────────────────────
  {
    id: "military-press",
    name: "Développé militaire",
    group: "Épaules",
    primaryMuscles: ["deltoids"],
    secondaryMuscles: ["trapezius", "triceps"],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Barre olympique ou haltères",
    icon: "⬆️",
    steps: [
      "Debout ou assis, prise légèrement plus large que les épaules.",
      "Barre au niveau du menton, coudes légèrement devant.",
      "Poussez vers le haut en ligne droite jusqu'à extension complète.",
      "Redescendez lentement au menton. Gardez le gainage abdominal actif."
    ],
    tip: "Évitez de cambrer excessivement le bas du dos. Contractez les abdominaux.",
    related: ["lateral-raise", "front-raise", "shoulder-press-machine"]
  },
  {
    id: "lateral-raise",
    name: "Élévations latérales",
    group: "Épaules",
    primaryMuscles: ["deltoids"],
    secondaryMuscles: ["trapezius"],
    type: "free",
    difficulty: "Débutant",
    equipment: "Haltères légers",
    icon: "↔️",
    steps: [
      "Debout, haltères de chaque côté, légère flexion des coudes.",
      "Montez les bras latéralement jusqu'à l'horizontale, paumes vers le bas.",
      "Contrôlez la descente sur 2–3 secondes. Ne balancez pas le buste."
    ],
    tip: "Inclinez légèrement les poucets vers le bas (comme verser de l'eau) pour mieux isoler le chef moyen.",
    related: ["military-press", "cable-lateral-raise", "upright-row"]
  },
  {
    id: "front-raise",
    name: "Élévations frontales",
    group: "Épaules",
    primaryMuscles: ["deltoids"],
    secondaryMuscles: ["pectorals"],
    type: "free",
    difficulty: "Débutant",
    equipment: "Haltères ou disque",
    icon: "⬆️",
    steps: [
      "Debout, haltères devant les cuisses, paumes vers le bas.",
      "Levez les bras devant vous jusqu'à l'horizontale, coudes légèrement fléchis.",
      "Redescendez lentement en contrôlant le mouvement."
    ],
    tip: "Cible le chef antérieur du deltoïde. Évitez les élan — mouvement strict.",
    related: ["military-press", "lateral-raise", "cable-crossover"]
  },
  {
    id: "shoulder-press-machine",
    name: "Développé épaules machine",
    group: "Épaules",
    primaryMuscles: ["deltoids"],
    secondaryMuscles: ["triceps"],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Machine développé épaules",
    icon: "🤖",
    steps: [
      "Réglez le siège pour que les poignées soient au niveau des oreilles.",
      "Poussez vers le haut jusqu'à extension quasi-complète.",
      "Redescendez jusqu'au point de départ en contrôlant."
    ],
    tip: "Idéal pour les débutants : guidage sécurisé, permet de se concentrer sur la contraction.",
    related: ["military-press", "lateral-raise", "upright-row"]
  },

  // ─── GRAND DORSAL ─────────────────────────────────────────
  {
    id: "pull-up",
    name: "Tractions",
    group: "Grand dorsal",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "rhomboids", "trapezius"],
    type: "free",
    difficulty: "Avancé",
    equipment: "Barre de traction",
    icon: "🔝",
    steps: [
      "Saisissez la barre en pronation, largeur plus grande que les épaules.",
      "En partant de position bras tendus, tirez les coudes vers le bas et l'arrière.",
      "Montez jusqu'à ce que le menton dépasse la barre, poitrine vers la barre.",
      "Redescendez lentement en contrôlant jusqu'à extension complète."
    ],
    tip: "La rétraction des omoplates avant de tirer est clé pour maximiser le recrutement du grand dorsal.",
    related: ["lat-pulldown", "cable-row", "dumbbell-row"]
  },
  {
    id: "lat-pulldown",
    name: "Tirage poulie haute",
    group: "Grand dorsal",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["biceps", "rhomboids"],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Machine poulie haute avec barre",
    icon: "⬇️",
    steps: [
      "Bloquez les cuisses sous les coussinets. Saisissez la barre largement.",
      "Légère inclinaison du buste en arrière (~15°). Rétractez les omoplates.",
      "Tirez la barre vers le haut de la poitrine en amenant les coudes vers le bas.",
      "Contrôlez la remontée lentement pour étirer le grand dorsal."
    ],
    tip: "Tirez avec les coudes, pas avec les mains — imaginez tenir la barre avec les avant-bras.",
    related: ["pull-up", "cable-row", "dumbbell-row"]
  },
  {
    id: "cable-row",
    name: "Tirage horizontal câble",
    group: "Grand dorsal",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["rhomboids", "biceps", "lowerback"],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Machine câbles basse poulie",
    icon: "↩️",
    steps: [
      "Assis face à la poulie, pieds sur les appuis, légère flexion des genoux.",
      "Saisissez la poignée (neutre recommandée). Buste droit, dos naturel.",
      "Tirez vers le nombril en rétractant les omoplates. Coudes près du corps.",
      "Revenez lentement à position initiale sans arrondir le dos."
    ],
    tip: "La poignée étroite neutre (parallèle) maximise l'amplitude et le recrutement du grand dorsal.",
    related: ["dumbbell-row", "lat-pulldown", "pull-up"]
  },
  {
    id: "dumbbell-row",
    name: "Rowing haltère unilatéral",
    group: "Grand dorsal",
    primaryMuscles: ["lats"],
    secondaryMuscles: ["rhomboids", "biceps", "lowerback"],
    type: "free",
    difficulty: "Débutant",
    equipment: "Haltère, banc",
    icon: "🔄",
    steps: [
      "Genou et main côté opposé sur le banc. Buste parallèle au sol.",
      "Haltère dans la main libre, bras tendu vers le sol.",
      "Tirez l'haltère vers la hanche en gardant le coude près du corps.",
      "Revenez lentement à extension complète. Repetez de l'autre côté."
    ],
    tip: "Permettez une légère rotation du torse en fin de mouvement pour une amplitude maximale.",
    related: ["cable-row", "pull-up", "lat-pulldown"]
  },

  // ─── TRAPÈZES / RHOMBOÏDES ───────────────────────────────
  {
    id: "shrugs",
    name: "Haussements d'épaules",
    group: "Trapèzes",
    primaryMuscles: ["trapezius"],
    secondaryMuscles: [],
    type: "free",
    difficulty: "Débutant",
    equipment: "Haltères ou barre",
    icon: "🤷",
    steps: [
      "Debout, haltères ou barre en pronation le long du corps.",
      "Haussez les épaules vers les oreilles en contractant les trapèzes.",
      "Tenez 1 seconde en haut, puis redescendez lentement.",
      "Ne faites pas de cercles avec les épaules — mouvement vertical pur."
    ],
    tip: "Charge lourde et tempo lent sont plus efficaces que des répétitions rapides.",
    related: ["upright-row", "face-pull", "military-press"]
  },
  {
    id: "upright-row",
    name: "Tirage vertical",
    group: "Trapèzes",
    primaryMuscles: ["trapezius"],
    secondaryMuscles: ["deltoids", "biceps"],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Barre ou haltères",
    icon: "⬆️",
    steps: [
      "Prise en pronation, mains rapprochées (15–20 cm entre les mains).",
      "Tirez la barre vers le menton en montant les coudes au-dessus des épaules.",
      "Tenez 1 seconde en haut, redescendez lentement."
    ],
    tip: "Prise large → plus de deltoïdes. Prise étroite → plus de trapèzes.",
    related: ["shrugs", "lateral-raise", "face-pull"]
  },
  {
    id: "face-pull",
    name: "Face Pull",
    group: "Trapèzes",
    primaryMuscles: ["rhomboids", "trapezius"],
    secondaryMuscles: ["deltoids"],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Câble avec corde ou poignée",
    icon: "😤",
    steps: [
      "Poulie haute, saisissez la corde des deux mains, paumes vers le bas.",
      "Tirez vers votre visage en écartant les mains (paumes vers vous en fin de mouvement).",
      "Omoplates rétractées et déprimées en fin de mouvement. Contrôlez la descente."
    ],
    tip: "Excellent exercice de santé des épaules et correctif pour la posture. Sous-estimé.",
    related: ["shrugs", "upright-row", "dumbbell-row"]
  },

  // ─── BICEPS ──────────────────────────────────────────────
  {
    id: "barbell-curl",
    name: "Curl barre droite",
    group: "Biceps",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    type: "free",
    difficulty: "Débutant",
    equipment: "Barre droite ou EZ",
    icon: "💪",
    steps: [
      "Debout, prise en supination (paumes vers le haut), mains à largeur d'épaules.",
      "Coudes fixes le long du corps. Fléchissez les coudes en amenant la barre vers les épaules.",
      "Contractez fort en haut, puis redescendez lentement sur 3 secondes."
    ],
    tip: "Les coudes ne doivent pas partir en avant — ils restent fixes contre le buste.",
    related: ["hammer-curl", "incline-curl", "concentration-curl"]
  },
  {
    id: "hammer-curl",
    name: "Curl marteau",
    group: "Biceps",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    type: "free",
    difficulty: "Débutant",
    equipment: "Haltères",
    icon: "🔨",
    steps: [
      "Haltères en prise neutre (pouce vers le haut). Coudes fixes.",
      "Fléchissez les coudes en gardant la prise neutre jusqu'en haut du mouvement.",
      "Redescendez lentement jusqu'à extension quasi-complète."
    ],
    tip: "Cible le brachial antérieur et le brachio-radial en plus du biceps. Excellent pour l'épaisseur du bras.",
    related: ["barbell-curl", "incline-curl", "reverse-curl"]
  },
  {
    id: "incline-curl",
    name: "Curl incliné",
    group: "Biceps",
    primaryMuscles: ["biceps"],
    secondaryMuscles: [],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Haltères, banc incliné 45–60°",
    icon: "📐",
    steps: [
      "Allongé sur banc incliné, bras pendants vers le bas, supination.",
      "Fléchissez les coudes lentement — la position pré-étire le biceps chef long.",
      "Contrôlez la descente pour maximiser l'étirement en bas."
    ],
    tip: "La position inclinée crée un étirement unique du biceps long. Excellente variation.",
    related: ["barbell-curl", "concentration-curl", "preacher-curl"]
  },
  {
    id: "concentration-curl",
    name: "Curl concentré",
    group: "Biceps",
    primaryMuscles: ["biceps"],
    secondaryMuscles: [],
    type: "free",
    difficulty: "Débutant",
    equipment: "Haltère",
    icon: "🎯",
    steps: [
      "Assis sur un banc, coude appuyé contre la face interne de la cuisse.",
      "Fléchissez le coude jusqu'en haut, paume vers le haut.",
      "Contractez fort en haut, puis redescendez lentement."
    ],
    tip: "L'appui empêche toute triche — isolation pure du biceps.",
    related: ["barbell-curl", "preacher-curl", "cable-curl"]
  },
  {
    id: "cable-curl",
    name: "Curl câble basse poulie",
    group: "Biceps",
    primaryMuscles: ["biceps"],
    secondaryMuscles: ["forearms"],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Câble basse poulie",
    icon: "🔌",
    steps: [
      "Saisissez la barre ou la poignée de la poulie basse.",
      "Coudes fixes le long du corps, fléchissez jusqu'en haut.",
      "Le câble maintient une tension constante tout au long du mouvement."
    ],
    tip: "Tension continue vs haltères (qui perdent la tension en bas). Excellent finisher.",
    related: ["barbell-curl", "hammer-curl", "preacher-curl"]
  },

  // ─── TRICEPS ─────────────────────────────────────────────
  {
    id: "tricep-pushdown",
    name: "Extension triceps poulie",
    group: "Triceps",
    primaryMuscles: ["triceps"],
    secondaryMuscles: [],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Câble haute poulie, barre droite ou corde",
    icon: "⬇️",
    steps: [
      "Saisissez la barre/corde, coudes fixes et collés au buste.",
      "Poussez vers le bas jusqu'à extension complète des coudes.",
      "Remontez lentement jusqu'à 90° maximum. Les coudes ne bougent pas."
    ],
    tip: "Avec la corde : écartez les mains vers l'extérieur en bas pour mieux contracter les triceps.",
    related: ["skull-crusher", "overhead-extension", "dips"]
  },
  {
    id: "skull-crusher",
    name: "Barre au front (Skull Crusher)",
    group: "Triceps",
    primaryMuscles: ["triceps"],
    secondaryMuscles: [],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Barre EZ ou droite, banc plat",
    icon: "💀",
    steps: [
      "Allongé, barre tenue en pronation, bras tendus au-dessus du visage.",
      "Fléchissez uniquement les coudes pour descendre la barre vers le front.",
      "Remontez en extension sans bouger les bras. Contrôle total."
    ],
    tip: "Cible fortement le chef long du triceps. Attention aux poignets — utilisez une barre EZ.",
    related: ["overhead-extension", "tricep-pushdown", "dips"]
  },
  {
    id: "overhead-extension",
    name: "Extension triceps au-dessus tête",
    group: "Triceps",
    primaryMuscles: ["triceps"],
    secondaryMuscles: [],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Haltère ou câble",
    icon: "☝️",
    steps: [
      "Debout ou assis, haltère tenu à deux mains au-dessus de la tête.",
      "Fléchissez les coudes pour descendre le poids derrière la tête.",
      "Remontez en extension complète. Coudes pointent vers le plafond."
    ],
    tip: "Le chef long est en position étirée — c'est l'exercice qui le recrute le plus intensément.",
    related: ["skull-crusher", "tricep-pushdown", "dips"]
  },

  // ─── ABDOMINAUX ──────────────────────────────────────────
  {
    id: "crunch",
    name: "Crunch classique",
    group: "Abdominaux",
    primaryMuscles: ["abdominals"],
    secondaryMuscles: [],
    type: "free",
    difficulty: "Débutant",
    equipment: "Aucun (tapis recommandé)",
    icon: "🔄",
    steps: [
      "Allongé sur le dos, genoux fléchis, pieds au sol, mains derrière la tête.",
      "Contractez les abdominaux pour décoller les omoplates du sol.",
      "Tenez 1 seconde en haut, redescendez sans poser complètement la tête."
    ],
    tip: "Le mouvement est court — pas une flexion complète du buste. Pensez à 'écraser' les abdos.",
    related: ["plank", "cable-crunch", "leg-raise"]
  },
  {
    id: "plank",
    name: "Gainage (Planche)",
    group: "Abdominaux",
    primaryMuscles: ["abdominals"],
    secondaryMuscles: ["lowerback", "glutes"],
    type: "free",
    difficulty: "Débutant",
    equipment: "Aucun (tapis recommandé)",
    icon: "📏",
    steps: [
      "Appui sur les avant-bras et les pointes de pieds. Corps aligné de la tête aux talons.",
      "Contractez les abdominaux, fessiers et cuisses. Respirez normalement.",
      "Maintenez la position sans laisser les hanches monter ou descendre."
    ],
    tip: "Qualité > durée. 30 secondes en bonne position > 2 minutes avec le dos creux.",
    related: ["crunch", "leg-raise", "side-plank"]
  },
  {
    id: "leg-raise",
    name: "Relevés de jambes",
    group: "Abdominaux",
    primaryMuscles: ["abdominals"],
    secondaryMuscles: ["hipflexors"],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Barre de traction ou sol",
    icon: "🦵",
    steps: [
      "Suspendu à une barre ou allongé, jambes tendues ou légèrement fléchies.",
      "Montez les jambes jusqu'à l'horizontale (allongé) ou vertical (suspendu).",
      "Redescendez lentement sans laisser les jambes toucher le sol entre les répétitions."
    ],
    tip: "Imaginez que vous poussez le bas du dos contre le sol pour mieux recruter les abdominaux bas.",
    related: ["crunch", "cable-crunch", "plank"]
  },
  {
    id: "cable-crunch",
    name: "Crunch câble",
    group: "Abdominaux",
    primaryMuscles: ["abdominals"],
    secondaryMuscles: [],
    type: "machine",
    difficulty: "Intermédiaire",
    equipment: "Câble haute poulie avec corde",
    icon: "⬇️",
    steps: [
      "À genoux face à la poulie haute, corde tenue derrière la tête.",
      "Fléchissez le buste vers l'avant et le bas en contractant les abdominaux.",
      "Redressez-vous lentement. Le mouvement vient des abdominaux, pas des hanches."
    ],
    tip: "Permet d'ajouter des charges progressives aux abdominaux — souvent négligé.",
    related: ["crunch", "leg-raise", "plank"]
  },

  // ─── FESSIERS ────────────────────────────────────────────
  {
    id: "squat",
    name: "Squat barre",
    group: "Fessiers",
    primaryMuscles: ["glutes", "quadriceps"],
    secondaryMuscles: ["hamstrings", "lowerback"],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Barre olympique, rack à squat",
    icon: "🏋️",
    steps: [
      "Barre sur les trapèzes, pieds à largeur d'épaules, pointes légèrement ouvertes.",
      "Descente contrôlée : hanches vers l'arrière et le bas. Genoux dans l'axe des pieds.",
      "Descendez jusqu'à ce que les cuisses soient parallèles au sol (ou plus bas).",
      "Remontez en poussant fort dans le sol, extension des hanches et des genoux simultanée."
    ],
    tip: "Le roi des exercices. Ne laissez jamais les genoux dépasser vers l'intérieur.",
    related: ["leg-press", "romanian-deadlift", "hip-thrust"]
  },
  {
    id: "hip-thrust",
    name: "Hip Thrust",
    group: "Fessiers",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings"],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Barre ou haltère, banc",
    icon: "🍑",
    steps: [
      "Épaules appuyées sur le bord d'un banc, barre sur les hanches (avec protection).",
      "Pieds à plat, genoux à 90° quand les hanches sont en haut.",
      "Soulevez les hanches jusqu'à alignement dos/cuisses en contractant les fessiers au max.",
      "Descendez lentement sans toucher le sol entre les répétitions."
    ],
    tip: "L'exercice le plus efficace pour les fessiers. La poussée vient des hanches, pas du bas du dos.",
    related: ["squat", "glute-bridge", "romanian-deadlift"]
  },
  {
    id: "glute-bridge",
    name: "Glute Bridge",
    group: "Fessiers",
    primaryMuscles: ["glutes"],
    secondaryMuscles: ["hamstrings"],
    type: "free",
    difficulty: "Débutant",
    equipment: "Aucun (tapis)",
    icon: "🌉",
    steps: [
      "Allongé sur le dos, genoux fléchis, pieds à plat.",
      "Poussez les hanches vers le haut en contractant les fessiers.",
      "Tenez 2 secondes en haut, fessiers bien contractés.",
      "Redescendez lentement sans toucher complètement le sol."
    ],
    tip: "Version allégée du Hip Thrust. Idéal pour débuter ou en activation pré-séance.",
    related: ["hip-thrust", "squat", "romanian-deadlift"]
  },

  // ─── QUADRICEPS ──────────────────────────────────────────
  {
    id: "leg-press",
    name: "Leg Press",
    group: "Quadriceps",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings"],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Machine Leg Press",
    icon: "🦵",
    steps: [
      "Pieds à largeur d'épaules sur la plateforme. Déverrouillez la sécurité.",
      "Descendez la plateforme en contrôlant jusqu'à 90° aux genoux.",
      "Repoussez sans verrouiller complètement les genoux en haut."
    ],
    tip: "Pieds hauts sur la plateforme → plus de fessiers/ischios. Pieds bas → plus de quadriceps.",
    related: ["squat", "leg-extension", "lunge"]
  },
  {
    id: "leg-extension",
    name: "Leg Extension",
    group: "Quadriceps",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: [],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Machine Leg Extension",
    icon: "📐",
    steps: [
      "Assis, coussinets sur les chevilles. Dos bien calé contre le dossier.",
      "Étendez les jambes jusqu'à extension complète. Contractez les quadriceps.",
      "Redescendez lentement jusqu'à 90° (ne pas dépasser pour protéger le genou)."
    ],
    tip: "Exercice d'isolation pur des quadriceps. Idéal en finisher. Attention aux charges trop lourdes.",
    related: ["leg-press", "squat", "lunge"]
  },
  {
    id: "lunge",
    name: "Fentes avant",
    group: "Quadriceps",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hamstrings"],
    type: "free",
    difficulty: "Débutant",
    equipment: "Haltères ou poids de corps",
    icon: "🚶",
    steps: [
      "Debout, effectuez un grand pas en avant. Le genou arrière descend vers le sol.",
      "Genou avant à 90°, aligné au-dessus de la cheville (pas devant le pied).",
      "Revenez à la position initiale en poussant sur le talon avant.",
      "Alternez les jambes ou faites toutes les répétitions d'un côté."
    ],
    tip: "Inclinez légèrement le buste en avant pour plus de fessiers, vertical pour plus de quadriceps.",
    related: ["squat", "leg-press", "bulgarian-split-squat"]
  },
  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    group: "Quadriceps",
    primaryMuscles: ["quadriceps"],
    secondaryMuscles: ["glutes", "hipflexors"],
    type: "free",
    difficulty: "Avancé",
    equipment: "Haltères, banc",
    icon: "🔆",
    steps: [
      "Pied arrière posé sur un banc, pied avant en retrait suffisant pour permettre 90° au genou.",
      "Descendez lentement jusqu'à la quasi-verticalité du tibia avant.",
      "Repoussez fort avec la jambe avant pour remonter. Gardez le buste droit."
    ],
    tip: "L'exercice le plus difficile de la liste, mais extrêmement efficace pour l'hypertrophie unilatérale.",
    related: ["lunge", "squat", "leg-press"]
  },

  // ─── ISCHIO-JAMBIERS ─────────────────────────────────────
  {
    id: "romanian-deadlift",
    name: "Soulevé de terre roumain",
    group: "Ischio-jambiers",
    primaryMuscles: ["hamstrings"],
    secondaryMuscles: ["glutes", "lowerback"],
    type: "free",
    difficulty: "Intermédiaire",
    equipment: "Barre ou haltères",
    icon: "🏋️",
    steps: [
      "Debout, barre/haltères devant les cuisses. Légère flexion des genoux.",
      "Inclinez le buste en avant en envoyant les hanches vers l'arrière.",
      "Descendez jusqu'à ressentir un fort étirement des ischios (mi-mollet environ).",
      "Remontez en poussant les hanches vers l'avant. Dos neutre tout au long."
    ],
    tip: "Le dos doit rester neutre — pas rond. Le genou est fixe, c'est la hanche qui charnière.",
    related: ["leg-curl", "squat", "hip-thrust"]
  },
  {
    id: "leg-curl",
    name: "Leg Curl couché",
    group: "Ischio-jambiers",
    primaryMuscles: ["hamstrings"],
    secondaryMuscles: [],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Machine Leg Curl",
    icon: "🔄",
    steps: [
      "Allongé sur le ventre, chevilles sous les coussinets.",
      "Fléchissez les genoux pour ramener les talons vers les fessiers.",
      "Contrôlez la descente lentement sur 3 secondes."
    ],
    tip: "Les pointes de pieds vers l'intérieur → semi-tendineux. Vers l'extérieur → semi-membraneux.",
    related: ["romanian-deadlift", "hip-thrust", "nordic-curl"]
  },
  {
    id: "nordic-curl",
    name: "Nordic Curl",
    group: "Ischio-jambiers",
    primaryMuscles: ["hamstrings"],
    secondaryMuscles: [],
    type: "free",
    difficulty: "Avancé",
    equipment: "Partenaire ou fixation pour les chevilles",
    icon: "🦸",
    steps: [
      "À genoux, chevilles bloquées. Corps droit de la tête aux genoux.",
      "Laissez le corps descendre lentement vers le sol en freinant avec les ischios.",
      "Posez les mains pour freiner, puis remontez en aidant avec les bras.",
      "Progressivement, réduisez l'aide des bras."
    ],
    tip: "L'un des exercices excentriques les plus efficaces pour les ischios et la prévention des blessures.",
    related: ["romanian-deadlift", "leg-curl", "hip-thrust"]
  },

  // ─── MOLLETS ─────────────────────────────────────────────
  {
    id: "standing-calf-raise",
    name: "Mollets debout",
    group: "Mollets",
    primaryMuscles: ["calves"],
    secondaryMuscles: [],
    type: "free",
    difficulty: "Débutant",
    equipment: "Haltères ou barre (optionnel), marche ou disque",
    icon: "🦶",
    steps: [
      "Debout, une marche sous les avant-pieds pour maximiser l'amplitude.",
      "Descendez les talons sous le niveau de la marche (étirement complet).",
      "Montez sur la pointe des pieds aussi haut que possible. Tenez 2 secondes."
    ],
    tip: "Amplitude complète (étirement en bas + contraction en haut) est clé pour les mollets.",
    related: ["seated-calf-raise", "leg-press-calf"]
  },
  {
    id: "seated-calf-raise",
    name: "Mollets assis",
    group: "Mollets",
    primaryMuscles: ["calves"],
    secondaryMuscles: [],
    type: "machine",
    difficulty: "Débutant",
    equipment: "Machine mollets assis",
    icon: "🪑",
    steps: [
      "Assis, avant-pieds sur les appuis, coussinets sur les cuisses.",
      "Descendez les talons en dessous pour étirer le soléaire.",
      "Montez sur la pointe, contractez fort et tenez 1 seconde."
    ],
    tip: "La position assise recrute davantage le soléaire (muscle profond). Excellent complément au mollet debout.",
    related: ["standing-calf-raise", "leg-press-calf"]
  },

  // ─── BAS DU DOS ──────────────────────────────────────────
  {
    id: "deadlift",
    name: "Soulevé de terre classique",
    group: "Bas du dos",
    primaryMuscles: ["lowerback"],
    secondaryMuscles: ["glutes", "hamstrings", "trapezius"],
    type: "free",
    difficulty: "Avancé",
    equipment: "Barre olympique",
    icon: "🏆",
    steps: [
      "Pieds à largeur de bassin, barre au-dessus des mi-pieds. Prise en crochet ou mixte.",
      "Hanches plus hautes que les genoux, dos neutre, regard légèrement devant.",
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
    related: ["deadlift", "romanian-deadlift", "plank"]
  }
];

// Build a lookup map for quick access
const EXERCISE_MAP = {};
EXERCISES.forEach(ex => { EXERCISE_MAP[ex.id] = ex; });

// Group exercises by their display group
const EXERCISE_GROUPS = {};
EXERCISES.forEach(ex => {
  if (!EXERCISE_GROUPS[ex.group]) EXERCISE_GROUPS[ex.group] = [];
  EXERCISE_GROUPS[ex.group].push(ex);
});

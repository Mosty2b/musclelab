// ============================================================
//  MUSCLEMAP — Application Logic
// ============================================================

// ── STATE ────────────────────────────────────────────────────
let currentView = 'anterior';
let currentFilter = 'all';
let currentSearch = '';
let selectedExercise = null;
let collapsedGroups = new Set();

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderExerciseList();
});

// ── VIEW TOGGLE ──────────────────────────────────────────────
function setView(view) {
  currentView = view;
  document.getElementById('figAnterior').classList.toggle('hidden', view !== 'anterior');
  document.getElementById('figPosterior').classList.toggle('hidden', view !== 'posterior');
  document.getElementById('btnAnterior').classList.toggle('active', view === 'anterior');
  document.getElementById('btnPosterior').classList.toggle('active', view === 'posterior');

  // Re-highlight if an exercise is selected
  if (selectedExercise) {
    highlightMuscles(selectedExercise);
  }
}

// ── MUSCLE HIGHLIGHTING ──────────────────────────────────────
function clearHighlights() {
  document.querySelectorAll('.muscle-group.muscle-active, .muscle-group.muscle-secondary')
    .forEach(el => {
      el.classList.remove('muscle-active', 'muscle-secondary');
    });
}

function highlightMuscles(exercise) {
  clearHighlights();

  const allMuscleIds = [];

  exercise.primaryMuscles.forEach(muscleKey => {
    const muscleDef = MUSCLES[muscleKey];
    if (!muscleDef) return;
    const ids = [
      ...(muscleDef.anteriorIds || []),
      ...(muscleDef.posteriorIds || [])
    ];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.classList.add('muscle-active');
        allMuscleIds.push(muscleKey);
      }
    });
  });

  exercise.secondaryMuscles.forEach(muscleKey => {
    const muscleDef = MUSCLES[muscleKey];
    if (!muscleDef) return;
    const ids = [
      ...(muscleDef.anteriorIds || []),
      ...(muscleDef.posteriorIds || [])
    ];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.classList.contains('muscle-active')) {
        el.classList.add('muscle-secondary');
      }
    });
  });

  // Update badge
  const badge = document.getElementById('muscleBadge');
  const badgeText = document.getElementById('badgeText');
  const primaryNames = exercise.primaryMuscles
    .map(k => MUSCLES[k]?.name || k)
    .join(', ');
  badgeText.textContent = `Muscles actifs : ${primaryNames}`;
  badge.classList.add('active');

  // Auto-switch view if needed
  const hasPosterior = exercise.primaryMuscles.some(k => MUSCLES[k]?.posteriorIds?.length > 0);
  const hasAnterior = exercise.primaryMuscles.some(k => MUSCLES[k]?.anteriorIds?.length > 0);
  if (hasPosterior && !hasAnterior && currentView === 'anterior') {
    setView('posterior');
  } else if (hasAnterior && !hasPosterior && currentView === 'posterior') {
    setView('anterior');
  }
}

// Select muscle from SVG click
function selectMuscle(muscleKey) {
  clearHighlights();

  const muscleDef = MUSCLES[muscleKey];
  if (!muscleDef) return;

  const ids = [
    ...(muscleDef.anteriorIds || []),
    ...(muscleDef.posteriorIds || [])
  ];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('muscle-active');
  });

  const badge = document.getElementById('muscleBadge');
  const badgeText = document.getElementById('badgeText');
  badgeText.textContent = `Groupe sélectionné : ${muscleDef.name}`;
  badge.classList.add('active');

  // Highlight matching exercises
  document.querySelectorAll('.exercise-card').forEach(card => {
    card.classList.remove('highlighted');
    const exId = card.dataset.exerciseId;
    const ex = EXERCISE_MAP[exId];
    if (ex && (ex.primaryMuscles.includes(muscleKey) || ex.secondaryMuscles.includes(muscleKey))) {
      card.classList.add('highlighted');
    }
  });
}

// ── EXERCISE LIST RENDERING ──────────────────────────────────
function renderExerciseList() {
  const container = document.getElementById('exerciseList');
  const groups = Object.keys(EXERCISE_GROUPS);

  let filtered = {};
  groups.forEach(group => {
    const exercises = EXERCISE_GROUPS[group].filter(ex => {
      const matchesFilter = currentFilter === 'all' || ex.type === currentFilter;
      const matchesSearch = !currentSearch ||
        ex.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
        ex.group.toLowerCase().includes(currentSearch.toLowerCase()) ||
        ex.primaryMuscles.some(m => MUSCLES[m]?.name.toLowerCase().includes(currentSearch.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
    if (exercises.length > 0) filtered[group] = exercises;
  });

  const filteredGroups = Object.keys(filtered);

  if (filteredGroups.length === 0) {
    container.innerHTML = `<div class="no-results">
      <p>Aucun exercice trouvé</p>
      <p style="margin-top:6px;font-size:12px">Essayez un autre terme de recherche</p>
    </div>`;
    return;
  }

  container.innerHTML = filteredGroups.map(group => {
    const exercises = filtered[group];
    const isCollapsed = collapsedGroups.has(group);

    return `
      <div class="group-section">
        <div class="group-header ${isCollapsed ? 'collapsed' : ''}" onclick="toggleGroup('${group}')">
          <span class="group-muscle-dot"></span>
          <span class="group-name">${group}</span>
          <span class="group-count">${exercises.length}</span>
          <svg class="group-chevron" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="group-exercises ${isCollapsed ? 'collapsed' : ''}">
          ${exercises.map(ex => renderExerciseCard(ex)).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderExerciseCard(ex) {
  const typeBadge = ex.type === 'free'
    ? '<span class="type-badge free">Libre</span>'
    : '<span class="type-badge machine">Machine</span>';

  const primaryMuscleNames = ex.primaryMuscles
    .map(k => MUSCLES[k]?.name || k)
    .join(', ');

  return `
    <div class="exercise-card" data-exercise-id="${ex.id}" onclick="openExercise('${ex.id}')">
      <div class="exercise-icon">${ex.icon}</div>
      <div class="exercise-info">
        <div class="exercise-name">${ex.name}</div>
        <div class="exercise-sub">
          ${typeBadge}
          <span>${primaryMuscleNames}</span>
        </div>
      </div>
      <svg class="exercise-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M5 3L9 7L5 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  `;
}

function toggleGroup(group) {
  if (collapsedGroups.has(group)) {
    collapsedGroups.delete(group);
  } else {
    collapsedGroups.add(group);
  }
  renderExerciseList();
}

// ── FILTERS ──────────────────────────────────────────────────
function filterExercises(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderExerciseList();
}

function searchExercises(value) {
  currentSearch = value;
  renderExerciseList();
}

// ── DETAIL PANEL ─────────────────────────────────────────────
function openExercise(exerciseId) {
  const exercise = EXERCISE_MAP[exerciseId];
  if (!exercise) return;

  selectedExercise = exercise;
  highlightMuscles(exercise);

  // Build detail HTML
  const primaryTags = exercise.primaryMuscles.map(k =>
    `<span class="muscle-tag primary"><span class="muscle-tag-dot"></span>${MUSCLES[k]?.name || k}</span>`
  ).join('');

  const secondaryTags = exercise.secondaryMuscles.length > 0
    ? exercise.secondaryMuscles.map(k =>
        `<span class="muscle-tag secondary"><span class="muscle-tag-dot"></span>${MUSCLES[k]?.name || k}</span>`
      ).join('')
    : '';

  const stepsHTML = exercise.steps.map((step, i) =>
    `<div class="guide-step">
      <span class="step-number">${i + 1}</span>
      <span class="step-text">${step}</span>
    </div>`
  ).join('');

  const relatedHTML = exercise.related
    .filter(id => EXERCISE_MAP[id])
    .map(id =>
      `<span class="related-tag" onclick="openExercise('${id}')">${EXERCISE_MAP[id].name}</span>`
    ).join('');

  const difficultyClass = {
    'Débutant': '🟢',
    'Intermédiaire': '🟡',
    'Avancé': '🔴'
  }[exercise.difficulty] || '⚪';

  document.getElementById('detailContent').innerHTML = `
    <div class="detail-header">
      <h1 class="detail-exercise-name">${exercise.name}</h1>
      <div class="detail-meta">
        <span class="detail-badge ${exercise.type}">${exercise.type === 'free' ? 'Exercice libre' : 'Machine'}</span>
        <span class="detail-badge difficulty">${difficultyClass} ${exercise.difficulty}</span>
      </div>
    </div>

    <div class="muscles-section">
      <p class="section-label">Muscles ciblés</p>
      <div class="muscles-list">
        ${primaryTags}
        ${secondaryTags ? `<span style="color:var(--text-muted);font-size:11px;align-self:center;margin-left:4px">+ secondaires :</span>${secondaryTags}` : ''}
      </div>
    </div>

    <div class="guide-section">
      <p class="section-label">Exécution</p>
      <div class="guide-steps">${stepsHTML}</div>
    </div>

    <div class="tips-grid">
      <div class="tip-card equipment">
        <p class="tip-label">Matériel</p>
        <p>${exercise.equipment}</p>
      </div>
      <div class="tip-card tip">
        <p class="tip-label">Conseil</p>
        <p>${exercise.tip}</p>
      </div>
    </div>

    ${relatedHTML ? `
    <div class="related-section">
      <p class="section-label">Exercices similaires</p>
      <div class="related-list">${relatedHTML}</div>
    </div>` : ''}
  `;

  // Open panel
  const panel = document.getElementById('detailPanel');
  const exercisePanel = document.getElementById('exercisePanel');

  panel.classList.add('open');
  exercisePanel.classList.add('panel-hidden');
  panel.scrollTop = 0;
}

function closeDetail() {
  const panel = document.getElementById('detailPanel');
  const exercisePanel = document.getElementById('exercisePanel');

  panel.classList.remove('open');
  exercisePanel.classList.remove('panel-hidden');

  // Keep muscle highlights but reset exercise selection
  // so user can keep browsing with context
  setTimeout(() => {
    selectedExercise = null;
    clearHighlights();
    const badge = document.getElementById('muscleBadge');
    const badgeText = document.getElementById('badgeText');
    badge.classList.remove('active');
    badgeText.textContent = 'Cliquez sur un exercice ou un muscle';
  }, 350);
}

// ============================================================
//  MUSCLEMAP — Logique Applicative & Animations
// ============================================================

let currentView = 'anterior';
let currentFilter = 'all';
let currentSearch = '';
let selectedExercise = null;

document.addEventListener('DOMContentLoaded', () => {
  renderExerciseList();
});

// ── VUE ANATOMIQUE ──────────────────────────────────────────
function setView(view) {
  currentView = view;
  document.getElementById('figAnterior').classList.toggle('hidden', view !== 'anterior');
  document.getElementById('figPosterior').classList.toggle('hidden', view !== 'posterior');
  document.getElementById('btnAnterior').classList.toggle('active', view === 'anterior');
  document.getElementById('btnPosterior').classList.toggle('active', view === 'posterior');

  if (selectedExercise) highlightMuscles(selectedExercise);
}

// ── GESTION DES MUSCLES ──────────────────────────────────────
function clearHighlights() {
  document.querySelectorAll('.muscle-active, .muscle-secondary').forEach(el => {
    el.classList.remove('muscle-active', 'muscle-secondary');
  });
}

function highlightMuscles(exercise) {
  clearHighlights();
  
  // Principaux (Rouge vif)
  exercise.primaryMuscles.forEach(muscleKey => {
    const muscleData = MUSCLES[muscleKey];
    if(!muscleData) return;
    const ids = [...(muscleData.anteriorIds || []), ...(muscleData.posteriorIds || [])];
    ids.forEach(id => {
      const el = document.getElementById(id) || document.querySelector(`[data-muscle="${muscleKey}"]`);
      if (el) el.classList.add('muscle-active');
    });
  });

  // Secondaires (Rouge doux)
  if (exercise.secondaryMuscles) {
    exercise.secondaryMuscles.forEach(muscleKey => {
      const muscleData = MUSCLES[muscleKey];
      if(!muscleData) return;
      const ids = [...(muscleData.anteriorIds || []), ...(muscleData.posteriorIds || [])];
      ids.forEach(id => {
        const el = document.getElementById(id) || document.querySelector(`[data-muscle="${muscleKey}"]`);
        if (el && !el.classList.contains('muscle-active')) el.classList.add('muscle-secondary');
      });
    });
  }
}

// ── RECHERCHE & FILTRES ──────────────────────────────────────
function searchExercises(query) {
  currentSearch = query.toLowerCase();
  renderExerciseList();
}

function filterExercises(type, btnElement) {
  currentFilter = type;
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  btnElement.classList.add('active');
  renderExerciseList();
}

function renderExerciseList() {
  const list = document.getElementById('exerciseList');
  list.innerHTML = '';

  const filtered = EXERCISES.filter(ex => {
    const matchesFilter = currentFilter === 'all' || ex.type === currentFilter;
    const matchesSearch = ex.name.toLowerCase().includes(currentSearch) || ex.group.toLowerCase().includes(currentSearch);
    return matchesFilter && matchesSearch;
  });

  filtered.forEach(ex => {
    const div = document.createElement('div');
    div.className = 'exercise-card';
    div.innerHTML = `<strong>${ex.icon} ${ex.name}</strong><br><small>${ex.group}</small>`;
    div.onclick = () => openDetail(ex);
    list.appendChild(div);
  });
}

// ── PANNEAU DÉTAILS & ANIMATIONS ─────────────────────────────
function openDetail(exercise) {
  selectedExercise = exercise;
  highlightMuscles(exercise);

  const stepsHTML = exercise.steps.map((step, i) => `<p><b>${i+1}.</b> ${step}</p>`).join('');
  
  document.getElementById('detailContent').innerHTML = `
    <h2>${exercise.icon} ${exercise.name}</h2>
    <p class="text-muted">${exercise.group} • ${exercise.difficulty}</p>
    <div style="margin-top: 20px;">
      <h3>Exécution</h3>
      ${stepsHTML}
      <br>
      <h3>Conseil</h3>
      <p>💡 ${exercise.tip}</p>
    </div>
  `;

  // Animation Slide-in
  const panel = document.getElementById('detailPanel');
  panel.classList.add('open');
}

function closeDetail() {
  const panel = document.getElementById('detailPanel');
  panel.classList.remove('open');
  
  setTimeout(() => {
    selectedExercise = null;
    clearHighlights();
  }, 400); // Attend la fin de la transition CSS pour nettoyer
}

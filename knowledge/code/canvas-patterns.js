/* Reference snippets for STAR//FALL. These are intentionally framework-free. */

export function overlaps(a, b) {
  return Math.abs(a.x - b.x) < (a.width + b.width) / 2 &&
    Math.abs(a.y - b.y) < (a.height + b.height) / 2;
}

export function spawnWithBudget(types, budget, wave) {
  const spawned = [];
  const candidates = Object.entries(types);
  while (budget > 0) {
    const [kind, spec] = candidates[Math.floor(Math.random() * candidates.length)];
    if (spec.cost > budget) break;
    spawned.push({ kind, hp: spec.hp, maxHp: spec.hp, x: 0, y: 0, alive: true, wave });
    budget -= spec.cost;
  }
  return spawned;
}

export function directorPressure({ wave, recentHits, recentKills, secondsSincePickup }) {
  // Pressure rises with progress, but recent damage temporarily buys breathing room.
  const base = Math.min(1, 0.16 + wave * 0.045);
  const recovery = Math.min(0.24, recentHits * 0.06);
  const momentum = Math.min(0.16, recentKills * 0.012);
  const pickupNeed = secondsSincePickup > 24 ? -0.08 : 0;
  return Math.max(0.05, Math.min(1, base + momentum + pickupNeed - recovery));
}

export function applyDamage(target, amount, now) {
  target.hp -= amount;
  target.hitFlashUntil = now + 90;
  if (target.hp <= 0) target.alive = false;
}

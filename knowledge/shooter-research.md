# Shooter Research

Research date: 2026-09-24

This is design research, not a ranking. The games below are useful because each makes one or more shooter systems unusually legible and memorable. Recommendations are adapted to STAR//FALL's 2D wave-shooter format rather than copied literally.

## Comparative findings

| Game | What it does especially well | Transferable lesson for STAR//FALL | Cost / caution |
|---|---|---|---|
| DOOM (1993) | Distinct enemy roles, weapons with different ranges and damage profiles, secret/power-up pacing, aggressive forward pressure | Add 3-4 enemy archetypes with obvious counters; make power-ups temporary and exciting; use short encounter beats instead of only larger waves | Avoid a large inventory or maze while the game is still a single-screen arcade shooter |
| Quake | Movement mastery, high-speed combat, power-ups, secrets, and a strong audiovisual identity | Reward skilled movement with near-miss bonuses, dash/phase pickups, and optional high-risk lanes | Full 3D movement and network play do not fit the current architecture |
| Halo: Combat Evolved | Rechargeable shields, weapon tradeoffs, enemy factions with different behaviors, clear combat readability, layered audiovisual feedback | Replace opaque lives-only damage with a shield that recovers after a safe interval; pair weapon types with enemy weaknesses; show attack telegraphs | Rechargeable shields can remove tension if damage is too easy to avoid; keep a small persistent hull/life reserve |
| Titanfall 2 | Movement as a primary skill, distinct silhouettes, varied encounters, progression through bite-sized “action blocks” | Add a short dash or lane-switch ability; make each enemy type identifiable at a glance; alternate formation waves, dodge tests, and elite encounters | Wall-running, Titans, and campaign-scale content are out of scope for the current 2D arena |
| Left 4 Dead 2 | Escalation, special enemies, safe-room rhythm, and adaptive pacing through the AI Director | Use a lightweight director: measure player health, accuracy, and recent kills, then adjust spawn delay, elite chance, and recovery drops; add event waves and recovery windows | Do not make randomness opaque or punitive; every spike needs a visible warning and an exit condition |

## Design patterns worth adopting

### 1. Enemy roles over enemy count

The current game creates rows of visually similar enemies. More enemies alone will mostly increase noise. A stronger roster would be:

- **Drifter**: current baseline, slow lateral formation movement.
- **Lancer**: briefly locks a laser line before firing; countered by moving out of the line.
- **Mender**: stays behind the formation and restores nearby enemies; countered by prioritizing it.
- **Diver**: breaks formation and dives toward the player; countered by lateral movement or a spread weapon.
- **Carrier**: armored elite that drops a temporary power-up when destroyed.

Each role should have a unique color, silhouette, movement pattern, and audio cue. The player should understand the threat before taking damage.

### 2. Weapon choice as a tactical question

Use a small three-weapon kit instead of a large inventory:

- **Pulse**: current balanced shot; reliable against Drifters.
- **Spread**: three slower pellets; strong against Divers and clustered enemies.
- **Beam**: narrow charge shot; strong against Carriers and Menders, but creates a commitment window.

Weapons should differ in fire cadence, projectile shape, damage, and the situation they prefer. Avoid upgrades that simply make every number larger.

### 3. A readable combat loop

Use a repeatable rhythm: **signal -> decision -> firing window -> impact -> reward/recovery**. Examples include a Lancer warning line, a short dodge window, an explosion, then a combo or pickup. This is more satisfying than simultaneous untelegraphed projectiles.

### 4. Controlled escalation

Wave difficulty should increase through one variable at a time:

1. More formation speed.
2. More frequent shots.
3. A new enemy role.
4. Mixed roles that create a priority decision.
5. An elite or boss pattern.

A lightweight director can prevent frustration by reducing pressure after repeated hits or by spawning a recovery pickup after a long no-hit streak.

### 5. Feedback is part of the weapon

The current particle burst is a good start. Add a brief hit flash, damage number or combo tick, screen shake capped at a small amplitude, muzzle bloom, and a distinct pickup flash. Keep feedback short enough that it never hides the next threat.

### 6. Mobile and accessibility baseline

The current keyboard-only controls exclude touch users. Add pointer/touch drag for horizontal movement, a large fire button or auto-fire toggle, and a pause button. Respect `prefers-reduced-motion`, do not rely on color alone to distinguish threats, and keep text/UI outside the Canvas where possible.

## Strongest recommendation

The highest-value first slice is: **three enemy roles + a shield/recovery loop + one alternate weapon + telegraphed elite attacks + a small adaptive director**. It adds meaningful choices while preserving the existing wave shooter and avoids a rewrite into a 3D engine.

## Sources

- DOOM (1993), gameplay and engine overview: <https://en.wikipedia.org/wiki/Doom_(1993_video_game)>
- Quake, gameplay, movement, power-ups, and modifiability: <https://en.wikipedia.org/wiki/Quake_(video_game)>
- Halo: Combat Evolved, shields, weapon tradeoffs, enemy roles, and HUD: <https://en.wikipedia.org/wiki/Halo:_Combat_Evolved>
- Titanfall 2, movement, silhouettes, encounter blocks, and pacing: <https://en.wikipedia.org/wiki/Titanfall_2>
- Left 4 Dead 2, special enemies, safe rooms, and AI Director 2.0: <https://en.wikipedia.org/wiki/Left_4_Dead_2>
- MDN game development techniques, collision, audio, controls, and tilemaps: <https://developer.mozilla.org/en-US/docs/Games/Techniques>
- MDN Canvas optimization, animation, offscreen rendering, layering, and input-independent rendering: <https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas>

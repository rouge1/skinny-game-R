# Implementation Notes

## Current architecture

- Flask serves one HTML template and static assets.
- `static/game.js` owns state, update timing, collision checks, drawing, keyboard input, and HUD updates.
- `static/style.css` owns the neon terminal visual language and responsive shell.
- No build system or frontend dependency is needed for the next iteration.

## R-Type-inspired vertical slice

The most valuable first prototype is not a full side-scroller. Keep the existing fixed Canvas arena and implement one R-Type-inspired encounter:

1. Hold Space to charge a Wave Shot. Release at three charge thresholds for different damage and size.
2. Add a small Force drone that attaches in front of the ship, detaches on `Shift`, and blocks one projectile at a time.
3. Add one enemy with a fixed, learnable sine-wave attack pattern.
4. Add a boss with two destructible side nodes and a center core that becomes vulnerable after both nodes are removed.
5. Display a short warning phase before each boss pattern and keep the attack rhythm slow enough to learn.

This slice preserves the current Space Invaders control scheme while introducing the defining R-Type decisions: charge timing, positioning, defense as offense, pattern learning, and weak-point targeting.

## Suggested incremental phases

### Phase 1: Make the existing loop feel better

- Separate `update`, collision resolution, and `draw` data so new entities do not increase nested conditionals.
- Add explicit `width` and `height` to shots and enemies; use a reusable AABB helper.
- Give shots an owner/type and enemies `kind`, `hp`, `score`, and `color`.
- Fix the empty-wave edge case before calling `Math.min(...alive.map(...))`.
- Add a brief invulnerability timer after player damage so one burst cannot remove multiple shields/lives.

### Phase 2: Add combat decisions

- Add `weapon` state with Pulse, Spread, and Beam.
- Bind `1`, `2`, and `3` for keyboard selection; show the active weapon in the HUD.
- Add a minimal shield value that recharges after 1.2 seconds without damage.
- Add a temporary pickup entity with a visible orbit/ring effect.

### Phase 3: Add variety and pacing

- Implement Drifter, Lancer, Mender, Diver, and Carrier as data-driven variants.
- Add a wave budget instead of fixed rows: a Lancer costs more budget than a Drifter.
- Track `recentHits`, `recentKills`, and `timeSinceLastPickup` for director decisions.
- Give every special attack a `warning` timer and render its danger area before damage resolves.

### Phase 4: Finish the player-facing layer

- Add pointer/touch movement and a fire control for phones.
- Add Web Audio feedback only after the interaction model is stable.
- Add local high score storage with `localStorage`.
- Add a reduced-motion mode that limits shake, flashes, and particle count.

## Arcade balance notes

- Avoid one-hit deaths during the first appearance of a new pattern. A short shield or grace period teaches the pattern before punishing it.
- Let the player recover from a death with the basic Pulse weapon, then offer an intentional route back to a stronger state.
- Make charge time visible in the player ship or HUD; never hide the timing behind an invisible cooldown.
- Use bonus waves as low-pressure practice and score opportunities, following the readable rhythm of classic arcade bonus stages.

## Data model sketch

```js
const enemyTypes = {
  drifter: { hp: 1, score: 100, speed: 1, color: '#61f4ff' },
  lancer: { hp: 2, score: 180, speed: .8, color: '#ffb35c', warning: 1.0 },
  mender: { hp: 2, score: 220, speed: .65, color: '#b98cff', support: true },
  diver: { hp: 1, score: 160, speed: 1.4, color: '#ff6f9e', dive: true },
};

const player = {
  x: W / 2,
  y: H - 55,
  shield: 100,
  shieldDelay: 0,
  weapon: 'pulse',
};
```

## Balance guardrails

- The player should have at least one safe response to every attack: move, switch weapon, shoot priority target, or use a pickup.
- Do not increase enemy speed, projectile speed, and enemy count in the same wave.
- A new enemy should first appear alone, then in a mixed wave after the player has seen its cue.
- Keep the first two minutes free of irreversible progression requirements.
- Score should reward skillful risk, not only survival time: near misses, priority targets, and fast clears are good candidates.

## Technical references

- MDN 2D collision detection: <https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection>
- MDN desktop keyboard/mouse controls: <https://developer.mozilla.org/en-US/docs/Games/Techniques/Control_mechanisms/Desktop_with_mouse_and_keyboard>
- MDN mobile controls: <https://developer.mozilla.org/en-US/docs/Games/Techniques/Control_mechanisms/Mobile_touch>
- MDN Web Audio for games: <https://developer.mozilla.org/en-US/docs/Games/Techniques/Audio_for_Web_Games>
- MDN Canvas optimization: <https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas>

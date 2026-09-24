# Arcade Shooter Research

Research date: 2026-09-24

This pack focuses on fixed shooters, scrolling shoot-'em-ups, and run-and-gun games that are closer to STAR//FALL than modern first-person shooters.

## The useful lineage

### Space Invaders

Space Invaders establishes the current game's foundation: a horizontal player lane, enemy formations, a descent threat, limited lives, simple projectiles, and speed increasing as the formation is cleared. Its important lesson is that a small number of rules can create escalating tension. Keep the formation readable and let the remaining enemy count visibly change the pressure.

### Galaga

Galaga adds attack runs, distinct enemy ranks, bonus/challenge stages, and a memorable risk-reward mechanic where a captured ship can be rescued to create a stronger dual fighter. For STAR//FALL, this suggests a rescueable drone or temporary wingman rather than a permanent power tree.

### Defender

Defender turns a shooter into a priority problem: the player is not only shooting enemies but protecting vulnerable humans across a wider scrolling space. Its lesson for STAR//FALL is to add optional targets or a breach meter so the player sometimes chooses what not to shoot first. A small number of priority targets can create strategy without adding a second screen.

### Gradius

Gradius uses a power meter and selectable upgrade track instead of random unrelated pickups. The player decides whether to spend a capsule on speed, missiles, options, or a stronger weapon. Its boss design emphasizes a visible core and destructible barriers. For STAR//FALL, use a three-step upgrade rail: **speed -> weapon -> shield**, with the player making a choice at the end of a wave.

### R-Type

R-Type is the primary reference. It is deliberately slower than many shooters and rewards pattern learning as much as reflexes. Its eight stages use enemy patterns, terrain pressure, chargeable Wave Cannon, and bosses at stage ends. The Force orb is both a shield and an offensive device: it can attach to the front or rear, detach into the field, block attacks, and damage enemies on contact.

Transferable R-Type ideas:

- **Charge shot**: holding fire builds a stronger shot and gives the player a timing decision.
- **Deployable shield**: a small drone can be attached or sent forward, creating attack positioning rather than only dodging.
- **Pattern contracts**: every elite should have a repeatable pattern the player can learn and beat.
- **Slow tension**: allow brief planning windows between attacks instead of making every second chaotic.
- **Stage climax**: end an act with a large enemy made of readable phases and weak points.
- **Telegraphed danger**: use a warning line, glow, or sound before a high-damage attack.

Do not copy R-Type's full horizontal scrolling level structure yet. STAR//FALL's current fixed playfield can express the same ideas through formations, attack lanes, and a boss occupying the upper half of the screen.

### Contra

Contra is the run-and-gun reference. It uses eight-way aiming, jump/crouch movement, weapon capsules, powerful temporary weapons, short stages, and bosses that change the rules of engagement. The useful lesson is weapon identity: machine gun, laser, fireball, shotgun, rapid-fire, and barrier each alter how the player moves and aims. For STAR//FALL, translate that into Pulse, Spread, Beam, and Barrier pickups rather than adding jumping or terrain.

### Gunstar Heroes

Gunstar Heroes pushes run-and-gun variety further through four weapons that can combine, multiple stage formats, cooperative play, acrobatics, and large multi-part bosses. Its best transferable idea is combinatorial weapons: a few simple components can create a surprising number of play styles. A lightweight version for STAR//FALL could let a pickup modify the current weapon once, such as **Spread + Homing** or **Beam + Pierce**.

### Metal Slug

Metal Slug demonstrates exaggerated impact, highly readable animation, vehicles, melee finishers, rescue moments, and comic timing. Its lesson is not to add realism; it is to make every hit feel physical. Use larger hit flashes, brief hit-stop, distinct explosion shapes, debris, and a short score callout. A temporary “Slug” equivalent could be a shield drone or overdrive mode rather than a vehicle.

## Recommended STAR//FALL synthesis

Use the structure of Space Invaders, the tactical tool of R-Type, the pickup clarity of Contra, the weapon combinations of Gunstar Heroes, the impact of Metal Slug, the rescue/priority tension of Defender, and the selectable upgrade rail of Gradius.

### Proposed next loop

1. Formation appears with one new enemy pattern.
2. Player clears priority targets while charging or positioning a drone.
3. A short recovery window offers one of two upgrades.
4. A mixed formation tests the new choice.
5. Every fourth wave becomes a boss or challenge pattern.
6. Score rewards fast clears, rescued targets, near misses, and weak-point hits.

## Sources

- Space Invaders: <https://en.wikipedia.org/wiki/Space_Invaders>
- Galaga: <https://en.wikipedia.org/wiki/Galaga>
- Defender: <https://en.wikipedia.org/wiki/Defender_(video_game)>
- Gradius: <https://en.wikipedia.org/wiki/Gradius_(video_game)>
- R-Type: <https://en.wikipedia.org/wiki/R-Type>
- Contra: <https://en.wikipedia.org/wiki/Contra_(video_game)>
- Gunstar Heroes: <https://en.wikipedia.org/wiki/Gunstar_Heroes>
- Metal Slug: <https://en.wikipedia.org/wiki/Metal_Slug>

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
const scoreEl = document.querySelector('#score');
const waveEl = document.querySelector('#wave');
const livesEl = document.querySelector('#lives');
const message = document.querySelector('#message');
const startButton = document.querySelector('#start-button');

const W = canvas.width;
const H = canvas.height;
const keys = new Set();
let player, enemies, shots, enemyShots, particles, stars, score, wave, lives, state, lastTime, enemyDirection;

function resetGame() {
  score = 0; wave = 1; lives = 3; state = 'playing';
  stars = Array.from({ length: 90 }, () => ({ x: Math.random() * W, y: Math.random() * H, size: Math.random() * 1.8 + .3, speed: Math.random() * 18 + 8 }));
  player = { x: W / 2, y: H - 55, width: 42, speed: 430, cooldown: 0 };
  shots = []; enemyShots = []; particles = []; enemyDirection = 1;
  createWave(); updateHud(); message.classList.add('hidden'); lastTime = performance.now(); requestAnimationFrame(loop);
}

function createWave() {
  enemies = [];
  const rows = Math.min(3 + wave, 6), cols = 10;
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) {
    enemies.push({ x: 185 + col * 59, y: 85 + row * 42, width: 27, height: 20, row, alive: true });
  }
}

function updateHud() { scoreEl.textContent = String(score).padStart(6, '0'); waveEl.textContent = String(wave).padStart(2, '0'); livesEl.textContent = String(lives).padStart(2, '0'); }
function fire() { if (player.cooldown <= 0) { shots.push({ x: player.x, y: player.y - 22, speed: 650 }); player.cooldown = .24; } }
function explode(x, y, color) { for (let i = 0; i < 10; i++) particles.push({ x, y, vx: (Math.random() - .5) * 180, vy: (Math.random() - .5) * 180, life: .45, color }); }

function update(dt) {
  for (const star of stars) { star.y += star.speed * dt; if (star.y > H) star.y = 0; }
  if (keys.has('ArrowLeft') || keys.has('a')) player.x -= player.speed * dt;
  if (keys.has('ArrowRight') || keys.has('d')) player.x += player.speed * dt;
  player.x = Math.max(28, Math.min(W - 28, player.x)); player.cooldown -= dt;
  if (keys.has(' ') || keys.has('Spacebar')) fire();
  shots.forEach(s => s.y -= s.speed * dt); shots = shots.filter(s => s.y > 0);
  const alive = enemies.filter(e => e.alive);
  const minX = Math.min(...alive.map(e => e.x)), maxX = Math.max(...alive.map(e => e.x));
  if (minX < 52 || maxX > W - 52) { enemyDirection *= -1; alive.forEach(e => e.y += 17); }
  alive.forEach(e => { e.x += enemyDirection * (22 + wave * 3) * dt; if (Math.random() < dt * .12) enemyShots.push({ x: e.x, y: e.y + 12, speed: 190 + wave * 10 }); });
  enemyShots.forEach(s => s.y += s.speed * dt); enemyShots = enemyShots.filter(s => s.y < H);
  for (const shot of shots) for (const enemy of enemies) if (enemy.alive && Math.abs(shot.x - enemy.x) < 20 && Math.abs(shot.y - enemy.y) < 15) { enemy.alive = false; shot.y = -10; score += 100; explode(enemy.x, enemy.y, enemy.row % 2 ? '#ffb35c' : '#61f4ff'); updateHud(); }
  for (const shot of enemyShots) if (Math.abs(shot.x - player.x) < 25 && Math.abs(shot.y - player.y) < 24) { shot.y = H + 1; lives--; explode(player.x, player.y, '#ff6f9e'); updateHud(); if (lives <= 0) endGame('MISSION FAILED'); }
  if (enemies.some(e => e.alive && e.y > player.y - 25)) endGame('THE LINE BROKE');
  if (!enemies.some(e => e.alive)) { wave++; createWave(); updateHud(); }
  particles.forEach(p => { p.x += p.vx * dt; p.y += p.vy * dt; p.life -= dt; }); particles = particles.filter(p => p.life > 0);
}

function draw() {
  ctx.fillStyle = '#071018'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#7597a8'; stars.forEach(s => { ctx.globalAlpha = .25 + s.size / 3; ctx.fillRect(s.x, s.y, s.size, s.size); }); ctx.globalAlpha = 1;
  ctx.strokeStyle = 'rgba(97,244,255,.12)'; ctx.beginPath(); ctx.moveTo(0, H - 30); ctx.lineTo(W, H - 30); ctx.stroke();
  enemies.filter(e => e.alive).forEach(e => { ctx.fillStyle = e.row % 2 ? '#ffb35c' : '#61f4ff'; ctx.fillRect(e.x - 13, e.y - 8, 26, 16); ctx.fillStyle = '#071018'; ctx.fillRect(e.x - 8, e.y - 3, 4, 5); ctx.fillRect(e.x + 4, e.y - 3, 4, 5); ctx.fillRect(e.x - 17, e.y + 8, 6, 3); ctx.fillRect(e.x + 11, e.y + 8, 6, 3); });
  ctx.fillStyle = '#d6f8ff'; ctx.beginPath(); ctx.moveTo(player.x, player.y - 20); ctx.lineTo(player.x - 24, player.y + 20); ctx.lineTo(player.x + 24, player.y + 20); ctx.closePath(); ctx.fill(); ctx.fillStyle = '#ff6f9e'; ctx.fillRect(player.x - 5, player.y - 10, 10, 17);
  ctx.fillStyle = '#ffb35c'; shots.forEach(s => ctx.fillRect(s.x - 2, s.y - 9, 4, 9)); ctx.fillStyle = '#ff6f9e'; enemyShots.forEach(s => ctx.fillRect(s.x - 2, s.y, 4, 10));
  particles.forEach(p => { ctx.globalAlpha = Math.max(0, p.life * 2); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 4, 4); }); ctx.globalAlpha = 1;
}

function loop(now) { if (state !== 'playing') return; const dt = Math.min((now - lastTime) / 1000, .04); lastTime = now; update(dt); draw(); if (state === 'playing') requestAnimationFrame(loop); }
function endGame(title) { state = 'over'; document.querySelector('.message h1').innerHTML = title === 'MISSION FAILED' ? 'GAME<span>//</span>OVER' : 'BREACH<span>//</span>ED'; document.querySelector('.message p:not(.eyebrow)').textContent = `Final score: ${String(score).padStart(6, '0')}`; startButton.textContent = 'PLAY AGAIN'; message.classList.remove('hidden'); }

window.addEventListener('keydown', event => { keys.add(event.key); if (['ArrowLeft', 'ArrowRight', ' '].includes(event.key)) event.preventDefault(); if (event.key.toLowerCase() === 'p' && state === 'playing') state = 'paused'; else if (event.key.toLowerCase() === 'p' && state === 'paused') { state = 'playing'; lastTime = performance.now(); requestAnimationFrame(loop); } });
window.addEventListener('keyup', event => keys.delete(event.key));
startButton.addEventListener('click', resetGame);
draw();

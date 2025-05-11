function updateClock() {
    const now = new Date();
    const day = now.toLocaleString('en-us', { weekday: 'long' });
    const month = now.toLocaleString('en-us', { month: 'long' });
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const timeString = `${formattedHours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`;
    const formattedDate = `${date} ${month} ${year}.`;

    document.getElementById("day").textContent = day;
    document.getElementById("dat").textContent = formattedDate;
    document.getElementById("tim").textContent = `- ${timeString} -`;
}

const ball1 = document.getElementById('ball1');
const ball2 = document.getElementById('ball2');
const ball3 = document.getElementById('ball3');
const centerX = 200;
const centerY = 100;
const a = 100;
const b = 20;
const c = 80;
const d = 40;
const tiltUp = Math.PI / 6;
const tiltDown = -Math.PI / 6;
let angle = 0;

function createTrail(x, y, color) {
    const trail = document.createElement('div');
    trail.classList.add('trail');
    trail.style.left = `${x - 15}px`;
    trail.style.top = `${y - 15}px`;
    if (color) trail.style.background = color;
    document.querySelector('.container').appendChild(trail);
    setTimeout(() => trail.remove(), 800);
}

function animate() {
    const ex1 = a * Math.cos(angle);
    const ey1 = b * Math.sin(angle);
    const x1 = centerX + ex1 * Math.cos(tiltUp) - ey1 * Math.sin(tiltUp);
    const y1 = centerY + ex1 * Math.sin(tiltUp) + ey1 * Math.cos(tiltUp);
    ball1.style.left = `${x1 - 10}px`;
    ball1.style.top = `${y1 - 10}px`;
    createTrail(x1, y1);

    const ex2 = a * Math.cos(-angle);
    const ey2 = b * Math.sin(-angle);
    const x2 = centerX + ex2 * Math.cos(tiltDown) - ey2 * Math.sin(tiltDown);
    const y2 = centerY + ex2 * Math.sin(tiltDown) + ey2 * Math.cos(tiltDown);
    ball2.style.left = `${x2 - 10}px`;
    ball2.style.top = `${y2 - 10}px`;
    createTrail(x2, y2, 'white');

    const ex3 = c * Math.sin(-angle);
    const ez3 = d * Math.cos(-angle);
    const x3 = centerX + ex3;
    const y3 = centerY + ez3 * Math.cos(Math.PI / 3); // mimic z-depth by tilting
    ball3.style.left = `${x3 - 10}px`;
    ball3.style.top = `${y3 - 10}px`;
    createTrail(x3, y3, 'white');

    angle += 0.02;
    requestAnimationFrame(animate);
}

animate();
updateClock();
setInterval(updateClock, 1000);

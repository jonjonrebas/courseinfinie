const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let gameInterval;

function startGame() {
    gameInterval = setInterval(updateGame, 20);
}

function stopGame() {
    clearInterval(gameInterval);
}

const car = {
    x: 100,
    y: canvas.height / 2 - 15,
    speed: 0,
};

const obstacles = [];

function updateGame() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw road
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw car
    ctx.fillStyle = 'blue';
    ctx.fillRect(car.x, car.y, 50, 30);

// Move car
if (car.y < 0) car.y = 0;
if (car.y > canvas.height - 30) car.y = canvas.height - 30;


    // Draw obstacles
    ctx.fillStyle = 'red';
    obstacles.forEach((obstacle, index) => {
        ctx.fillRect(obstacle.x, obstacle.y, 100, 20);
        obstacle.x -= 2; // Move obstacles to the left
        // Check collision
        if (
            car.x < obstacle.x + 100 &&
            car.x + 50 > obstacle.x &&
            car.y < obstacle.y + 20 &&
            car.y + 30 > obstacle.y
        ) {
            stopGame();
            alert('Game Over!');
        }
        // Remove off-screen obstacles
        if (obstacle.x < -100) {
            obstacles.splice(index, 1);
        }
    });

    // Create new obstacle
    if (Math.random() < 0.01) {
        obstacles.push({ x: canvas.width, y: Math.random() * canvas.height });
    }
}

// Event listener for arrow keys
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') car.y += 2; // Move down
    if (e.key === 'ArrowUp') car.y -= 2; // Move up
});


document.addEventListener('keyup', (e) => {
    car.speed = 0;
});

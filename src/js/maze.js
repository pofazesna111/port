class MazeGame {
    constructor(size = 15) {
        this.size = size;
        this.gridElement = document.getElementById("mazeGrid");
        this.timeElement = document.getElementById("mazeTime");
        this.movesElement = document.getElementById("mazeMoves");
        this.messageElement = document.getElementById("mazeMessage");
        this.newBtn = document.getElementById("mazeNew");
        this.resetBtn = document.getElementById("mazeReset");

        this.player = { x: 0, y: 0 };
        this.moves = 0;
        this.time = 0;
        this.timer = null;

        this.init();
    }

    init() {
        this.newBtn.addEventListener("click", () => this.generateNewMaze());
        this.resetBtn.addEventListener("click", () => this.resetPlayer());
        document.addEventListener("keydown", (e) => this.move(e));

        this.generateNewMaze();
    }

    generateEmptyGrid() {
        this.grid = Array.from({ length: this.size }, () =>
            Array(this.size).fill(1)
        );
    }

    generateMaze() {
        const stack = [];
        const visited = Array.from({ length: this.size }, () =>
            Array(this.size).fill(false)
        );

        const dx = [0, 0, 2, -2];
        const dy = [2, -2, 0, 0];

        let cx = 0;
        let cy = 0;

        visited[cy][cx] = true;
        this.grid[cy][cx] = 0;
        stack.push([cx, cy]);

        while (stack.length > 0) {
            const [x, y] = stack[stack.length - 1];

            let neighbors = [];

            for (let i = 0; i < 4; i++) {
                let nx = x + dx[i];
                let ny = y + dy[i];

                if (
                    nx >= 0 &&
                    ny >= 0 &&
                    nx < this.size &&
                    ny < this.size &&
                    !visited[ny][nx]
                ) {
                    neighbors.push([nx, ny, dx[i] / 2, dy[i] / 2]);
                }
            }

            if (neighbors.length > 0) {
                const [nx, ny, wx, wy] =
                    neighbors[Math.floor(Math.random() * neighbors.length)];

                visited[ny][nx] = true;
                this.grid[ny][nx] = 0;
                this.grid[y + wy][x + wx] = 0;

                stack.push([nx, ny]);
            } else {
                stack.pop();
            }
        }
    }

    render() {
        this.gridElement.innerHTML = "";
        this.gridElement.style.gridTemplateColumns = `repeat(${this.size}, 1fr)`;

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                const cell = document.createElement("div");
                cell.classList.add("maze-cell");

                if (this.grid[y][x] === 1) {
                    cell.classList.add("wall");
                }

                if (x === this.player.x && y === this.player.y) {
                    cell.classList.add("player");
                }

                if (x === this.size - 1 && y === this.size - 1) {
                    cell.classList.add("goal");
                }

                this.gridElement.appendChild(cell);
            }
        }
    }

    move(e) {
        const key = e.key;
        let dx = 0;
        let dy = 0;

        if (key === "ArrowUp") dy = -1;
        if (key === "ArrowDown") dy = 1;
        if (key === "ArrowLeft") dx = -1;
        if (key === "ArrowRight") dx = 1;

        const nx = this.player.x + dx;
        const ny = this.player.y + dy;

        if (
            nx >= 0 &&
            ny >= 0 &&
            nx < this.size &&
            ny < this.size &&
            this.grid[ny][nx] === 0
        ) {
            this.player.x = nx;
            this.player.y = ny;
            this.moves++;
            this.movesElement.textContent = this.moves;
            this.render();

            if (nx === this.size - 1 && ny === this.size - 1) {
                clearInterval(this.timer);
                this.messageElement.textContent = "🎉 Ты прошёл лабиринт!";
            }
        }
    }

    startTimer() {
        clearInterval(this.timer);
        this.time = 0;
        this.timeElement.textContent = 0;

        this.timer = setInterval(() => {
            this.time++;
            this.timeElement.textContent = this.time;
        }, 1000);
    }

    resetPlayer() {
        this.player = { x: 0, y: 0 };
        this.moves = 0;
        this.movesElement.textContent = 0;
        this.messageElement.textContent = "";
        this.startTimer();
        this.render();
    }

    generateNewMaze() {
        this.generateEmptyGrid();
        this.generateMaze();
        this.resetPlayer();
    }
}

window.addEventListener("DOMContentLoaded", () => {
    window.mazeGame = new MazeGame(15);
});

// maze.js
class MazeGame {
    constructor() {
        this.grid = document.getElementById('mazeGrid');
        this.movesEl = document.getElementById('mazeMoves');
        this.timeEl = document.getElementById('mazeTime');
        this.newBtn = document.getElementById('mazeNew');

        this.player = {x:1,y:1};
        this.exit = {x:8,y:8};
        this.moves = 0;

        this.map = [
            [1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,1,0,0,0,0,1],
            [1,0,1,0,1,0,1,1,0,1],
            [1,0,1,0,0,0,1,0,0,1],
            [1,0,1,1,1,0,1,0,1,1],
            [1,0,0,0,1,0,0,0,0,1],
            [1,1,1,0,1,1,1,0,1,1],
            [1,0,0,0,0,0,1,0,0,1],
            [1,0,1,1,1,0,0,0,1,1],
            [1,1,1,1,1,1,1,1,1,1]
        ];

        window.addEventListener("keydown", e => this.move(e));
        if (this.newBtn)
            this.newBtn.addEventListener('click', () => this.reset());

        this.render();
    }

    render() {
        if (!this.grid) return;
        this.grid.innerHTML = '';

        this.map.forEach((row,y)=>{
            row.forEach((cell,x)=>{
                const div = document.createElement('div');
                div.className = 'maze-cell';
                if(cell===1) div.classList.add('wall');
                if(x===this.player.x && y===this.player.y) div.classList.add('player');
                if(x===this.exit.x && y===this.exit.y) div.classList.add('exit');
                this.grid.appendChild(div);
            });
        });
    }

    move(e) {
        let {x,y} = this.player;

        if(e.key==="ArrowUp") y--;
        if(e.key==="ArrowDown") y++;
        if(e.key==="ArrowLeft") x--;
        if(e.key==="ArrowRight") x++;

        if(this.map[y] && this.map[y][x]===0){
            this.player={x,y};
            this.moves++;
            if(this.movesEl) this.movesEl.textContent=this.moves;
            this.render();
            if(x===this.exit.x && y===this.exit.y)
                alert("ПОБЕДА!");
        }
    }

    reset(){
        this.player={x:1,y:1};
        this.moves=0;
        if(this.movesEl) this.movesEl.textContent=0;
        this.render();
    }
}

window.addEventListener("DOMContentLoaded", ()=>{
    window.mazeGame=new MazeGame();
});

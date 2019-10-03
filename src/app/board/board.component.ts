import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  tiles: any[];
  oIsNext: boolean;
  winner: string;
  turnCount:number;

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.tiles = Array(9).fill(null);
    this.winner = null;
    this.oIsNext = false;
    this.turnCount = 0;
  }

  get player() {
    return this.oIsNext ? 'O' : 'X';
  }

  makeMove(idx: number) {
    if (!this.tiles[idx] && this.turnCount < 9) {
      this.tiles.splice(idx, 1, this.player);
      this.oIsNext = !this.oIsNext;
      this.turnCount ++;
    }

    this.winner = this.calculateWinner();
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.tiles[a] &&
        this.tiles[a] === this.tiles[b] &&
        this.tiles[a] === this.tiles[c]
      ) {
        return this.tiles[a];
      }
    }
    return null;
  }

}

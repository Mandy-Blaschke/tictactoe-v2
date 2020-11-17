import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {fields: GameField[] = [
  {wasClickedByRed: false, wasClickedByBlue: false},
  {wasClickedByRed: false, wasClickedByBlue: false},
  {wasClickedByRed: false, wasClickedByBlue: false},
  {wasClickedByRed: false, wasClickedByBlue: false},
  {wasClickedByRed: false, wasClickedByBlue: false},
  {wasClickedByRed: false, wasClickedByBlue: false},
  {wasClickedByRed: false, wasClickedByBlue: false},
  {wasClickedByRed: false, wasClickedByBlue: false},
  {wasClickedByRed: false, wasClickedByBlue: false},
];
  gameFinished = false;
  onTurn: 'blue' | 'red' = 'blue';
  winner: string;

  startGame(): void {
    this.winner = '';
    this.gameFinished = false;
    this.onTurn = 'blue';
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.fields.length; i++){
      this.fields[i].wasClickedByBlue = false;
      this.fields[i].wasClickedByRed = false;
    }
  }

  fieldWasClicked(field: GameField): void {
    if (!field.wasClickedByBlue && !field.wasClickedByRed && !this.gameFinished) {
      this.onTurn === 'blue' ? field.wasClickedByBlue = true : field.wasClickedByRed = true;
      this.onTurn === 'blue' ? this.onTurn = 'red' : this.onTurn = 'blue';
    }
    this.checkForWinner();
  }

  checkForWinner(): void {
    if (
      this.fields[0].wasClickedByRed && this.fields[1].wasClickedByRed && this.fields[2].wasClickedByRed ||
      this.fields[0].wasClickedByRed && this.fields[3].wasClickedByRed && this.fields[6].wasClickedByRed ||
      this.fields[0].wasClickedByRed && this.fields[4].wasClickedByRed && this.fields[8].wasClickedByRed ||
      this.fields[1].wasClickedByRed && this.fields[4].wasClickedByRed && this.fields[7].wasClickedByRed ||
      this.fields[2].wasClickedByRed && this.fields[5].wasClickedByRed && this.fields[8].wasClickedByRed ||
      this.fields[2].wasClickedByRed && this.fields[4].wasClickedByRed && this.fields[6].wasClickedByRed ||
      this.fields[3].wasClickedByRed && this.fields[4].wasClickedByRed && this.fields[5].wasClickedByRed ||
      this.fields[6].wasClickedByRed && this.fields[7].wasClickedByRed && this.fields[8].wasClickedByRed
    ) {
      this.winner = 'Rot hat gewonnen';
      this.gameFinished = true;
    } else if (
      this.fields[0].wasClickedByBlue && this.fields[1].wasClickedByBlue && this.fields[2].wasClickedByBlue ||
      this.fields[0].wasClickedByBlue && this.fields[3].wasClickedByBlue && this.fields[6].wasClickedByBlue ||
      this.fields[0].wasClickedByBlue && this.fields[4].wasClickedByBlue && this.fields[8].wasClickedByBlue ||
      this.fields[1].wasClickedByBlue && this.fields[4].wasClickedByBlue && this.fields[7].wasClickedByBlue ||
      this.fields[2].wasClickedByBlue && this.fields[5].wasClickedByBlue && this.fields[8].wasClickedByBlue ||
      this.fields[2].wasClickedByBlue && this.fields[4].wasClickedByBlue && this.fields[6].wasClickedByBlue ||
      this.fields[3].wasClickedByBlue && this.fields[4].wasClickedByBlue && this.fields[5].wasClickedByBlue ||
      this.fields[6].wasClickedByBlue && this.fields[7].wasClickedByBlue && this.fields[8].wasClickedByBlue
    ) {
      this.winner = 'Blau hat gewonnen';
      this.gameFinished = true;
    } else {
      let clickedField = 0;
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.fields.length; i++) {
        if (this.fields[i].wasClickedByRed || this.fields[i].wasClickedByBlue) {
          clickedField++;
        }
      }
      if (clickedField === this.fields.length) {
        this.gameFinished = true;
        this.winner = 'Unentschieden';
      }
    }
  }
}

export interface GameField {
  wasClickedByRed: boolean;
  wasClickedByBlue: boolean;
}

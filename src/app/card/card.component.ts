import { Component, OnInit } from '@angular/core';
import { CardInfo, WordService } from '../word.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  word?: string;
  cursor = 0;
  length = 0;

  constructor(public service: WordService) {}

  ngOnInit(): void {
    this.getNextWord();
  }

  getNextWord(): void {
    if (this.length && this.cursor > this.length) {
      this.service.reset();
    }
    this.service.getNextWord().then((info: CardInfo) => {
      this.word = info.word;
      this.cursor = info.cursor;
      this.length = info.length;
    });
  }
}

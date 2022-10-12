import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  observable: Observable<string>;
  allWords!: string[];
  wordList!: string[];
  length!: number;
  cursor!: number;
  method: Method = Method.RANDOM;

  constructor(private http: HttpClient) {
    this.observable = this.http.get(APP_BASE_HREF + '/assets/words.txt', {
      responseType: 'text',
    });
    this.observable.subscribe((file: string) => {
      this.allWords = file.split(/\r?\n/);
      this.length = this.allWords.length;
      this.reset();
    });
  }

  reset() {
    this.wordList = [...this.allWords];
    this.cursor = 1;
  }

  async getNextWord(): Promise<CardInfo> {
    let word: string;
    await firstValueFrom(this.observable);
    if (this.method === Method.RANDOM) {
      const index = Math.floor(Math.random() * this.wordList.length);
      word = this.wordList.splice(index, 1)[0];
    } else {
      word = this.wordList.shift()!;
    }
    // console.log(this.wordList);
    return { word: word!, cursor: this.cursor++, length: this.length };
  }
}

enum Method {
  SHIFT,
  RANDOM,
}

export type CardInfo = {
  word: string;
  cursor: number;
  length: number;
};

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  public countPlayer: number = 0;

  public countComputer: number = 0;

  public screens: any;

  public squares: any;

  public arrRandomNumbers: number[] = [];

  public getStartedBtn: any;

  private display: BehaviorSubject<'open' | 'close'> = new BehaviorSubject<'open' | 'close'>('close');

  public watch(): Observable<'open' | 'close'> {
    return this.display.asObservable();
  }

  public open() {
    this.display.next('open');
  }

  public close() {
    this.display.next('close');
  }

  public getRandomElement(): any {
    let getRandomNumber;
    if (this.arrRandomNumbers.length != this.squares.length) {
      do {
        getRandomNumber = Math.floor(Math.random() * this.squares.length);
      } while (this.arrRandomNumbers.indexOf(getRandomNumber) > -1);
      this.arrRandomNumbers.push(getRandomNumber);
      return this.squares[getRandomNumber];
    }
  }
}

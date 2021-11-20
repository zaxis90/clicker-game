import {AfterViewInit, Component, ElementRef, QueryList, ViewChildren} from '@angular/core';
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  @ViewChildren('screen') screenElements: QueryList<ElementRef> | undefined;

  @ViewChildren('square') squareElements: QueryList<ElementRef> | undefined;

  public squares = Array.from(Array(100));

  public interval: any;

  public isInterval: boolean | undefined;

  constructor(public gameService: GameService) {
  }

  ngAfterViewInit(): void {
    this.gameService.screens = this.screenElements?.map((item) => item.nativeElement);
    this.gameService.squares = this.squareElements?.map((item) => item.nativeElement);
  }

  public changeStartScreen(event: any) {
    event.preventDefault();
    this.gameService.screens[0].classList.add('up');
  }

  public changeTimeScreen(event: any): any {
    event.preventDefault();
    if (this.interval >= 500 && this.interval <= 3000) {
      this.isInterval = true;
      this.gameService.screens[1].classList.add('up');
    } else {
      return this.isInterval = false;
    }
  }

  public startGame() {
    if (this.gameService.countPlayer >= 10 || this.gameService.countComputer >= 10) {
      return this.gameService.open();
    } else {
      setTimeout(this.runInterval(), 1000);
    }
  }

  private runInterval(): any {
    let randomSquare = this.gameService.getRandomElement();
    randomSquare.style.background = 'yellow';
    if (randomSquare.style.background === 'yellow') {
      let colorInterval = setTimeout(() => {
        if (randomSquare.style.background != 'green') {
          randomSquare.style.background = 'red';
          this.gameService.countComputer++;
          this.startGame();
        }
      }, this.interval);
      if (this.gameService.countComputer >= 10 || this.gameService.countPlayer >= 10) {
        clearTimeout(colorInterval);
      }
    }
  }

  public getPoint(event: any) {
    if (event.style.background === 'yellow') {
      event.style.background = 'green';
      this.gameService.countPlayer++;
      if (this.gameService.countPlayer >= 10) {
        return this.gameService.open();
      } else {
        this.runInterval();
      }
    }
  }

  public setInterval(event: any) {
    event.target.value.replace(/[^0-9]/g, '');
    this.interval = Math.floor(event.target.value);
  }
}

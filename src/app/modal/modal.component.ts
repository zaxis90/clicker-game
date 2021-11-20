import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GameService} from "../services/game.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  public display$: Observable<'open' | 'close'> | undefined;

  constructor(public gameService: GameService) {
  }

  ngOnInit(): void {
    this.display$ = this.gameService.watch();
  }

  public changeInterval() {
    this.startAgain();
    this.gameService.screens[1].classList.remove('up');
  }

  public startAgain() {
    this.close();
    this.gameService.squares.forEach((item: any) => item.style.background = 'blue');
    this.gameService.countPlayer = 0;
    this.gameService.countComputer = 0;
    this.gameService.arrRandomNumbers = [];
  }

  public close() {
    this.gameService.close();
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { ICountry } from '../shared/shared.models';
import { StandingsService } from './standings.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit, OnDestroy {

  countries$: Observable<ICountry[]> = new Observable<ICountry[]>();
  countries: ICountry[] = [];
  standingSubscription: Subscription = new Subscription();

  constructor(
    private standingsService: StandingsService
  ) { }

  ngOnDestroy(): void {
    this.standingSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.loadBoard();
  }

  loadBoard() {
    this.countries$ = from(this.standingsService.getBoardList());
    this.standingSubscription = this.countries$.subscribe(ans => {
      this.countries = ans.sort((a, b) => {
          if (a.gold < b.gold) {
            return 1;
          } else if (a.gold > b.gold) {
            return -1;
          } else {
            return 0;
          } 
        });
    });
  }

}

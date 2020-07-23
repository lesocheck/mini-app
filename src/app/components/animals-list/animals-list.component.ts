import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnimalsService} from '../../services/animals.service';
import { Router} from '@angular/router';
import {IQueryParameters, Paginated} from '../../helpers';
import {IAnimalListItem} from '../../models';

@Component({
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit, OnDestroy {

  isAlive = true;
  records$: Paginated<IAnimalListItem>;
  qp: IQueryParameters = {
    startAt: 0,
    endAt: 10
  };

  constructor(private as: AnimalsService, private router: Router) { }

  get isInProgress() {
    return !this.records$;
  }

  ngOnInit(): void {
    this.getData$();
  }

  getData$() {
    this.as.loadAnimalList(this.qp).subscribe(data => {
      const query = data.query;
      this.records$ = data;
      this.records$.result = this.records$.result.reverse().slice(query.startAt, query.endAt);
    });

  }


  navigateToPage(page: number) {
    this.qp = {
      ...this.qp,
      startAt: page * 10 - 10,
      endAt: page * 10
    };
    this.getData$();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  async navigateToItem(id) {
    this.router.navigate(['animal', id ]);
  }

  addNewItem() {
    this.router.navigate(['animalAdd', true]);
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}

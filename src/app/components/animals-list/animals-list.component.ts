import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnimalsService} from '../../services/animals.service';
import { Router} from '@angular/router';
import {IQueryParameters, Paginated} from '../../helpers';
import {IAnimalListItem} from '../../models';
import {takeWhile} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit, OnDestroy {

  isAlive = true;

  records$: Paginated<IAnimalListItem>;
  qp: IQueryParameters = {
    offset: 0,
    limit: 10,
    sortBy: 'cowId',
    isAscending: true
  };

  constructor(private as: AnimalsService, private router: Router) { }

  get isInProgress() {
    return !this.records$;
  }
  policies: any[];
  ngOnInit(): void {
    this.getData$();
  }

  getData$() {
    this.as.loadAnimalList(this.qp)
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((items) => {
      this.records$ = items;

        console.log(this.records$)
    });


    this.as.loadAnimalList2().subscribe(data => {
      this.records$ = {
        result: data.map(e => {
          return {
            ...e.payload.doc.data()
          } as any;
        })
      }
      console.log(this.records$)
    });

  }

  navigateToPage(page: number) {
    this.qp = {
      ...this.qp,
      offset: page * 10
    };
    this.getData$();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  async navigateToItem(id) {
    this.router.navigate(['animal', id ]);
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}

import {Injectable} from '@angular/core';
import {IAnimalListItemApiContract} from '../api-contract';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {getAnimalListItem, IAnimalListItem} from '../models';
import {map} from 'rxjs/operators';
import {getQueryParametersAPIContract, IQueryParameters, Paginated} from '../helpers';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

export class AnimalsService {
  protected headers: HttpHeaders = undefined;
  url = 'http://localhost:4000';
  constructor(protected http: HttpClient, private router: Router, private firestore: AngularFirestore) {}

  public loadAnimalList(qp: IQueryParameters): Observable<Paginated<IAnimalListItem>> {
    return this.http
      .get<IAnimalListItemApiContract[]>(
        `${this.url}/result?${getQueryParametersAPIContract(qp)}`,
        {
          headers: this.headers,
          observe: 'response'
        })
      .pipe(map(t  => new Paginated(qp, t.body, t.headers.get('X-Total-Count')).mapTo(getAnimalListItem)));
  }

  loadAnimalList2() {
    return this.firestore.collection('result').snapshotChanges();
  }




  public loadAnimalItem(id: string): Observable<IAnimalListItem> {
    return this.http
      .get<IAnimalListItemApiContract>(
        `${this.url}/result?animalId=${id}`,
        {
          headers: this.headers,
        })
      .pipe(map(t  => getAnimalListItem(t[0])));
  }

  public saveAnimalChanges(item: IAnimalListItem) {
    // return this.http
    //   .get<IAnimalListItemApiContract>(
    //     `${this.url}/result?animalId=`,
    //     {
    //       headers: this.headers,
    //     })
    //   .pipe(map(t  => getAnimalListItem(t[0])));

    this.firestore.doc('result/' + item.animalId).update(item).then(() => {
      console.log('Document successfully updated!');
      this.router.navigate(['animals']);
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  }

  public deleteAnimal(id: string) {
    this.firestore.doc('result/' + id).delete().then(() => {
      console.log('Document successfully deleted!');
      this.router.navigate(['animals']);
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }
}

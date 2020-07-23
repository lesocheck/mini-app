import {Injectable} from '@angular/core';
import {IAnimalListItemApiContract} from '../api-contract';
import {Observable} from 'rxjs';
import {getAnimalListItem, IAnimalListItem} from '../models';
import {map} from 'rxjs/operators';
import {IQueryParameters, Paginated} from '../helpers';
import {Router} from '@angular/router';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })

export class AnimalsService {
  constructor( private router: Router, private firestore: AngularFirestore) { }

  loadAnimalList(qp: IQueryParameters): Observable<Paginated<IAnimalListItem>> {
    return this.firestore.collection('result')
      .snapshotChanges()
      .pipe(map(t  => new Paginated(qp, t.map(e  =>
        ({
            id: e.payload.doc.id,
            ...e.payload.doc.data() as IAnimalListItemApiContract
        })
      ), t.length).mapTo(getAnimalListItem) ));
  }

  loadAnimalItem(id: string) {
    return this.firestore.collection('result').doc(id).get()
      .pipe(map(t  =>
        getAnimalListItem ({
          id: t.id,
          ...t.data() as IAnimalListItemApiContract
        })
      ));
  }

  saveAnimalChanges(item: IAnimalListItem) {
    this.firestore.doc('result/' + item.id).update(item).then(() => {
      console.log('Document successfully updated!');
      this.router.navigate(['animals']);
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  }

  addNewAnimal(item: IAnimalListItem) {
    return this.firestore.collection('result').add(item).then(() => {
      console.log('Document successfully created!');
      this.router.navigate(['animals']);
    }).catch((error) => {
      console.error('Error creating document: ', error);
    });
  }

  deleteAnimal(id: string) {
    this.firestore.doc('result/' + id).delete().then(() => {
      console.log('Document successfully deleted!');
      this.router.navigate(['animals']);
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }
}

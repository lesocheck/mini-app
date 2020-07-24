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

  publickCowIds: number[];

  constructor( private router: Router, private firestore: AngularFirestore) { }

  // get animal list data
  loadAnimalList(qp: IQueryParameters): Observable<Paginated<IAnimalListItem>> {
    return this.firestore.collection('result', ref => ref
      .orderBy('cowId', 'asc')
    )
      .snapshotChanges()
      .pipe(map(t  => {
        this.getCowIdsArrey(t);
        return new Paginated(qp, t.map(e  => this.formatingData(e)
      ), t.length).mapTo(getAnimalListItem);
      }));
  }

  // get animal item data
  loadAnimalItem(id: string) {
    return this.firestore.collection('result').doc(id).get()
      .pipe(map(t  =>
        getAnimalListItem ({
          id: t.id,
          ...t.data() as IAnimalListItemApiContract
        })
      ));
  }

  // update animal item
  saveAnimalChanges(item: IAnimalListItem) {
    this.firestore.doc('result/' + item.id).update(item).then(() => {
      console.log('Document successfully updated!');
      this.router.navigate(['animals']);
    }).catch((error) => {
      console.error('Error updating document: ', error);
    });
  }

  // add new animal item
  addNewAnimal(item: IAnimalListItem) {
    return this.firestore.collection('result').add(item).then(() => {
      console.log('Document successfully created!');
      this.router.navigate(['animals']);
    }).catch((error) => {
      console.error('Error creating document: ', error);
    });
  }

  // delete animal item
  deleteAnimal(id: string) {
    this.firestore.doc('result/' + id).delete().then(() => {
      console.log('Document successfully deleted!');
      this.router.navigate(['animals']);
    }).catch((error) => {
      console.error('Error removing document: ', error);
    });
  }

  // server data formatting
  private formatingData(e){
    return {
      id: e.payload.doc.id,
      ...e.payload.doc.data() as IAnimalListItemApiContract
    };
  }

  // create CowIds arrey, it's used for generete a new CowId
  private getCowIdsArrey(arr: any) {
    this.publickCowIds = arr.map(item => this.formatingData(item).cowId);
  }
}

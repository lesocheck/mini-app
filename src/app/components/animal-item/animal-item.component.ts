import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnimalsService} from '../../services/animals.service';
import {IAnimalListItem} from '../../models';
import {MenuItem} from 'primeng';
import {FormBuilder, FormGroup} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';

@Component({
  templateUrl: './animal-item.component.html',
  styleUrls: ['./animal-item.component.scss']
})
export class AnimalItemComponent implements OnInit, OnDestroy {
  animal: IAnimalListItem;
  menuItems: MenuItem[];
  isEditable = false;
  form: FormGroup;
  form1: FormGroup;
  isAlive = true;

  constructor(private as: AnimalsService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.getAnimalItem();
    this.setMenu();
  }

  getAnimalItem() {
    this.as.loadAnimalItem(this.route.snapshot.paramMap.get('animalId'))
      .pipe(takeWhile(() => this.isAlive))
      .subscribe((item) => {
        this.animal = item;
        this.setForm1();
    });

  }

  get isInProgress() {
    return !this.animal;
  }

  buildForm() {
    this.form = this.fb.group({
      type: null,
      lactationNumber: null,
      daysInLactation: null,
      ageInDays: null,
      startDateTime: null,
      endDateTime: null,
      newGroupName: null,
      currentGroupName: null,
      destinationGroup: null,
      destinationGroupName: null,
      originalDateStart: null,
      minDateValue: null,
      oldLactationNumber: null,
      daysInPregnancy: null,
      reportingDate: null,
      healthIndex: null,
      healthIndexPeak: null,
      duration: null,
      alertType: null,
      calvingEase: null,
      newBorns: null,
      cowEntryStatus: null,
      birthDateCalculated: null,
      sire: null,
      breedingNumber: null,
      isOutOfBreedingWindow: null,
      interval: null,
      heatIndexPeak: null
    });
  }


  setForm1() {
    this.form1 = this.fb.group({
      type: this.animal.type
    });
  }
  setForm() {
    if (this.animal) {
      this.form.patchValue({
        type: this.animal.type ? this.animal.type : null,
        lactationNumber: this.animal.lactationNumber ? this.animal.lactationNumber : null,
        daysInLactation: this.animal.daysInLactation ? this.animal.daysInLactation : null,
        ageInDays: this.animal.ageInDays ? this.animal.ageInDays : null,
        startDateTime: this.animal.startDateTime ? new Date(this.animal.startDateTime) : null,
        endDateTime: this.animal.endDateTime ? new Date(this.animal.endDateTime) : null,
        newGroupName: this.animal.newGroupName ? this.animal.newGroupName : null,
        currentGroupName: this.animal.currentGroupName ? this.animal.currentGroupName : null,
        destinationGroup: this.animal.destinationGroup ? this.animal.destinationGroup : null,
        destinationGroupName: this.animal.destinationGroupName ? this.animal.destinationGroupName : null,
        originalDateStart: this.animal.originalDateStart ? new Date(this.animal.originalDateStart) : null,
        minDateValue: this.animal.minDateValue ? new Date(this.animal.minDateValue) : null,
        oldLactationNumber: this.animal.oldLactationNumber ? this.animal.oldLactationNumber : null,
        daysInPregnancy: this.animal.daysInPregnancy ? this.animal.daysInPregnancy : null,
        reportingDate: this.animal.reportingDate ? new Date(this.animal.reportingDate) : null,
        healthIndex: this.animal.healthIndex ? this.animal.healthIndex : null,
        healthIndexPeak: this.animal.healthIndexPeak ? this.animal.healthIndexPeak : null,
        duration: this.animal.duration ? this.animal.duration : null,
        alertType: this.animal.alertType ? this.animal.alertType : null,
        calvingEase: this.animal.calvingEase ? this.animal.calvingEase : null,
        newBorns: this.animal.newBorns ? this.animal.newBorns : null,
        cowEntryStatus: this.animal.cowEntryStatus ? this.animal.cowEntryStatus : null,
        birthDateCalculated: this.animal.birthDateCalculated ? this.animal.birthDateCalculated : null,
        sire: this.animal.sire ? this.animal.sire : null,
        breedingNumber: this.animal.breedingNumber ? this.animal.breedingNumber : null,
        isOutOfBreedingWindow: this.animal.isOutOfBreedingWindow ? this.animal.isOutOfBreedingWindow : null,
        interval: this.animal.interval ? this.animal.interval : null,
        heatIndexPeak: this.animal.heatIndexPeak ? this.animal.heatIndexPeak : null
      });
    }
  }

  setMenu() {
    this.menuItems = [
      {
        label: 'Edit',
        command: () => {
          this.showEditableMode();
        }
      },
      {
        label: 'Delete',
        command: () => {
          this.delete();
        }
      }
    ];
  }

  showEditableMode() {
    this.isEditable = true;
    this.setForm();
  }

  delete() {
    console.log(this.animal)

    this.as.deleteAnimal(this.animal.animalId);
  }

  save() {
    console.log(this.animal)
    const item = {
      ...this.form.value
    } as IAnimalListItem;

    console.log(item)
    // this.as.saveAnimalChanges(item);
    this.as.saveAnimalChanges(this.animal);
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }

  goBack() {
    this.isEditable ? this.isEditable = false : this.router.navigate(['animals']);

  }

  ngOnDestroy() {
    this.isAlive = false;
  }

}

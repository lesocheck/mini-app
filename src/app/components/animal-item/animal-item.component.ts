import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AnimalsService} from '../../services/animals.service';
import {IAnimalListItem} from '../../models';
import {MenuItem} from 'primeng';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  templateUrl: './animal-item.component.html',
  styleUrls: ['./animal-item.component.scss']
})

export class AnimalItemComponent implements OnInit, OnDestroy {
  animal: IAnimalListItem;
  menuItems: MenuItem[];
  isEditable = false;
  form: FormGroup;
  isAlive = true;
  isAdd = false;

  constructor(private as: AnimalsService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')){
      this.getAnimalItem();
      this.setMenu();
    } else if (this.route.snapshot.paramMap.get('add')){
      this.showEditableMode();
      this.isAdd = true;
    } else {
      this.showEditableMode();
    }
  }

  getAnimalItem() {
    this.as.loadAnimalItem(this.route.snapshot.paramMap.get('id'))
      .subscribe((item) => {
          this.animal = item;
      });
  }

  get isInProgress() {
    return !this.animal && !this.isAdd;
  }

  private buildForm() {
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

  private setForm() {
    this.form.patchValue({
      type: this.animal && this.animal.type ? this.animal.type : null,
      lactationNumber: this.animal && this.animal.lactationNumber ? this.animal.lactationNumber : null,
      daysInLactation: this.animal && this.animal.daysInLactation ? this.animal.daysInLactation : null,
      ageInDays: this.animal && this.animal.ageInDays ? this.animal.ageInDays : null,
      startDateTime: this.animal && this.animal.startDateTime ? new Date(this.animal.startDateTime) : null,
      endDateTime: this.animal && this.animal.endDateTime ? new Date(this.animal.endDateTime) : null,
      newGroupName: this.animal && this.animal.newGroupName ? this.animal.newGroupName : null,
      currentGroupName: this.animal && this.animal.currentGroupName ? this.animal.currentGroupName : null,
      destinationGroup: this.animal && this.animal.destinationGroup ? this.animal.destinationGroup : null,
      destinationGroupName: this.animal && this.animal.destinationGroupName ? this.animal.destinationGroupName : null,
      originalDateStart: this.animal && this.animal.originalDateStart ? new Date(this.animal.originalDateStart) : null,
      minDateValue: this.animal && this.animal.minDateValue ? new Date(this.animal.minDateValue) : null,
      oldLactationNumber: this.animal && this.animal.oldLactationNumber ? this.animal.oldLactationNumber : null,
      daysInPregnancy: this.animal && this.animal.daysInPregnancy ? this.animal.daysInPregnancy : null,
      reportingDate: this.animal && this.animal.reportingDate ? new Date(this.animal.reportingDate) : null,
      healthIndex: this.animal && this.animal.healthIndex ? this.animal.healthIndex : null,
      healthIndexPeak: this.animal && this.animal.healthIndexPeak ? this.animal.healthIndexPeak : null,
      duration: this.animal && this.animal.duration ? this.animal.duration : null,
      alertType: this.animal && this.animal.alertType ? this.animal.alertType : null,
      calvingEase: this.animal && this.animal.calvingEase ? this.animal.calvingEase : null,
      newBorns: this.animal && this.animal.newBorns ? this.animal.newBorns : null,
      cowEntryStatus: this.animal && this.animal.cowEntryStatus ? this.animal.cowEntryStatus : null,
      birthDateCalculated: this.animal && this.animal.birthDateCalculated ? this.animal.birthDateCalculated : null,
      sire: this.animal && this.animal.sire ? this.animal.sire : null,
      breedingNumber: this.animal && this.animal.breedingNumber ? this.animal.breedingNumber : null,
      isOutOfBreedingWindow: this.animal && this.animal.isOutOfBreedingWindow ? this.animal.isOutOfBreedingWindow : null,
      interval: this.animal && this.animal.interval ? this.animal.interval : null,
      heatIndexPeak: this.animal && this.animal.heatIndexPeak ? this.animal.heatIndexPeak : null
    });
  }

  private setMenu() {
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

  private showEditableMode() {
    this.isEditable = true;
    this.setForm();
  }

  delete() {
    if (window.confirm('Are you sure?')) {
      this.as.deleteAnimal(this.animal.id);
    }
  }

  save(add: boolean) {
    this.formatDate();
    const item = {
      ...this.form.value
    } as IAnimalListItem;
    if (this.isAdd){
      this.as.addNewAnimal(item);
    } else {
      item.id = this.animal.id;
      this.as.saveAnimalChanges(item);
    }
    this.form.markAsUntouched();
    this.form.markAsPristine();
  }

  goBack() {
    this.isEditable ? this.isEditable = false : this.router.navigate(['animals']);
  }

  ngOnDestroy() {
    this.isAlive = false;
  }

  private formatDate() {
    const dateArreyKeys = ['startDateTime', 'originalDateStart', 'endDateTime', 'minDateValue', 'reportingDate'];
    dateArreyKeys.forEach(key => {
      this.form.value[key] = this.form.value[key] ? Date.parse(this.form.value[key]) : null;
    });
  }

}

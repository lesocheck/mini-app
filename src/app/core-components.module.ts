import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {SplitButtonModule} from 'primeng/splitbutton';
import {InputSwitchModule} from 'primeng/inputswitch';
import {CalendarModule} from 'primeng/calendar';
import {
  MainComponent,
  TableComponent,
  PaginatorComponent,
  AnimalItemComponent,
  AnimalsListComponent
} from './components';
import {CommonModule} from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

@NgModule({
  imports: [
    TableModule,
    ButtonModule,
    SplitButtonModule,
    CalendarModule,
    InputSwitchModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  exports: [
    TableComponent,
    PaginatorComponent,
    AnimalItemComponent,
    AnimalsListComponent,
    MainComponent
  ],
  declarations: [TableComponent, PaginatorComponent, AnimalsListComponent, AnimalItemComponent, MainComponent],
  bootstrap: [],
  providers: []
})

export class CoreComponentsModule { }

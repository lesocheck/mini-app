import {IAnimalListItemApiContract} from '../api-contract';

export interface IAnimalListItem {
  id?: string;
  type?: string;
  cowId?: number;
  animalId?: string;
  eventId?: number;
  deletable?: boolean;
  lactationNumber?: number;
  daysInLactation?: number;
  ageInDays?: number;
  startDateTime?: number;
  endDateTime?: number;
  newGroupId?: number;
  currentGroupId?: number;
  newGroupName?: string;
  currentGroupName?: string;
  destinationGroup?: number;
  destinationGroupName?: string;
  originalDateStart?: number;
  minDateValue?: number;
  oldLactationNumber?: number;
  daysInPregnancy?: number;
  reportingDate?: number;
  healthIndex?: number;
  healthIndexPeak?: string;
  duration?: number;
  alertType?: string;
  calvingEase?: string;
  newBorns?: number;
  cowEntryStatus?: string;
  birthDateCalculated?: boolean;
  sire?: string;
  breedingNumber?: number;
  isOutOfBreedingWindow?: boolean;
  interval?: number;
  heatIndexPeak?: string;
}

export function getAnimalListItem(contract: IAnimalListItemApiContract): IAnimalListItem {
  return {
    id: contract.id ? contract.id : null,
    type: contract.type,
    cowId: contract.cowId,
    animalId: contract.animalId,
    eventId: contract.eventId,
    deletable: contract.deletable,
    lactationNumber: contract.lactationNumber,
    daysInLactation: contract.daysInLactation,
    ageInDays: contract.ageInDays,
    startDateTime: contract.startDateTime,
    endDateTime: contract.endDateTime,
    newGroupId: contract.newGroupId,
    currentGroupId: contract.currentGroupId,
    newGroupName: contract.newGroupName,
    currentGroupName: contract.currentGroupName,
    destinationGroup: contract.destinationGroup,
    destinationGroupName: contract.destinationGroupName,
    originalDateStart: contract.originalStartDateTime,
    minDateValue: contract.minValueDateTime,
    oldLactationNumber: contract.oldLactationNumber,
    daysInPregnancy: contract.daysInPregnancy,
    reportingDate: contract.reportingDate,
    healthIndex: contract.healthIndex,
    healthIndexPeak: contract.healthIndexPeak,
    duration: contract.duration,
    alertType: contract.alertType,
    calvingEase: contract.calvingEase,
    newBorns: contract.newBorns,
    cowEntryStatus: contract.cowEntryStatus,
    birthDateCalculated: contract.birthDateCalculated,
    sire: contract.sire,
    breedingNumber: contract.breedingNumber,
    isOutOfBreedingWindow: contract.isOutOfBreedingWindow,
    interval: contract.interval,
    heatIndexPeak: contract.healthIndexPeak
  };
}

export function getAnimalListItemApiContract(item: IAnimalListItem): IAnimalListItemApiContract {
  return {
    id: item.id ? item.id : null,
    type: item.type,
    cowId: item.cowId,
    animalId: item.animalId,
    eventId: item.eventId,
    deletable: item.deletable,
    lactationNumber: item.lactationNumber,
    daysInLactation: item.daysInLactation,
    ageInDays: item.ageInDays,
    startDateTime: item.startDateTime,
    endDateTime: item.endDateTime,
    newGroupId: item.newGroupId,
    currentGroupId: item.currentGroupId,
    newGroupName: item.newGroupName,
    currentGroupName: item.currentGroupName,
    destinationGroup: item.destinationGroup,
    destinationGroupName: item.destinationGroupName,
    originalStartDateTime: item.originalDateStart,
    minValueDateTime: item.minDateValue,
    oldLactationNumber: item.oldLactationNumber,
    daysInPregnancy: item.daysInPregnancy,
    reportingDate: item.reportingDate,
    healthIndex: item.healthIndex,
    healthIndexPeak: item.healthIndexPeak,
    duration: item.duration,
    alertType: item.alertType,
    calvingEase: item.calvingEase,
    newBorns: item.newBorns,
    cowEntryStatus: item.cowEntryStatus,
    birthDateCalculated: item.birthDateCalculated,
    sire: item.sire,
    breedingNumber: item.breedingNumber,
    isOutOfBreedingWindow: item.isOutOfBreedingWindow,
    interval: item.interval,
    heatIndexPeak: item.healthIndexPeak
  };
}

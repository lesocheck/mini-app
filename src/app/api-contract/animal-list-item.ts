export interface IAnimalListItemApiContract {
  id: string;
  type: string;
  cowId: number;
  animalId: string;
  eventId: number;
  deletable: boolean;
  lactationNumber: number;
  daysInLactation: number;
  ageInDays: number;
  startDateTime: number;
  endDateTime: number;
  newGroupId?: number;
  currentGroupId?: number;
  newGroupName?: string;
  currentGroupName?: string;
  destinationGroup?: number;
  destinationGroupName?: string;
  originalStartDateTime?: number;
  minValueDateTime?: number;
  oldLactationNumber?: number;
  daysInPregnancy?: number;
  reportingDate?: number;
  healthIndex?: number;
  healthIndexPeak?: string;
  heatIndexPeak?: string;
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
}

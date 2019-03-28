import { PonyModel } from './pony.model';

export interface RaceModel {
  id: number;
  name: string;
  ponies: Array<PonyModel>;
  startInstant: string;
  status?: string;
  betPonyId?: number;
}

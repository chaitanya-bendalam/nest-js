import { Exclude, Expose, plainToInstance } from 'class-transformer';

import { Store, StoreHours } from 'server/data/models';
import { StoreHourTransformer } from './storeHour.transformer';

@Exclude()
export class StoreTransformer {
  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  address: string;

  @Expose()
  email: string;

  @Expose()
  lat: number;

  @Expose()
  long: number;

  @Expose()
  sortOrder: number;

  @Expose()
  hours: StoreHours[];

  @Expose()
  get storeHours() {
    return this?.hours?.length > 0
      ? plainToInstance(StoreHourTransformer, this.hours[0])
      : this.hours;
  }

  @Expose()
  distance: number;

  constructor(partial: Partial<Store>) {
    Object.assign(this, partial);
  }
}

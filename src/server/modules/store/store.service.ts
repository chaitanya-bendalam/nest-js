import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Store } from 'server/data/models';
import { StoreRepository } from 'server/data/repositories';
import { GetStoreQuery } from '../../data/models/storeQuery';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreRepository)
    private readonly storeRepository: StoreRepository,
  ) {}

  getOne(storeUUID: string, relations = []) {
    return this.storeRepository.findOne({
      where: { uuid: storeUUID },
      relations,
    });
  }

  getList(queryParams: GetStoreQuery): Promise<Store[]> {
    const {
      offset,
      limit,
      searchQuery,
      lat,
      lng,
      weekday,
      startHour,
      endHour,
    } = queryParams;
    const query = this.storeRepository
      .createQueryBuilder('store')
      .orderBy('store.sortOrder')
      .limit(limit)
      .offset(offset);
    searchQuery
      ? query.where('store.name like :name', { name: `%${searchQuery}%` })
      : null;
    weekday || startHour || endHour
      ? query.leftJoinAndSelect('store.hours', 'hour', 'hour.store_id=store.id')
      : null;
    weekday ? query.andWhere('hour.weekday = :weekday ', { weekday }) : null;
    startHour
      ? query.andWhere('hour.from >= :startHour ', { startHour })
      : null;
    endHour ? query.andWhere('hour.from <= :endHour ', { endHour }) : null;
    lat && lng
      ? query.orderBy(
          `((store.lat-${lat})*(store.lat-${lat}) + (store.long-${lng})*(store.long-${lng}))`,
        )
      : null;
    return query.getMany();
  }

  getMany(): any {
    return this.storeRepository.createQueryBuilder('store').getMany();
  }
}

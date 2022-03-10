import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Query,
  Response,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Parser } from 'json2csv';

import { plainToInstance } from 'class-transformer';
import { StoreService } from './store.service';
import { StoreTransformer } from './store.transformer';
import { GetStoreQuery } from '../../data/models/storeQuery';
import { Store } from 'antd/lib/form/interface';

@Controller('api/stores')
@UseInterceptors(ClassSerializerInterceptor)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )
  async getList(
    @Query() queryParams: GetStoreQuery,
  ): Promise<StoreTransformer[]> {
    queryParams.limit = queryParams.limit > 50 ? 50 : queryParams.limit;
    const stores = await this.storeService.getList(queryParams);
    stores.map((store: Store) => {
      const [newLat, newLng] = [
        queryParams.lat - Number(store.lat),
        queryParams.lng - Number(store.long),
      ];
      store['distance'] = Number(newLat * newLat) + Number(newLng * newLng);
    });
    return plainToInstance(StoreTransformer, stores);
  }

  /**
   * this endpoint should export all stores from database as a csv file
   * */
  @Get('export')
  async export(@Response({ passthrough: true }) res): Promise<any> {
    const stores = await this.storeService.getMany();
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(stores);

    res.set({
      'Content-Type': 'application/vnd.ms-excel',
      'Content-Disposition': 'attachment; filename="stores.csv"',
    });
    return csv;
  }
}

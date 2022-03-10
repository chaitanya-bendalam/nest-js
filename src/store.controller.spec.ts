import { Test } from '@nestjs/testing';
import { GetStoreQuery } from './server/data/models/storeQuery';
import { StoreController } from './server/modules/store/store.controller';
import { StoreService } from './server/modules/store/store.service';
import { Store } from './server/data/models';


describe('StoreController', () => {
    let storeController: StoreController;
    let storeService: StoreService;
    beforeEach(async () => {
        const module = await Test.createTestingModule({
            controllers: [StoreController],
            providers: [StoreService],
        }).compile();
        storeService = module.get<StoreService>(StoreService);
        storeController = module.get<StoreController>(StoreController);
    })
    describe('/api/stores', () => {
        it('should return get list of stores', async () => {
            const result1: Store[] = [{"id":1,"url":"http://mortimer.org","status":1,"uuid":"5f1b516e-46fc-456e-bea5-df2462d9cda4","name":"Abbott Inc","address":"3176 Rafael Mountains","email":"Oswald3@yahoo.com","lat":"-75.4","long":"93.15","sortOrder":0,"hours":[]}];
            const result2 = [{"uuid":"5f1b516e-46fc-456e-bea5-df2462d9cda4","name":"Abbott Inc","address":"3176 Rafael Mountains","email":"Oswald3@yahoo.com","lat":-75.4,"long":93.15,"sortOrder":0, "distance":null}];
            const queryString: GetStoreQuery = { offset: 0, lat: null, lng: null, endHour: null, limit: 50, searchQuery: null, weekday: 1, startHour: null};
            jest.spyOn(storeService, 'getList').mockResolvedValue(result1);
            expect(await storeController.getList(queryString)).toBe(result2);
        });
        it('should return get export of stores', async () => {
            const result1: Store[] = [{"id":1,"url":"http://mortimer.org","status":1,"uuid":"5f1b516e-46fc-456e-bea5-df2462d9cda4","name":"Abbott Inc","address":"3176 Rafael Mountains","email":"Oswald3@yahoo.com","lat":"-75.4","long":"93.15","sortOrder":0,"hours":[]}];
            const result2 = [{"uuid":"5f1b516e-46fc-456e-bea5-df2462d9cda4","name":"Abbott Inc","address":"3176 Rafael Mountains","email":"Oswald3@yahoo.com","lat":-75.4,"long":93.15,"sortOrder":0, "distance":null}];
            const queryString: GetStoreQuery = { offset: 0, lat: null, lng: null, endHour: null, limit: 50, searchQuery: null, weekday: 1, startHour: null};
            jest.spyOn(storeService, 'getMany').mockResolvedValue(result1);
            expect(await storeController.export(queryString)).toBe(result2);
        });
    });
});
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { OWN_HASHES_STORE_NAME } from './constants';

export function migrationFactory() {
  return {
    1: (db, transaction) => {
      const store = transaction.objectStore(OWN_HASHES_STORE_NAME);
      store.createIndex(`${OWN_HASHES_STORE_NAME}Index`, 'hash', { unique: true });
    },
    2: (db, transaction) => {
      const store = transaction.objectStore(OWN_HASHES_STORE_NAME);
      store.deleteIndex(`${OWN_HASHES_STORE_NAME}Index`);
    },
  };
}

const dbConfig: DBConfig  = {
  name: 'ContactTracing',
  version: 2,
  objectStoresMeta: [{
    store: OWN_HASHES_STORE_NAME,
    storeConfig: { keyPath: 'hash', autoIncrement: false },
    storeSchema: [

    ]
  }
  ],
  migrationFactory
};

@NgModule({
  imports: [CommonModule, NgxIndexedDBModule.forRoot(dbConfig)]
})
export class StoreHashModule {}

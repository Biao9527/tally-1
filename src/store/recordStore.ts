import clone from '@/lib/clone';

const localStorageKey = 'recordList';

const recordStore = {
  recordList: [] as RecordItem[],
  fetchRecord() {
    this.recordList = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]') as RecordItem[];
    return this.recordList;
  },
  save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(this.recordList));
  },
  createRecord(record: RecordItem) {
    const record2: RecordItem = clone(record);
    record2.createdAt = new Date();
    this.recordList?.push(record2);
    recordStore.save();
  },
};

recordStore.fetchRecord();
export default recordStore;
import recordListModel from '@/model/recordListModel';

const recordStore = {
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record)
};

export default recordStore;
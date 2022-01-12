const localStorageKey = 'labelList';

type Tag = {
  id: string
  name: string
}
type RecordListModel = {
  data: Tag[]
  create: (name: string) => 'succeed' | 'duplicated'
  fetch: () => Tag[]
  save: () => void
}
const recordListModel: RecordListModel = {
  data: [],
  create(name: string) {
    const names = this.data.map(item => item.name)
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push({id:name ,name: name});
    this.save();
    return 'succeed';
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]');
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(this.data));
  }
};

export default recordListModel;
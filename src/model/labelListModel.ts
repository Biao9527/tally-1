const localStorageKey = 'labelList';

type recordListModel = {
  data: string[]
  create: (name: string) => 'succeed' | 'duplicated'
  fetch: () => string[]
  save: () => void
}
const recordListModel: recordListModel = {
  data: ['衣', '食', '住', '行'],
  create(name: string) {
    if (this.data.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push(name);
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
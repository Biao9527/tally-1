import createId from '@/lib/createId';


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
  update: (id: string, name: string) => 'succeed' | 'duplicated' | 'no found'
  remove: (id: string) => boolean
}
const recordListModel: RecordListModel = {
  data: [],
  create(name: string) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    const id = createId().toString();
    console.log(id);
    this.data.push({id: id, name: name});
    this.save();
    return 'succeed';
  },
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]');
    return this.data;
  },
  save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(this.data));
  },
  update(id: string, name: string) {
    const tag: Tag = this.data.filter(item => item.id === id)[0];
    if (id === tag.id) {
      if (name === tag.name) {
        return 'duplicated';
      } else {
        tag.name = name;
        this.save();
        return 'succeed';
      }
    } else {
      return 'no found';
    }
  },
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  }

};

export default recordListModel;
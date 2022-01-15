import createId from '@/lib/createId';

const localStorageKey = 'labelList';

const tagStore = {
  tagList: [] as Tag[],
  fetchTag() {
    this.tagList = JSON.parse(window.localStorage.getItem(localStorageKey) || '[]');
    return this.tagList;
  },
  save() {
    window.localStorage.setItem(localStorageKey, JSON.stringify(this.tagList));
  },
  createTag(name: string) {
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    const id = createId().toString();
    this.tagList.push({id: id, name: name});
    this.save();
    return 'succeed';
  },
  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.save();
    return true;
  },
  updateTag(id: string, name: string) {
    const tag: Tag = this.findTag(id);
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
  findTag: function (id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  }
};

tagStore.fetchTag()

export default tagStore;
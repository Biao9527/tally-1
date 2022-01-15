import labelListModel from '@/model/labelListModel';

const tagStore = {
    tagList: labelListModel.fetch(),
    createTag: (name: string) => {
      return labelListModel.create(name);
    },
    removeTag: (id: string) => {
      if (labelListModel.remove(id)) {
        return true;
      } else {
        return false;
      }
    },
    updateTag: (id: string, name: string) => {
      return labelListModel.update(id, name);
    },
    findTag: function (id: string) {
      return this.tagList.filter(t => t.id === id)[0];
    }
  }
;

export default tagStore;
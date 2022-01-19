import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: undefined
  } as RootStore,
  mutations: {
    //record
    fetchRecord(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecord');
    },
    //tags
    fetchTag(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('labelList') || '[]');
    },
    saveTag(state) {
      window.localStorage.setItem('labelList', JSON.stringify(state.tagList));
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (name === '') {
        window.alert('标签名不能为空');
        return;
      }
      if (names.indexOf(name) >= 0) {
        window.alert('标签名重复');
      } else {
        const id = createId().toString();
        state.tagList.push({id: id, name: name});
        store.commit('saveTag');
        window.alert('创建成功');
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        window.alert('删除失败');
      } else {
        state.tagList.splice(index, 1);
        store.commit('saveTag');
        window.alert('删除成功');
      }
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTag');
          window.alert('标签名修改成功');
        }
      }
    },
  },
});

export default store;
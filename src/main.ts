import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Icon from '@/components/Icon.vue';
import labelListModel from '@/model/labelListModel';

Vue.config.productionTip = false;

Vue.component('Nav', Nav);
Vue.component('Icon', Icon);

window.tagList = labelListModel.fetch();
window.createTag = (name: string) => {
  return labelListModel.create(name);
};
window.removeTag = (id: string) => {
  if (labelListModel.remove(id)) {
    return true;
  } else {
    return false;
  }
};
window.updateTag = (id: string, name: string) => {
  return labelListModel.update(id, name)
};
window.findTag = (id :string) =>{
  return window.tagList.filter(t => t.id === id)[0]
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

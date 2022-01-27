<template>
  <Nav>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`labels/edit/${tag.id}`">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </router-link>
    </div>
    <div class="wrapper">
      <Button @click="createTag">新建标签</Button>
    </div>
  </Nav>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import store from '@/store/index.ts';

@Component({
  components: {Button}
})
export default class Labels extends Vue {
  get tags (){
    return store.state.tagList
  }
  created(){
    store.commit('fetchTag')
  }
  createTag() {
    const name = window.prompt();
    if (name === null){
      return
    }else {
      store.commit('createTag', name);
      if (store.state.tagsError === 'empty'){
        window.alert('标签名不能为空');
      }else if (store.state.tagsError === 'duplicated'){
        window.alert('标签名重复');
      }else if (store.state.tagsError === 'overlong'){
        window.alert('标签名过长');
      }else if (store.state.tagsError === 'succeed'){
        window.alert('创建成功');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 16px;
  max-height: 70vh;
  overflow: auto;

  .tag {
    color: #333333;
    background: #ffffff;
    margin-bottom: 12px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;

    svg {
      height: 24px;
      width: 24px;
      color: #999999;
    }
  }
}

.wrapper {
  display: flex;
  justify-content: center;
  margin-top: 44px;
}
</style>
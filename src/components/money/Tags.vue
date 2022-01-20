<template>
  <div class="tags">
    <div class="new">
      <button @click="create">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected: selectTags.indexOf(tag.name)>=0}"
          @click="toggle(tag.name)">
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import store from '@/store/index.ts';

@Component({
})
export default class Tags extends Vue {
  @Prop() selectTags!: string[];
  get tagList() {
    return store.state.tagList;
  }
  created() {
    this.$store.commit('fetchTag');
  }

  toggle(tag: string) {
    const index = this.selectTags.indexOf(tag);
    if (index >= 0) {
      this.selectTags.splice(index, 1);
    } else {
      this.selectTags.push(tag);
    }
  }

  create() {
    const name = window.prompt();
    if (name === null){
      return
    }else {
      store.commit('createTag', name);
      if (store.state.tagsError === 'empty'){
        window.alert('标签名不能为空');
      }else if (store.state.tagsError === 'duplicated'){
        window.alert('标签名重复');
      }else if (store.state.tagsError === 'succeed'){
        window.alert('创建成功');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;

  > .current {
    display: flex;
    flex-wrap: wrap;

    > li {
      background: #999;
      color: #fff;
      line-height: 24px;
      height: 24px;
      border-radius: 12px;
      padding: 0 16px;
      margin-right: 10px;
      margin-top: 4px;

      &.selected {
        background: #FF6200;
      }
    }
  }

  > .new {
    margin-top: 16px;

    > button {
      background: transparent;
      border: none;
      color: #999999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>
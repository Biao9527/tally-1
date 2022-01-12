<template>
  <Nav>
    <ul class="tags">
      <li v-for="tag in tags" :key="tag.id">
        <span>{{ tag.name }}</span>
        <Icon name="right"/>
      </li>
    </ul>
    <div class="wrapper">
      <button class="createTag" @click="createTag">新建标签</button>
    </div>
  </Nav>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import labelListModel from '@/model/labelListModel';

labelListModel.fetch();
@Component
export default class Labels extends Vue {
  tags = labelListModel.data;

  createTag() {
    const name = window.prompt();
    if (name === '') {
      window.alert('标签名不能为空');
    }else if (name){
      const message = labelListModel.create(name);
      if (message === 'succeed') {
        window.alert('创建成功');
      } else if (message === 'duplicated') {
        window.alert('标签名重复');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 16px;

  li {
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

  .createTag {
    font-size: 16px;
    border: none;
    background: #ff852a;
    color: #ffffff;
    height: 40px;
    padding: 0 14px;
    border-radius: 4px;
  }
}
</style>
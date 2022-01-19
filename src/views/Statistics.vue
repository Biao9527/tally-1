<template>
  <Nav>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <div class="tab-wrapper">
      <Tabs class-prefix="tab" :data-source="tabList" :value.sync="tab"/>
    </div>
    <ol class="entry">
      <li v-for="(group,index) in result" :key="index" class="group">
        <h3 class="title">{{ group.title }}</h3>
        <ol>
          <li v-for="(item,index) in group.items" :key="index" class="result">
            <span>{{ tagString(item.tage) }}</span>
            <span class="note">备注：{{item.note||'无'}}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Nav>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';
import tabList from '@/constants/tabList';
import store from '@/store';

type HashTableValue = {
  title: string,
  items: RecordItem[]
}
@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  get recordList() {
    return store.state.recordList;
  }

  get result() {
    const {recordList} = this;
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createdAt!.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  tagString(tags: string[]) {
    return tags.length === 0 ? '无' : tags.join(' , ');
  }

  created() {
    store.commit('fetchRecord');
  }

  tab = 'day';
  type = '-';
  tabList = tabList;
  typeList = typeList;
}
</script>

<style scoped lang="scss">
.tab-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;

  .tabs {
    border: 1px solid #999999;
    border-right-color: transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #f4f4f4;
  }

  ::v-deep .tab-item {
    height: 32px;
    width: 60px;
    font-size: 14px;
    background: #ffffff;
    color: #999999;
    border-right: 1px solid #999999;
  }

  ::v-deep .selected {
    background: #ff852a;
    color: #f2f2f2;
  }

  ::v-deep .selected::after {
    content: '';
    position: absolute;
    height: 0;
  }
}

.entry {
  margin-top: 20px;
  .group {
    .title {
      padding: 6px 16px;
      font-size: 18px;
      background: #ff852a;
      color: #f2f2f2;
    }
  }

  .result {
    min-height: 38px;
    background: #ffffff;
    padding: 0px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2f2f2;
    .note{
      margin-right: auto;
      margin-left: 16px;
      color: #999999;
    }
  }
}
</style>
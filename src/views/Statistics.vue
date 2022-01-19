<template>
  <Nav>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <div class="tab-wrapper">
      <Tabs class-prefix="tab" :data-source="tabList" :value.sync="tab"/>
    </div>
    <ol class="entry">
      <li v-for="(group,index) in groupList" :key="index" class="group">
        <h3 class="title">{{ beautify(group.title) }}</h3>
        <ol>
          <li v-for="(item,index) in group.items" :key="index" class="result">
            <span>{{ tagString(item.tage) }}</span>
            <span class="note">备注：{{ item.note || '无' }}</span>
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
import dayjs from 'dayjs';
import clone from '@/lib/clone';

type HashTableValue = {
  title: string,
  items: RecordItem[]
}
@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
  tab = 'day';
  type = '-';
  tabList = tabList;
  typeList = typeList;

  get recordList() {
    return store.state.recordList;
  }

  get groupList() {
    const {recordList} = this;
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList).sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    const result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const newItem = newList[i]
      const lastItem = result[result.length-1]
      if (dayjs(lastItem.title).isSame(dayjs(newItem.createdAt),'day')){
        lastItem.items.push(newItem)
      }else {
        result.push({title: dayjs(newItem.createdAt).format('YYYY-MM-DD'),items: [newItem]})
      }
    }
    console.log(result);
    return result;
  }

  created() {
    store.commit('fetchRecord');
  }

  tagString(tags: string[]) {
    return tags.length === 0 ? '无' : tags.join(' , ');
  }

  beautify(date: string) {
    const day = dayjs(date);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }
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

    .note {
      margin-right: auto;
      margin-left: 16px;
      color: #999999;
    }
  }
}
</style>
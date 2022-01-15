<template>
  <Nav class-prefix="nav">
    <NumberPad :amount.sync="record.amount" @submit="saveRecordList"/>
    <FormItem
      filterName="备注："
      placeholder="在这里输入备注"
      :notes.sync="record.note"/>
    <Tags :dataSource.sync="tags" @update:value="onUpdateTag"/>
    <Types :type.sync="record.type"/>
  </Nav>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/money/NumberPad.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';
import store from '@/store/index2.ts';

@Component({
  components: {Types, Tags, FormItem, NumberPad}
})

export default class Money extends Vue {
  record: RecordItem = {
    tage: [],
    type: '-',
    note: '',
    amount: 0
  };
  tags = store.tagList.map(item => item.name);
  recordList = store.recordList;

  onUpdateTag(value: string[]) {
    this.record.tage = value;
  }

  saveRecordList() {
    store.createRecord(this.record);
  }
}
</script>

<style lang="scss">
.nav-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

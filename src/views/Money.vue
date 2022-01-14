<template>
  <Nav class-prefix="nav">
    <NumberPad :amount.sync="record.amount" @submit="saveRecordList"/>
    <FormItem
      filterName="备注："
      placeholder="在这里输入备注"
      :notes.sync="record.note"/>
    <Tags :dataSource.sync="dataSource" @update:value="onUpdateTag"/>
    <Types :type.sync="record.type"/>
  </Nav>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import NumberPad from '@/components/money/NumberPad.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';
import recordListModel from '@/model/recordListModel';
import labelListModel from '@/model/labelListModel';


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
  dataSource = labelListModel.data.map(item => item.name);
  recordList = recordListModel.fetch();

  onUpdateTag(value: string[]) {
    this.record.tage = value;
  }

  saveRecordList() {
    recordListModel.create(this.record)
  }

  @Watch('recordList')
  recordListChange() {
    recordListModel.save();
  }
}
</script>

<style lang="scss">
.nav-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

<template>
  <Nav class-prefix="nav">
    <NumberPad :amount.sync="record.amount" @submit="saveRecordList"/>
    <Notes :notes.sync="record.note"/>
    <Tags :dataSource.sync="dataSource" @update:value="onUpdateTag"/>
    <Types :type.sync="record.type"/>
  </Nav>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import NumberPad from '@/components/money/NumberPad.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';
import recordListModel from '@/model/recordListModel';
import labelListModel from '@/model/labelListModel';


@Component({
  components: {Types, Tags, Notes, NumberPad}
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
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
  }

  @Watch('recordList')
  recordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.nav-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

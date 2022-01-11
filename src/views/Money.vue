<template>
  <Nav class-prefix="nav">
    <NumberPad :amount.sync="record.amount"/>
    <Notes :notes.sync="record.note"/>
    <Tags :dataSource.sync="dataSource" @update:value="onUpdateTag"/>
    <Types :type.sync="record.type"/>
  </Nav>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/money/NumberPad.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';

type Record = {
  tage: string[]
  type: string
  note: string
  amount: number
}

@Component({
  components: {Types, Tags, Notes, NumberPad}
})
export default class Money extends Vue {
  record: Record = {
    tage : [],
    type : '-',
    note : '',
    amount : 10
  };
  dataSource = ['衣', '食', '住', '行'];

  onUpdateTag(value: string[]) {
    this.record.tage = value
  }
}
</script>

<style lang="scss">
.nav-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

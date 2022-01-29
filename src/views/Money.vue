<template>
  <Nav class-prefix="nav" :is-show.sync="isShow">
    <NumberPad :amount.sync="record.amount" @submit="saveRecordList" v-show="isShow"/>
    <FormItem
      filterName="备注："
      placeholder="在这里输入备注"
      :notes.sync="record.note"
      :value="record.note"
      @update:isShow="show()"
    />
    <Tags :select-tags.sync="record.tage"/>
    <Tabs :data-source="typeList" :value.sync="record.type"/>
  </Nav>
</template>


<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/money/NumberPad.vue';
import FormItem from '@/components/money/FormItem.vue';
import Tags from '@/components/money/Tags.vue';
import store from '@/store/index.ts';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';

@Component({
  components: {Tabs, Tags, FormItem, NumberPad},
})

export default class Money extends Vue {
  typeList = typeList;
  isShow = true;

  get recordList() {
    return store.state.recordList;
  }

  record: RecordItem = {
    tage: [],
    type: '-',
    note: '',
    amount: 0
  };

  created() {
    this.$store.commit('fetchRecord');
  }

  saveRecordList() {
    if (this.record.tage.length === 0) {
      return window.alert('请至少选择一个标签');
    }
    this.$store.commit('createRecord', this.record);
    window.alert('已保存');
    this.record.note = '';
    this.record.amount = 0;
    this.record.tage = [];
  }
  show(){
    console.log('1');
    const height = document.body.clientHeight;
    window.addEventListener('resize', () => {
      if (document.body.clientHeight < height) {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
    });
  }
}




</script>

<style lang="scss">
.nav-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

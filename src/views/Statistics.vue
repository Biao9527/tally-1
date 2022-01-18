<template>
  <Nav>
    <Tabs class-prefix="type" :data-source="typeList" :value.sync="type"/>
    <div class="tab-wrapper">
      <Tabs class-prefix="tab" :data-source="tabList" :value.sync="tab"/>
    </div>
  </Nav>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';
import tabList from '@/constants/tabList';

@Component({
  components: {Tabs}
})
export default class Statistics extends Vue {
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
  .tabs{
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
  ::v-deep .selected{
    background: #ff852a;
    color: #f2f2f2;
  }
  ::v-deep .selected::after{
    content: '';
    position: absolute;
    height: 0px;
  }
}
</style>
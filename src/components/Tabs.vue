<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value" class="tabs-item"
    :class="{[classPrefix+'-item']:classPrefix,selected: item.value === value}"
    @click="setSelected(item.value)">{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem= {
  text: string
  value: string
}
@Component
export default class Tabs extends Vue {
  @Prop({required:true,type:Array}) readonly dataSource!: DataSourceItem[]
  @Prop(String) readonly value!: string
  @Prop(String) readonly classPrefix! :string

  setSelected(value:string){
    this.$emit('update:value',value)
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  font-size: 20px;
  text-align: center;
  background: #ff6200;
  color: #f0e0dc;

  &-item {
    width: 50%;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: 100%;
      background: #333333;
    }
  }
}
</style>
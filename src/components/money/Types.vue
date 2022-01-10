<template>
  <ul class="types">
    <li :class="type==='-'&& 'selected'" @click="selectType('-')">支出</li>
    <li :class="type==='+'&& 'selected'" @click="selectType('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  type = '-';

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.type = type;
  }
}
</script>

<style lang="scss" scoped>
.types {
  display: flex;
  font-size: 20px;
  text-align: center;
  background: #ff6200;
  color: #f0e0dc;

  li {
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
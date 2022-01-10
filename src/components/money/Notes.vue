<template>
  <table class="notes">
        <span>
         <Icon name="remark"/>
          备注:</span>
    <input type="text" @input="onInput" :value="value" placeholder="在这里输入备注">
  </table>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class notes extends Vue{
  value = ''
  onInput(event:KeyboardEvent){
    const input = event.target as HTMLInputElement
    this.value = input.value
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
  background: #f4f4f4;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.1);

  span {
    padding: 0 16px;

    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }

  input {
    height: 40px;
    background: transparent;
    border: none;
  }
}
</style>
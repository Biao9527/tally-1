<template>
  <table class="notes">
        <span>
         <Icon name="remark"/>
          备注:</span>
    <input type="text" v-model="value" placeholder="在这里输入备注">
  </table>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class notes extends Vue {
  @Prop(String) readonly notes!: string;
  value = '';

  @Watch('value')
  onUpdateNote(value: string) {
    this.$emit('update:notes', value);
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
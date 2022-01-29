<template>
  <table class="notes">
        <span>
         <Icon name="remark"/>
          {{ filterName }}
        </span>
    <input type="text" :value="value"
           @input="onUpdateNote($event.target.value)"
           :placeholder="placeholder"
           @click="$emit('update:isShow',false)"
           @blur="$emit('update:isShow',true)">
  </table>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class FormItem extends Vue {
  @Prop(String) readonly notes!: string;
  @Prop({required: true}) readonly filterName!: string;
  @Prop() readonly placeholder?: string;
  @Prop({default: ''}) readonly value!: string;
  onUpdateNote(value: string) {
    this.$emit('update:notes', value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
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
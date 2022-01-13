<template>
  <button class="button">
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Button extends Vue {

}
</script>

<style lang="scss" scoped>
.button {
  font-size: 16px;
  border: none;
  background: #ff852a;
  color: #ffffff;
  height: 40px;
  padding: 0 14px;
  border-radius: 4px;
}
</style>
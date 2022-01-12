<template>
<Nav>
  EditLabel.vue
</Nav>
</template>

<script lang="ts">
import labelListModel from '@/model/labelListModel';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class EditLabel extends Vue{
  created() {
    const id = this.$route.params.id
    labelListModel.fetch()
    const tags = labelListModel.data
    const tag = tags.filter(t => t.id === id)[0]
    if (tag){
      console.log(tag)
    }else {
      this.$router.replace('/404')
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
<template>
  <Nav>
    <div>
      <Icon name="left"/>
      <span>编辑标签</span>
    </div>
    <Notes
      filter-name="标签名"
      placeholder="请输入标签名"/>
    <Button>
      删除标签
    </Button>
  </Nav>
</template>

<script lang="ts">
import labelListModel from '@/model/labelListModel';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Notes from '@/components/money/Notes.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, Notes}
})
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    labelListModel.fetch();
    const tags = labelListModel.data;
    const tag = tags.filter(t => t.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/404');
    }
  }
};
</script>

<style lang="scss" scoped>

</style>
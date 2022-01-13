<template>
  <Nav>
    <div class="nacBar">
      <Icon name="left"/>
      <span>编辑标签</span>
      <Icon name="finish"/>
    </div>
    <div class="form-wrapper">
      <FormItem
        filter-name="标签名"
        placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Nav>
</template>

<script lang="ts">
import labelListModel from '@/model/labelListModel';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem}
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
  .nacBar{
    display: flex;
    text-align: center;
    justify-content: space-between;
    align-items: center;
    min-height: 56px;
    font-size: 20px;
    color: #f0e0dc;
    background: #ff6200;
    padding: 0 10px;
    svg{
      width: 30px;
      height: 30px;
    }
  }
  .form-wrapper{
    margin-top: 8px;
    min-height: 44px;
    background: #ffffff;
    border: 1px solid rgba(0,0,0,0.1);
  }
  .button-wrapper{
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: 44px;
  }
</style>
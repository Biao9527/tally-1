<template>
  <Nav>
    <div class="nacBar">
      <Icon name="left" @click.native="back"/>
      <span>编辑标签</span>
      <Icon name="finish" @click.native="finish"/>
    </div>
    <div class="form-wrapper">
      <FormItem
        @update:notes="onUpdateNotes"
        :value="tag.name"
        filter-name="标签名"
        placeholder="请输入标签名"/>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </Nav>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/money/FormItem.vue';
import Button from '@/components/Button.vue';
import store from '@/store/index.ts';

@Component({
  components: {Button, FormItem},
})
export default class EditLabel extends Vue {
  get tag() {
    return store.state.currentTag;
  }

  tagName: string | undefined;

  created() {
    store.commit('setCurrentTag', this.$route.params.id);
    if (!this.tag) {
      this.$router.replace('/404');
    }
  }

  onUpdateNotes(name: string) {
    this.tagName = name;
  }

  finish() {
    if (this.tag && this.tagName) {
      store.commit('updateTag',{id:this.tag.id, name:this.tagName});
    }
  }

  remove() {
    if (this.tag) {
      store.commit('removeTag', this.tag.id);
      this.$router.replace('/labels');
    }
  }

  back() {
    this.$router.replace('/labels');
  }
}
</script>

<style lang="scss" scoped>
.nacBar {
  display: flex;
  text-align: center;
  justify-content: space-between;
  align-items: center;
  min-height: 56px;
  font-size: 20px;
  color: #f0e0dc;
  background: #ff6200;
  padding: 0 10px;

  svg {
    width: 30px;
    height: 30px;
  }
}

.form-wrapper {
  margin-top: 8px;
  min-height: 44px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.button-wrapper {
  text-align: center;
  display: flex;
  justify-content: center;
  margin-top: 44px;
}
</style>
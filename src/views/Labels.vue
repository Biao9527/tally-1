<template>
  <Nav>
    <ul class="tags">
      <li>
        <span>衣</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>食</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>住</span>
        <Icon name="right"/>
      </li>
      <li>
        <span>行</span>
        <Icon name="right"/>
      </li>
    </ul>
    <div class="wrapper">
      <button class="createTag">新建标签</button>
    </div>
  </Nav>
</template>

<script lang="ts">
export default {
  name: 'Labels'
};
</script>

<style lang="scss" scoped>
.tags {
  font-size: 16px;
  li {
    background: #ffffff;
    margin-bottom: 12px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    svg {
      height: 24px;
      width: 24px;
      color: #999999;
    }
  }
}
.wrapper{
  display: flex;
  justify-content: center;
  margin-top: 44px;
  .createTag{
    font-size: 16px;
    border: none;
    background: #ff852a;
    color: #ffffff;
    height: 40px;
    padding: 0 14px;
    border-radius: 4px;
  }
}
</style>
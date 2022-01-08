<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot/>
    </div>
    <nav class="nav">
      <router-link to="/labels" class="item" active-class="selected">
        <Icon name="labels"/>
        <p>标签</p>
      </router-link>
      <router-link to="/money" class="item" active-class="selected">
        <Icon name="money"/>
        <p>记账</p>
      </router-link>
      <router-link to="/statistics" class="item" active-class="selected">
        <Icon name="statistics"/>
        <p>统计</p>
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">



export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
nav {
  display: flex;
  > .item{
    margin-top: 5px;
    width: 33.33333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
  > .item.selected{
    color: $color-highlight;
  }
}

.nav-wrapper {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.content {
  background: $color-background;
  overflow: auto;
  flex-grow: 1;
}
</style>
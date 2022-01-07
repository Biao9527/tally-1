<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot/>
    </div>
    <nav class="nav">
      <router-link to="/labels" class="item">
        <Icon name="labels"/>
        标签
      </router-link>
      <router-link to="/money" class="item">
        <Icon name="money"/>
        记账
      </router-link>
      <router-link to="/statistics" class="item">
        <Icon name="statistics"/>
        统计
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
nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0,0,0.85);
  > .item{
    margin-top: 5px;
    width: 33.33333%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
}

.nav-wrapper {
  display: flex;
  height: 100vh;
  flex-direction: column;
}

.content {
  background: lightgoldenrodyellow;
  overflow: auto;
  flex-grow: 1;
}
</style>
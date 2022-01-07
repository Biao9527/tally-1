<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot/>
    </div>
    <div class="nav">
      <router-link to="/labels">
        <Icon name="labels"/>
        标签
      </router-link>
      <router-link to="/money">
        <Icon name="money"/>
        记账
      </router-link>
      <router-link to="/statistics">
        <Icon name="statistics"/>
        统计
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">



export default {
  name: 'Nav'
};
</script>

<style scoped>
.nav {
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
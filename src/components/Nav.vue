<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot/>
    </div>
    <div class="nav">
      <router-link to="/money">记账</router-link>
      <router-link to="/labels">标签</router-link>
      <router-link to="/statistics">统计</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nav'
};
</script>

<style scoped>
.nav{
  border: 1px solid red;
}
.nav-wrapper{
  border: 1px solid green;
  display: flex;
  height: 100vh;
  flex-direction: column;
}
.content{
  background: lightgoldenrodyellow;
  overflow: auto;
  flex-grow: 1;
}
</style>
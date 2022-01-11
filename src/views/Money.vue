<template>
  <Nav class-prefix="nav">
    <NumberPad/>
    <Notes/>
    <Tags :dataSource="dataSource"/>
    <Types/>
  </Nav>
</template>

<script lang="ts">
import NumberPad from '@/components/money/NumberPad.vue';
import Notes from '@/components/money/Notes.vue';
import Tags from '@/components/money/Tags.vue';
import Types from '@/components/money/Types.vue';

export default {
  name: 'Money',
  components: {Types, Tags, Notes, NumberPad},
  data() {
    return {
      dataSource:['衣', '食', '住', '行']
    };
  }
};
</script>

<style lang="scss">
.nav-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>

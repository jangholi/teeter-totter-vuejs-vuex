<template>
  <div id="app" class="gameArea">
    <ObjectsBox />
    <TeeterTottle />
  </div>
</template>

<script>
import ObjectsBox from './components/ObjectsBox'
import TeeterTottle from './components/TeeterTottle'

export default {
  name: 'App',
  components: {
    ObjectsBox,
    TeeterTottle
  }
}
</script>
<style scoped>
  .gameArea {
    width: 80%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
  }
</style>
<template>
  <div id="app" class="gameArea">
    <div class="header__pauseButton"
         @click="togglePause">d
      <font-awesome-icon :icon="pauseButton"></font-awesome-icon>
    </div>
    <ObjectsDropbox />
    <TeeterTottle />
  </div>
</template>

<script>
import ObjectsDropbox from './components/ObjectsDropbox'
import TeeterTottle from './components/TeeterTottle'
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons'
import {mapMutations, mapState} from 'vuex'

export default {
  name: 'App',
  components: {
    ObjectsDropbox,
    TeeterTottle
  },
  computed: {
    ...mapState({
      isPaused: state => state.isPaused
    }),
    pauseButton() {
      return this.isPaused ? faPlay : faPause
    }
  },
  methods: {
    ...mapMutations({
      togglePause: 'togglePause'
    }),
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
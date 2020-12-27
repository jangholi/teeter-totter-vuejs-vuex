<template>
    <section class="dropbox">
        <FallingBlock v-for="(block, index) in fallingObjects"
                      :block="block"
                      :index="index"
                      :timeOut="timeOut"
                      @finished-falling="onFinishFalling"
                      :key="block.id">
        </FallingBlock>
    </section>
</template>

<script>
    import FallingBlock from './FallingBlock'
    import {mapMutations} from 'vuex'
    import {
        INITIAL_TIMEOUT,
        ITERATION_COUNT_INCREASING,
        TIMEOUT_STEP_DECREASING
    } from '../constants'

    export default {
        name: "ObjectsDropbox",
        components: {
            FallingBlock
        },
        data() {
            return {
                timeOut: INITIAL_TIMEOUT,
                iterationCounter: 0
            }
        },
        computed: {
            fallingObjects() {
                return this.$store.state.fallingObjects;
            }
        },
        methods: {
            ...mapMutations({
                initializeFallingObjects: 'initializeFallingObjects',
                moveObjectRight: 'moveObjectRight',
                moveObjectLeft: 'moveObjectLeft',
            }),
            onKeyDown(ev) {
                if (ev.keyCode === 39) this.moveObjectRight();
                if (ev.keyCode === 37) this.moveObjectLeft();
            },
            onFinishFalling() {
                this.iterationCounter++;
                if (this.iterationCounter === ITERATION_COUNT_INCREASING) {
                    this.timeOut -= TIMEOUT_STEP_DECREASING;
                    this.iterationCounter = 0;
                }
            }
        },
        beforeMount() {
            this.initializeFallingObjects();
            window.addEventListener('keydown', this.onKeyDown)
        },
        beforeDestroy() {
            window.removeEventListener('keydown', this.onKeyDown)
        }
    }
</script>

<style scoped>
    .dropbox {
        height: 65%;
        width: 100%;
        position: relative;
    }
</style>
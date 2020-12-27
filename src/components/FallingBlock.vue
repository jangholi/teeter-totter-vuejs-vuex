<template>
    <div>
        <Block :block="block"
               :top="blockDropboxTop"
               :ref="'block'"
               :index="index"
               :isPaused="isPaused"
        />
    </div>
</template>

<script>
    import Block from './Block'
    import {TEETER_TOTTER_WIDTH} from '../constants'

    export default {
        name: "FallingBlock",
        props: {
            block: {
                type: Object,
                required: true
            },
            index: {
                type: Number
            },
            timeOut: {
                type: Number
            }
        },
        components: {
            Block
        },
        data() {
            return {
                blockWindowBottom: 0,
                blockDropboxTop: this.block.height,
                timer: 0
            }
        },
        computed: {
            isPaused() {
                return this.$store.state.isPaused
            },
            swingBending() {
                return this.$store.getters.swingBendingDegree
            },
            blockFinalPosition() {
                const {top, bottom} = this.getSwingCoords();
                return this.swingBending >= 0 ? top + ((bottom - top) / 2) * (1 - this.block.position / (TEETER_TOTTER_WIDTH / 2))
                    : bottom - ((bottom - top) / 2) * (1 - this.block.position / (TEETER_TOTTER_WIDTH / 2))
            }
        },
        methods: {
            getSwingCoords() {
                const {top, bottom} = document.querySelector('.swing').getBoundingClientRect();
                return {
                    top, bottom
                }
            },
            incrementBlockDropboxTop() {
                this.blockDropboxTop += 20;
            }
        },
        updated() {
            if (this.isPaused) return clearTimeout(this.timer);
            if (this.index !== 0) return;

            this.blockWindowBottom = this.$refs.block.getBlockBottomCoord();
            this.timer = setTimeout(() => {
                if (this.blockWindowBottom >= this.blockFinalPosition - 20) {
                    clearTimeout(this.timer);
                    this.$store.dispatch('finishFalling');
                    this.$emit('finished-falling');
                    return;
                }
                this.incrementBlockDropboxTop();
            }, this.timeOut)
        }
    }
</script>
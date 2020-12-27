<template>
    <div :class="blockClassName"
         :style="blockInlineStyle"
         :ref="'element'">
        {{ block.weight }}
    </div>
</template>

<script>
    export default {
        name: "Block",
        props: {
            block: {
                type: Object,
                required: true
            },
            side: {
                type: Boolean
            },
            top: {
                type: Number
            }
        },
        methods: {
            roundUp(number) {
                return Math.round(number * 100) / 100
            },
            getBlockBottomCoord() {
                const domElement = this.$refs.element;

                return domElement.getBoundingClientRect().bottom;
            }
        },
        computed: {
            blockClassName() {
                const {type} = this.block;
                let className;

                switch (type) {
                    case 0:
                        className = 'block-circle';
                        break;
                    case 1:
                        className = 'block-triangle';
                        break
                    case 2:
                        className = 'block-rectangle'
                        break
                }
                return className
            },
            blockInlineStyle() {
                const {position, type, height} = this.block;
                const {side, roundUp, top} = this;

                const topPosition = top || 0;
                const leftPosition = side ? 50 + position * 10 : 50 - position * 10;
                const blockHeight = type !== 1 ?
                    {
                        height: `${roundUp(height)}px`,
                        width: `${roundUp(height)}px`,
                        lineHeight: `${roundUp(height)}px`
                    }
                    :
                    {
                        borderWidth: `0 ${roundUp(height)}px ${roundUp(height)}px ${roundUp(height / 2)}px`,
                        lineHeight: `${roundUp(height * 1.2)}px`
                    };

                return {
                    top: `${topPosition}px`,
                    left: `${leftPosition}%`,
                    ...blockHeight
                }
            }
        },
    }
</script>

<style scoped>
    .block-circle, .block-rectangle, .block-triangle {
        position: absolute;
        transform: translate(-50%, -100%);
        text-align: center;
    }
    .block-circle {
        background-color: #29b6f6;
        border-radius: 50%;
    }
    .block-triangle {
        width: 0;
        height: 0;
        line-height: 4rem;
        border-style: solid;
        border-color: transparent transparent #ffca28 transparent
    }
    .block-rectangle {
        background-color: #ef5350;
    }
</style>
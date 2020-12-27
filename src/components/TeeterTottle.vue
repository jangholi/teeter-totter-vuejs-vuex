<template>
    <section class="teeterTottle">
        <div class="swing" :style="swingInlineStyle">
            <Block v-for="(block, index) in leftSideObjects"
                   :block="block"
                   :key="index" />
            <Block v-for="(block, index) in rightSideObjects"
                   :block="block"
                   :side="true"
                   :key="index" />
        </div>
        <div class="pillar"></div>
    </section>
</template>

<script>
    import Block from './Block'
    import {mapState, mapMutations} from 'vuex'

    export default {
        name: "TeeterTottle",
        components: {
            Block
        },
        beforeMount() {
            this.addObjectToRight()
        },
        methods: {
            ...mapMutations({
                addObjectToRight: 'addObjectToRight'
            })
        },
        computed: {
            ...mapState([
                'rightSideObjects',
                'leftSideObjects'
            ]),
            swingBendingDegree() {
                return this.$store.getters.swingBendingDegree
            },
            swingInlineStyle() {
                return {
                    transform: `rotate(${this.swingBendingDegree / 2}deg)`
                }
            }
        }
    }
</script>

<style scoped>
    .swing {
        width: 100%;
        height: 0.5rem;
        background-color: #263238;
        position: relative;
        transform: rotate(0deg);
        transition: transform 0.4s ease-in-out;
    }
    .pillar {
        width: 0;
        height: 0;
        margin: 0 auto;
        border-style: solid;
        border-width: 0 75px 150px 75px;
        border-color: transparent transparent #263238 transparent;
    }
    .teeterTottle{
        height: 35%;
        width: 100%;
        margin-top: 300px;
    }
</style>
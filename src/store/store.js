import Vue from 'vue';
import Vuex from 'vuex';
import {MAX_BENDING} from '../constants'
import {calcSomeOfObjects} from '../helpers'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        leftSideBlocks: [],
        rightSideBlocks: []
    },
    getters: {
            someOfLeftSideObjects(state) {
                return calcSomeOfObjects(state.leftSideBlocks)
            },
            someOfRightSideObjects(state) {
                return calcSomeOfObjects(state.rightSideBlocks)
            },
            swingBending(state, getters) {
                const {someOfLeftSideObjects: leftSum, someOfRightSideObjects: rightSum} = getters;

                if (!leftSum) return MAX_BENDING;
                if (leftSum === rightSum) return 0;
                return leftSum > rightSum ? (leftSum - rightSum) / leftSum * -100 : (rightSum - leftSum) / rightSum * 100
            },
    },
    mutations: {},
    actions: {}
});

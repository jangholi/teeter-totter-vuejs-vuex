import Vue from 'vue';
import Vuex from 'vuex';
import {MAX_BENDING} from '../constants'
import {calcSomeOfObjects, generateRandomObject} from '../helpers'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        leftSideObjects: [],
        rightSideObjects: []
    },
    getters: {
            someOfLeftSideObjects(state) {
                return calcSomeOfObjects(state.leftSideObjects)
            },
            someOfRightSideObjects(state) {
                return calcSomeOfObjects(state.rightSideObjects)
            },
            swingBendingDegree(state, getters) {
                const {someOfLeftSideObjects: leftSum, someOfRightSideObjects: rightSum} = getters;

                if (!leftSum) return MAX_BENDING;
                if (leftSum === rightSum) return 0;
                return leftSum > rightSum ? (leftSum - rightSum) / leftSum * -100 : (rightSum - leftSum) / rightSum * 100
            }
    },
    mutations: {
        addObjectToRight(state) {
            const randomBlock = generateRandomObject();
            state.rightSideObjects.push(randomBlock)
        },
    },
    actions: {}
});
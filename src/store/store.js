import Vue from 'vue';
import Vuex from 'vuex';
import {MAX_BENDING, FALLING_BLOCKS_COUNT, MIN_BENDING, MAX_SIDES_DIFFERENCE} from '../constants'
import {calcSomeOfObjects, generateRandomObject} from '../helpers'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        leftSideObjects: [],
        rightSideObjects: [],
        fallingObjects: [],
        isPaused: true
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
            },
            gameOverStatus(state, getters) {
                const {someOfLeftSideObjects: leftSum, someOfRightSideObjects: rightSum, swingBendingDegree} = getters;

                return swingBendingDegree > MAX_BENDING || swingBendingDegree < MIN_BENDING || Math.abs(leftSum - rightSum) > MAX_SIDES_DIFFERENCE
            }
    },
    mutations: {
        addObjectToRight(state) {
            const randomObject = generateRandomObject();
            state.rightSideObjects.push(randomObject)
        },
        addObjectToLeft(state) {
            const Object = state.fallingObjects.shift();
            state.leftSideObjects.push(Object);
        },
        initializeFallingObjects(state){
            state.fallingObjects = [];
            for(let i = 0; i < FALLING_BLOCKS_COUNT; i++){
                const randomObject = generateRandomObject();
                state.fallingObjects.push(randomObject)
            }
        },
        addFallingObject(state){
            const randomObject = generateRandomObject();
            state.fallingObjects.push(randomObject)
        },
        moveObjectRight(state){
            if (state.isPaused || state.fallingObjects[0].position - 1 <= 0) return;
            state.fallingObjects[0].position -= 1;
        },
        moveObjectLeft(state){
            if (state.isPaused || state.fallingObjects[0].position + 1 > 5) return;
            state.fallingObjects[0].position += 1;
        },
        togglePause(state) {
            state.isPaused = !state.isPaused
        },
        resetState(state) {
            state.isPaused = true;
            state.leftSideObjects = [];
            state.rightSideObjects = [];
            state.fallingObjects = []
        }
    },
    actions: {
        finishFalling({commit, state, getters, dispatch}) {

            commit('addObjectToLeft');
            commit('addFallingObject');
            if (state.leftSideObjects.length && state.leftSideObjects.length !== state.rightSideObjects.length)
                commit('addObjectToRight');

            if (getters.gameOverStatus) setTimeout(() => {
                alert('game over');
                dispatch('startNewGame');
            }, 0);
        },
        startNewGame({commit}){
            commit('resetState');
            commit('addObjectToRight');
            commit('initializeFallingObjects');
        }
    }
});
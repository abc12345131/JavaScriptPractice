import Vue from 'vue'
import Vuex from 'vuex'

const actions = {
    add(context, value) {
        context.commit('ADD', value)
    },
    minus(context, value) {
        context.commit('MINUS', value)
    },
    addOdd(context, value) {
        if(context.state.sum % 2) {
            context.commit('ADD', value)
        }
    },
    addWait(context, value) {
        setTimeout(() => {
            context.commit('ADD', value)
        }, 500)
    }
}

const mutations = {
    ADD(state, value) {
        state.sum += value
    },
    MINUS(state, value) {
        state.sum -= value
    }
}

const state = {
    sum: 0
}

const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}

Vue.use(Vuex)

const store = new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})

export default store
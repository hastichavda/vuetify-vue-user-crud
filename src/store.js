import Vue from 'vue'
import Vuex from 'vuex'
import userJson from '../src/json/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    users: [],
    selectedUser: [],
  },

  getters: {
    getAllUsers: (state) => state.users,
    getSelectedUser: (state) => state.selectedUser,
  },

  actions: {
    async fetchAllUsers({ commit }) {
      await commit('fetch_users')
    },
    async fetchSelectedUser({ commit }) {
      await commit('fetch_selected_user')
    },
    async addUser({ commit }, data) {
      await commit('add_user', data)
    },
    async setSelectedUser({ commit }, data) {
      commit('set_selected_user', data)
    },
    async updateUser({ commit }, data) {
      await commit('update_user', data)
    },
    async deleteUser({ commit }, id) {
      await commit('delete_user', id)
    },
  },

  mutations: {
    fetch_users(state) {
      state.users = JSON.parse(localStorage.getItem('users'))
    },
    add_user(state, data) {
      state.users.push(data)
      localStorage.setItem('users', JSON.stringify(state.users))
    },
    update_user(state, data) {
      let pos = state.users.findIndex((user) => user.id === data.id)
      state.users[pos] = data
      localStorage.setItem('users', JSON.stringify(state.users))
      localStorage.removeItem('selectedUser')
    },
    delete_user(state, id) {
      let index = state.users.findIndex((user) => user.id === id)
      state.users.splice(index, 1)
      localStorage.setItem('users', JSON.stringify(state.users))
    },
    set_selected_user(state, data) {
      state.selectedUser = data
      localStorage.setItem('selectedUser', JSON.stringify(data))
    },
    fetch_selected_user(state) {
      state.selectedUser = JSON.parse(localStorage.getItem('selectedUser'))
    },
  },
})

export default store

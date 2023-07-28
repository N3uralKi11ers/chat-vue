import { createStore } from 'vuex'

export default createStore({
  state: {
    userId: '',
    chats: [
      {
          "id": 123,
          "name": "Иван Иванов"
      },
      {
          "id": 3948,
          "name": "Александр Александров"
      },
      {
          "id": 5678,
          "name": "Михаил Михайлов"
      },
      {
          "id": 9123,
          "name": "Екатерина Екатеринова"
      },
      {
          "id": 7890,
          "name": "Сергей Сергеев"
      }
  ],
    messages: []
  },

  getters: {
    getUserId(state) {
      return state.userId
    },
    isAuth(state) {
      return !!state.userId
    },
    getChats(state) {
      return state.chats.filter((chat) => chat.id !== state.userId)
    },
    getAllChats(state) {
      return state.chats
    },
    getMessages(state) {
      return state.messages
    }
  },

  mutations: {
    setUserId(state, userId) {
      state.userId = userId
    },
    setUser(state, usr) {
      state.chats.push({
        "name" : usr.name,
        "id" : usr.id,
      })
    },
    setMessage(state, message) {
      state.messages.push(message)
    }
  },

  actions: {
    saveUserId({ commit }, userId) {
      commit('setUserId', userId)
    },
    saveUser({ commit }, usr) {
      commit('setUser', usr)
    },
    saveMessage({ commit }, message) {
      commit('setMessage', message)
    }
  }

})

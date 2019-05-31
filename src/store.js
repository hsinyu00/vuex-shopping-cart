import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    products: [],
    cart: [],
  },
  getters: {
    updateTotal(state) {
      if(state.cart.length > 0) {
        let total = state.cart.map(function(obj) {
            let sub = obj.price * obj.qty
            return sub
        }).reduce(function(result, sub) {
            return result + sub
        })
        return total
      }
    }
  },
  mutations: {
    addToCart(state, id) {
      if(state.cart.length > 0) {
          let target = state.cart.map(function(item) { return item.id; }).indexOf(id)
          if (target >= 0) { // cart 裡已有此項
              state.cart[target].qty = state.cart[target].qty + 1
              Vue.set(state.cart, target, state.cart[target])
          } else {
              let newItem = state.products.find(function (obj) { return obj.id === id })
              newItem.qty = 1
              state.cart.push(newItem)
          }
      } else {
        let newItem = state.products.find(function (obj) { return obj.id === id })
        newItem.qty = 1
        state.cart.push(newItem)
      }
    },
    removeFromCart(state, id) {
      if(state.cart.length > 0) {
        if (confirm("Delete this item?")) {
          // https://gist.github.com/scottopolis/6e35cf0d53bae81e6161662e6374da04
          let target = state.cart.map(function(item) { return item.id; }).indexOf(id)
          state.cart.splice(target, 1)
        }
      }
    },
    decrease(state, id) {
      let target = state.cart.map(function(item) { return item.id; }).indexOf(id)
      if (state.cart[target].qty > 1) {
          state.cart[target].qty = state.cart[target].qty - 1
          Vue.set(state.cart, target, state.cart[target])
      }
    },
    increase(state, id) {
      let target = state.cart.map(function(item) { return item.id; }).indexOf(id)
      state.cart[target].qty = state.cart[target].qty + 1
      Vue.set(state.cart, target, state.cart[target])
    },
    emptyCart(state) {
      if (confirm("Empty cart?")) {
        state.cart = []
      }
    },
    loadSuccess(state, data) {
      state.products = data
    },
    loadCart(state) {
      state.cart = JSON.parse(localStorage['cart'])
    }
  },
  actions: {
    loadProducts: ({ commit }) => {
      axios({
          method: 'get',
          url: 'data/products2.json',
      })
      .then((response) => {
          commit('loadSuccess', response.data.products)
      })
    }
  }
})

<template>
  <div id="app">
        <h2>Products</h2>
        <products></products>
        <h2>My Shopping Cart</h2>
        <cart></cart>
        <button id="emptyCart" @click="emptyCart">clear cart</button>
    </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import CartItem from '@/components/CartItem'
import Product from '@/components/Product'

export default {
    methods: {
        emptyCart() {
            this.$store.commit('emptyCart')
        }
    },
    components: {
        'cart': CartItem,
        'products': Product
    },
    created() {
        this.$store.dispatch('loadProducts')
        this.$store.commit('loadCart')
    }
}

</script>

<style lang="scss">
    table,th,td {
        border:1px solid #aaa;
    }
    #emptyCart {
        margin-top: 20px;
    }
    td {
        padding: 5px;
    }
    [v-cloak] {
    display: none;
    }
</style>

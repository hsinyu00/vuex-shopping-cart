<template>
    <div id="products">
        <div class="item" v-for="item in products">
            <img :src="item.image" class="prod-img">
            <p>{{ item.id }}</p>
            <p>{{ item.name }}</p>
            <p>{{ item.price }}</p>
            <button class="add-to-cart" data-id="item.id" @click="addToCart(item.id)">Add to cart</button>
        </div>
    </div>
</template>

<script>

export default {
    computed: {
        products(){
            return this.$store.state.products;
        }
    },
    methods: {
        addToCart(id) {
            this.$store.commit('addToCart', id)
        }
    }
}
</script>

<style lang="scss">
    .prod-img {
        float: left;
        margin-right: 20px;
        width: 200px;
        height: 200px;
    }
    .item {
        border-bottom: 1px solid #eee;
    }
    .item:before, .item:after {
        content: " ";
        display: table;
    }
    .item:after {
        clear: both;
    }
</style>
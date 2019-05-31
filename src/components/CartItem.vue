<template>
<div id="cart">
<div v-if="cart.length > 0">
    <table>
        <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th>Del</th>
        </tr>
        <tr v-for="item in cart">
            <td class="id">{{ item.id }}</td>
            <td class="name">{{ item.name }}</td>
            <td class="price">{{ item.price }}</td>
            <td class="qty">
                <button @click="decrease(item.id)"> - </button>
                {{ item.qty }}
                <button @click="increase(item.id)"> + </button>
            </td>
            <td class="sub">{{ item.qty * item.price }}</td>
            <td><span class="del" @click="removeFromCart(item.id)"><img src="images/trash.gif"></span></td>
        </tr>
        <tr>
            <td colspan="6">Total: {{ total }}</td>
        </tr>
    </table>
</div>
<div v-else>No item in cart.</div>
</div>
</template>

<script>
export default {
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        total() {
            return this.$store.getters.updateTotal;
        }
    },
    watch: {
        cart: {
            deep: true,
            handler: (val, old) => {
                console.log(val)
                localStorage['cart'] = JSON.stringify(val)
            }
        }
    },
    methods: {
        decrease(id) {
            this.$store.commit('decrease', id)
        },
        increase(id) {
            this.$store.commit('increase', id)
        },
        removeFromCart(id) {
            this.$store.commit('removeFromCart', id)
        }
    }
}
</script>
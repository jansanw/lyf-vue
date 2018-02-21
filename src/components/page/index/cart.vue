<template lang="html">
    <div class="page has-tabbar">
        <cart-data></cart-data>
        <footnav :active="2"></footnav>
    </div>
</template>
<script>
    import CartData from '../../layout/cart-data'
    import footnav from '../../layout/footnav';

    export default {
        components: {
            CartData,
            footnav
        },
        mounted() {
            // this.$store.commit('UPDATE_PAGE_LOAD_STATE_DATA', {
            //     cart: true,
            // });
        },
        beforeRouteEnter(to, from, next) {
            // console.log('to:' + to.path, 'from:' + from.path);
            next(vm => {
                $loading.hide();
                if (from.path === "/login")
                    vm.$store.commit('UPDATE_COMMON_DATA', {cart_view_data_reload: true});
            })
        }
    }
</script>

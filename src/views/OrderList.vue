<template>

    <div class="wrapper">
        <!-- header部分 -->
        <header>
            <p>我的订单</p>
        </header>
        <!-- 订单列表部分 -->
        <h3>未支付订单信息:</h3>
        <ul class="order" >
            <li v-for="item in orderArr" >
                <div class="order-info" v-if="item.orderState === 0">
                    <p>
                        {{ item.business.businessName }}
                        <i class="fa fa-caret-down" @click="detailetShow(item)"></i>
                    </p>
                    <div class="order-info-right">
                        <p>&#165;{{ calculateTotalPrice(item.list)+item.business.deliveryPrice }}</p>
                        <div class="order-info-right-icon" @click="toOrder(item)">去支付</div>
                    </div>
                </div>
                <ul class="order-detailet" v-show="item.isShowDetailet" v-if="item.orderState === 0">
                    <li v-for="odItem in item.list">
                        <p>{{ odItem.food.foodName }} x {{ odItem.quantity }}</p>
                        <p>&#165;{{ odItem.food.foodPrice * odItem.quantity }}</p>
                    </li>
                    <li>
                        <p>配送费</p>
                        <p>&#165;{{ item.business.deliveryPrice }}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <h3>已支付订单信息:</h3>
        <ul class="order">
            <li v-for="item in orderArr" >
                <div class="order-info" v-if="item.orderState == 1">
                    <p>
                        {{ item.business.businessName }}
                        <i class="fa fa-caret-down" @click="detailetShow(item)"></i>
                    </p>
                    <div class="order-info-right">
                        <p>&#165;
                            {{ item.orderTotal }}</p>
                    </div>
                </div>
                <ul class="order-detailet" v-show="item.isShowDetailet" v-if="item.orderState == 1">
                    <li v-for="odItem in item.list">
                        <p>{{ odItem.food.foodName }} x {{ odItem.quantity }}</p>
                        <p>&#165;{{ odItem.food.foodPrice * odItem.quantity }}</p>
                    </li>
                    <li>
                        <p>配送费</p>
                        <p>&#165;
                            {{ item.business.deliveryPrice }}</p>
                    </li>
                </ul>
            </li>
        </ul>
        <!-- 底部菜单部分 -->
        <Footer></Footer>
    </div>
</template>
<script>

import { ref, onMounted, inject, computed } from 'vue';
import Footer from '../components/Footer.vue';
import axios from 'axios'; // 添加这一行来引入 axios
import qs from 'qs';
import { useRoute, useRouter } from 'vue-router';

export default {
    name: 'OrderList',
    components: {
        Footer
    },
    setup() {
        document.onscroll = null;
        const $getSessionStorage = inject('$getSessionStorage');
        const orderArr = ref([]);
        const user = ref({});
        const orderLoad= ref(false);
        const router = useRouter();
        const route = useRoute();

        onMounted(() => {  
            user.value = $getSessionStorage('user');

            axios.get('Orders/UserId', {
                params: {
                    userId: user.value.userId
                }
            }).then(response => {
                let result = response.data.result;
                for (let orders of result) {
                    orders.isShowDetailet = false;
                }
                orderArr.value = result;
            }).catch(error => {
                console.error(error);
            });
        });

        const calculateTotalPrice = (itemList) =>{
            let totalPrice = 0;
            for (const odItem of itemList) {
                totalPrice += odItem.food.foodPrice * odItem.quantity;
            }
            return totalPrice ;
        };

        const detailetShow = (order) => {
            order.isShowDetailet = !order.isShowDetailet;
        };

        const toOrder = (order) =>{
            router.push({path:'/orders',query:{
                businessId: order.businessId,
                UsedOrderId: order.orderId,
            }})
        }
        return {
            orderArr,
            user,
            orderLoad,
            detailetShow,
            toOrder,
            calculateTotalPrice
        };
    }
};
</script>



<style scoped>
/****************** 总容器 ******************/
.wrapper {
    width: 100%;
    height: 100%;
}

/****************** header部分 ******************/
.wrapper header {
    width: 100%;
    height: 12vw;
    background-color: #0097FF;
    color: #fff;
    font-size: 4.8vw;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

/****************** 历史订单列表部分 ******************/
.wrapper h3 {
    margin-top: 12vw;
    box-sizing: border-box;
    padding: 4vw;
    font-size: 4vw;
    font-weight: 300;
    color: #999;
}

.wrapper .order {
    width: 100%;
}

.wrapper .order li {
    width: 100%;
}

.wrapper .order li .order-info {
    box-sizing: border-box;
    padding: 2vw 4vw;
    font-size: 4vw;
    color: #666;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.wrapper .order li .order-info .order-info-right {
    display: flex;
}

.wrapper .order li .order-info .order-info-right .order-info-right-icon {
    background-color: #f90;
    color: #fff;
    border-radius: 3px;
    margin-left: 2vw;
    user-select: none;
    cursor: pointer;
}

.wrapper .order li .order-detailet {
    width: 100%;
}

.wrapper .order li .order-detailet li {
    width: 100%;
    box-sizing: border-box;
    padding: 1vw 4vw;
    color: #666;
    font-size: 3vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
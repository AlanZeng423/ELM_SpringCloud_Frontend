<template>
    <div class="wrapper">
        <header>
            PAYING
        </header>
        <div class="container">
            <button class="paying-button" @click="updatePoint">
                支付&#165;{{ totalPrice }}成功
                您现在的积分为：{{ newpoint }}
            </button>
        </div>
        <Footer></Footer>
    </div>
</template>


<script>
import { ref, onMounted, inject, computed } from 'vue';
import Footer from '../components/Footer.vue';
// const $getSessionStorage = inject('$getSessionStorage');
import axios from 'axios';
import qs from 'qs';
import { useRoute, useRouter } from 'vue-router';
export default {
    name: 'Paying',
    components: {
        Footer,
    },
    setup() {
        // const user = ref({});
        const $getSessionStorage = inject('$getSessionStorage');
        const user = ref({});
        const router = useRouter();
        const route = useRoute();
        const discountNum = ref(route.query.discountNum);
        const totalPrice = ref(route.query.totalPrice);
        const orderId = ref(route.query.orderId);
        const point = ref(route.query.point);
        const orderState = ref(1);
        const tempOrders = ref([]);
        
        // axios.post()
        onMounted(()=>{
            user.value = $getSessionStorage('user');

            axios.get('Orders/OrdersId',qs.stringify({
                orderId:orderId.value
            })).then(response => {
                tempOrders.value = response.data;
                axios.post('BusinessController/updateOrderQuantity',qs.stringify({
                    businessId:tempOrders.value.business.businessId,
                    orderQuantity:tempOrders.value.business.orderQuantity + 1
                })).catch(error=>{
                    console.error(error);
                })
            }).catch(error=>{
                console.error(error);
            });


            
        })

        const newpoint =  computed(() =>{
            let newpoint = 0;
            newpoint = totalPrice.value-0;
            newpoint += point.value-0;
            if(discountNum.value > 0){
                newpoint -= discountNum.value*100;
            }
            return newpoint;
        });

        const updatePoint = () =>{
            axios.post('User/Point',qs.stringify({
                userId: user.value.userId,
                point: newpoint.value
            })).catch(error=>{
                console.error(error);
                alert('更新成功');
            })

            axios.post('Orders/updateOrder',qs.stringify({
                orderId: orderId.value,
                orderState: orderState.value
            })).then(response =>{
                router.push({path:'/'});
            }).catch(error=>{
                console.error(error);
            })
        }
        


        return {
            user,
            discountNum,
            totalPrice,
            newpoint,
            orderId,
            orderState,
            point,
            tempOrders,
            updatePoint
        }
    }
};
</script>


<style>
/* 样式定义 */
.wrapper {
    width: 100%;
    height: 100%;
    background-color: #fefefe;
}

.wrapper header {
    width: 100%;
    height: 12vw;
    background-color: #0097FF;
    color: #fff;
    font-size: 4.8vw;
    /* position: fixed; */
    left: 0;
    top: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-header {
    text-align: center;
    margin-bottom: 20px;
}

.profile-picture {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 5px;
    margin-top: 10px;
}

.profile-details {
    padding: 10px 20px 10px 20px;
    background-color: #f3f3f3;
    border-radius: 3px;
    margin: 20px
}

.detail-item {
    margin-bottom: 10px;
}

.container {
    margin: 20px;
    background-color: #f3f3f3;
    /* display: flex; */
    /* justify-content: center;
    align-items: center; */
    /* height: 100vh; */
    /* 垂直方向上铺满整个视口高度 */
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
}

.paying-button {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: transparent;
    border: none;
    color: #585b5e;
    font-size: 16px;
    /* text-decoration: underline; */
    cursor: pointer;
    text-align: center;
}

/* 更多样式定义 */
</style>
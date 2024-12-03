<template>
    <div>
        <h1>Quản lý đơn hàng</h1>
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Customer ID</th>
                    <th>Order Date</th>
                    <th>Status</th>
                    <th>Total Amount</th>
                    <th>Shipping Address</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.id">
                    <td>{{ order.id }}</td>
                    <td>{{ order.customer_id }}</td>
                    <td>{{ formatDate(order.order_date) }}</td>
                    <td>
                        <select v-model="order.status" @change="updateOrderStatus(order)">
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </td>
                    <td>{{ order.total_amount.toFixed(2) }} VND</td>
                    <td>{{ order.shipping_address }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const orders = ref([])
const fetchOrders = async () => {
    try {
        const response = await axios.get("http://localhost:3000/orders");
        orders.value = response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
    }
};

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const updateOrderStatus = async (order) => {
    try {
        await axios.put(`http://localhost:3000/orders/${order.id}`, {
            ...order,
            status: order.status,
        });
        alert("Cập nhật trạng thái thành công!");
    } catch (error) {
        console.error("Error updating order status:", error);
        alert("Không thể cập nhật trạng thái đơn hàng.");
    }
};

onMounted(() => {
    fetchOrders();
});
</script>

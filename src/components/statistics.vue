<template>
    <div>
        <h2 class="page-title">Thống Kê</h2>

        <div class="chart-section">
            <h3>Thống Kê Sản Phẩm</h3>
            <canvas id="productChart"></canvas>
        </div>

        <div class="chart-section mt-4">
            <h3>Thống Kê Theo Danh Mục Sản Phẩm</h3>
            <canvas id="categoryChart"></canvas>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

onMounted(async () => {
    const response = await fetch('/db.json');
    const data = await response.json();

    const products = data.products;

    // Tính toán thống kê
    const productsInStock = products.filter(product => product.quantity > 0).length;
    const productsOutOfStock = products.filter(product => product.quantity === 0).length;

    const categoryStats = {};
    products.forEach(product => {
        if (!categoryStats[product.category]) {
            categoryStats[product.category] = 0;
        }
        categoryStats[product.category] += product.quantity;
    });

    const productChartCtx = document.getElementById('productChart').getContext('2d');
    new Chart(productChartCtx, {
        type: 'pie',
        data: {
            labels: ['Còn hàng', 'Hết hàng'],
            datasets: [{
                data: [productsInStock, productsOutOfStock],
                backgroundColor: ['#36a2eb', '#ff6384'],
            }]
        },
        options: {
            responsive: true,
        }
    });

    const categoryChartCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryChartCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(categoryStats),
            datasets: [{
                label: 'Số lượng sản phẩm',
                data: Object.values(categoryStats),
                backgroundColor: '#4caf50',
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Danh mục' } },
                y: { title: { display: true, text: 'Số lượng' }, beginAtZero: true }
            }
        }
    });
});
</script>

<style scoped>
.page-title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    text-align: center;
    margin-bottom: 30px;
}

.chart-section {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    text-align: center;
}

.mt-4 {
    margin-top: 30px;
}
</style>

<template>
  <div id="app" class="container mt-4">
    <!-- Tiêu đề -->
    <h3 class="mb-3 text-center text-primary">Quản Trị Admin</h3>

    <div class="row">
      <!-- Menu dọc -->
      <div class="col-md-3">
        <div class="list-group">
          <router-link to="/create-post" class="list-group-item list-group-item-action">
            Quản Lý Sản Phẩm
          </router-link>
          <router-link to="/orders" class="list-group-item list-group-item-action">
            Quản Lý Đơn Hàng
          </router-link>
          <router-link to="/clients" class="list-group-item list-group-item-action">
            Quản Lý Khách Hàng
          </router-link>
          <router-link to="/statistics" class="list-group-item list-group-item-action">
            Thống Kê
          </router-link>
        </div>
      </div>

      <!-- Nội dung -->
      <div class="col-md-9">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

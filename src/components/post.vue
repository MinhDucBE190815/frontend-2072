<template>
  <div>
    <button @click="showAddProductForm" class="btn btn-success mb-3">Thêm Sản Phẩm</button>

    <div v-if="showForm" class="mb-3">
      <h3>{{ isEdit ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm' }}</h3>
      <form @submit.prevent="isEdit ? updateProduct() : addProduct()">
        <div class="form-group">
          <label for="name">Tên Sản Phẩm</label>
          <input v-model="currentProduct.name" type="text" class="form-control" id="name" required />
        </div>
        <div class="form-group">
          <label for="price">Giá</label>
          <input v-model="currentProduct.price" type="number" class="form-control" id="price" required />
        </div>
        <div class="form-group">
          <label for="category">Danh Mục</label>
          <input v-model="currentProduct.category" type="text" class="form-control" id="category" required />
        </div>
        <div class="form-group">
          <label for="quantity">Số Lượng</label>
          <input v-model="currentProduct.quantity" type="number" class="form-control" id="quantity" required />
        </div>
        <div class="form-group">
          <label for="description">Mô Tả</label>
          <textarea v-model="currentProduct.description" class="form-control" id="description" required></textarea>
        </div>
        <div class="form-group">
          <label for="image">Hình Ảnh</label>
          <input v-model="currentProduct.image" type="text" class="form-control" id="image" required />
        </div>
        <button type="submit" class="btn btn-primary mt-2">{{ isEdit ? 'Cập Nhật' : 'Thêm Mới' }}</button>
        <button @click="cancelEdit" type="button" class="btn btn-secondary mt-2 ms-2">Hủy</button>
      </form>
    </div>

    <table class="table table-bordered table-sm">
      <thead>
        <tr>
          <th>ID #</th>
          <th>Hình Ảnh</th>
          <th>Tên</th>
          <th>Mô Tả</th>
          <th>Giá</th>
          <th>Danh Mục</th>
          <th>Trạng Thái</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="({ id, name, price, image, category, description, quantity }, index) in products" :key="id">
          <td><b>#</b>{{ index + 1 }}</td>
          <td><img :src="image" alt="Product Image" width="100" height="100" /></td>
          <td>{{ name }}</td>
          <td>{{ description }}</td>
          <td>{{ price }} VND</td>
          <td>{{ category }}</td>
          <td>
            <span v-if="quantity > 0" class="badge bg-success">Còn Hàng</span>
            <span v-else class="badge bg-danger">Hết Hàng</span>
          </td>
          <td>
            <button @click="editProduct(id)" class="btn btn-warning me-2">Sửa</button>
            <button @click="deleteProduct(id)" class="btn btn-danger">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';

const products = reactive([]);
const showForm = ref(false);
const isEdit = ref(false);
const currentProduct = reactive({
  id: null,
  name: "",
  price: "",
  quantity: "",
  description: "",
  category: "",
  image: "",
});

onMounted(async () => {
  const response = await fetch('/db.json');
  const data = await response.json();
  products.push(...data.products);
});

const showAddProductForm = () => {
  showForm.value = true;
  isEdit.value = false;
  Object.assign(currentProduct, {
    id: null,
    name: "",
    price: "",
    quantity: "",
    description: "",
    category: "",
    image: "",
  });
};

const editProduct = (id) => {
  const product = products.find((p) => p.id === id);
  if (product) {
    showForm.value = true;
    isEdit.value = true;
    Object.assign(currentProduct, product);
  }
};

const addProduct = () => {
  const newProduct = { ...currentProduct, id: products.length + 1 };
  products.push(newProduct);
  cancelEdit();
};

const updateProduct = () => {
  const index = products.findIndex((p) => p.id === currentProduct.id);
  if (index !== -1) {
    products[index] = { ...currentProduct };
  }
  cancelEdit();
};

const deleteProduct = (id) => {
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
  }
};

const cancelEdit = () => {
  showForm.value = false;
  isEdit.value = false;
};
</script>

<style scoped>
/* CSS tùy chỉnh để làm đẹp bảng */
table {
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
}

th,
td {
  text-align: center;
  padding: 10px;
}

th {
  background-color: #f8f9fa;
}

img {
  border-radius: 8px;
}
</style>

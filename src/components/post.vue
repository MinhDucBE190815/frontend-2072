<template>
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
        <textarea v-model="currentProduct.Description" class="form-control" id="description" required></textarea>
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
      <tr v-for="({ id, name, price, image, category, Description, quantity }, index) in products" :key="id">
        <td><b>#</b>{{ index + 1 }}</td>
        <td><img :src="image" alt="Product Image" width="100" height="100" /></td>
        <td>{{ name }}</td>
        <td>{{ Description }}</td>
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
</template>

<script setup>
import { reactive, ref } from "vue";

const products = reactive([
  {
      id: 1,
      name: "Laptop",
      price: 15000000,
      quantity: 5,
      Description: "Máy tính xách tay phù hợp công việc văn phòng và học tập.",
      category: "Electronics",
      inStock: true,
      image: "https://picsum.photos/id/1/300/300",
  },
  {
      id: 2,
      name: "Phone",
      price: 8000000,
      quantity: 12,
      Description: "Điện thoại thông minh với nhiều tính năng tiện ích.",
      category: "Electronics",
      inStock: true,
      image: "https://picsum.photos/id/2/300/300",
  },
  {
      id: 3,
      name: "Headphone",
      price: 2000000,
      quantity: 0,
      Description: "Tai nghe chất lượng cao với âm thanh sống động.",
      category: "Accessories",
      inStock: false,
      image: "https://picsum.photos/id/3/300/300",
  },
  {
      id: 4,
      name: "Tablet",
      price: 12000000,
      quantity: 8,
      Description: "Máy tính bảng với màn hình sắc nét, phù hợp cho giải trí.",
      category: "Electronics",
      inStock: true,
      image: "https://picsum.photos/id/4/300/300",
  },
  {
      id: 5,
      name: "Camera",
      price: 18000000,
      quantity: 4,
      Description: "Máy ảnh chuyên nghiệp dành cho nhiếp ảnh gia.",
      category: "Photography",
      inStock: true,
      image: "https://picsum.photos/id/5/300/300",
  },
  {
      id: 6,
      name: "Smartwatch",
      price: 5000000,
      quantity: 15,
      Description: "Đồng hồ thông minh hỗ trợ sức khỏe và kết nối điện thoại.",
      category: "Accessories",
      inStock: true,
      image: "https://picsum.photos/id/6/300/300",
  },
  {
      id: 7,
      name: "Keyboard",
      price: 1000000,
      quantity: 10,
      Description: "Bàn phím cơ với đèn LED RGB, thích hợp cho game thủ.",
      category: "Accessories",
      inStock: true,
      image: "https://picsum.photos/id/7/300/300",
  },
  {
      id: 8,
      name: "Speaker",
      price: 3000000,
      quantity: 3,
      Description: "Loa bluetooth âm thanh chất lượng cao, phù hợp mọi không gian.",
      category: "Audio",
      inStock: true,
      image: "https://picsum.photos/id/8/300/300",
  },
  {
      id: 9,
      name: "Monitor",
      price: 7000000,
      quantity: 6,
      Description: "Màn hình máy tính 24 inch, hỗ trợ độ phân giải Full HD.",
      category: "Electronics",
      inStock: true,
      image: "https://picsum.photos/id/9/300/300",
  },
]);


const showForm = ref(false);
const isEdit = ref(false);
const currentProduct = reactive({
  id: null,
  name: "",
  price: "",
  quantity: "",
  Description: "",
  category: "",
  image: "",
});

const showAddProductForm = () => {
  showForm.value = true;
  isEdit.value = false;
  Object.assign(currentProduct, {
    id: null,
    name: "",
    price: "",
    quantity: "",
    Description: "",
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

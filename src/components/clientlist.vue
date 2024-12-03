<template>
  <div>
    <h1>Quản lý khách hàng</h1>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>{{ client.id }}</td>
          <td>{{ client.name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.phone }}</td>
          <td>{{ client.address }}</td>
          <td>
            <button @click="editClient(client.id)">Sửa</button>
            <button @click="deleteClient(client.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const clients = ref([]);

const fetchClients = async () => {
  try {
    const response = await axios.get("http://localhost:3000/clients");
    clients.value = response.data;
  } catch (error) {
    console.error("Error fetching clients:", error);
  }
};

const deleteClient = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/clients/${id}`);
    clients.value = clients.value.filter(client => client.id !== id);
    alert("Xóa khách hàng thành công!");
  } catch (error) {
    console.error("Error deleting client:", error);
    alert("Không thể xóa khách hàng.");
  }
};

const editClient = (id) => {
  const client = clients.value.find(client => client.id === id);
  if (client) {
    const updatedName = prompt("Nhập tên mới:", client.name);
    if (updatedName !== null) {
      updateClient(id, { ...client, name: updatedName });
    }
  }
};

const updateClient = async (id, updatedClient) => {
  try {
    await axios.put(`http://localhost:3000/clients/${id}`, updatedClient);
    const index = clients.value.findIndex(client => client.id === id);
    if (index !== -1) clients.value[index] = updatedClient;
    alert("Cập nhật khách hàng thành công!");
  } catch (error) {
    console.error("Error updating client:", error);
    alert("Không thể cập nhật khách hàng.");
  }
};

onMounted(() => {
  fetchClients();
});
</script>
<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

table,
th,
td {
  border: 1px solid #ddd;
}

th,
td {
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}

button:first-child {
  background-color: #007bff;
  color: #fff;
}

button:last-child {
  background-color: #ff4d4d;
  color: #fff;
}
</style>

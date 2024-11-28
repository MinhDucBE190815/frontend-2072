<script setup>
import {ref} from 'vue'
const count = ref(0);

const tang = () => {
    count.value++;
}  ;
const giam = () => {
    count.value--;
}  ;
const reset = () => {
    count.value = 0;
}  ;
 
const isChecked = ref(false);
  const checkedNames = ref([]);
  const gender = ref('');
  const selectedFruit = ref('Apple');
  const message = ref('');
  
</script>
<template>
 <h1>So {{ count }}</h1>
 <button @click="tang" >Tang 2</button>
 <button @click="giam">  Giam</button>
 <button @click="reset">Reset</button>
 <div>
      <label>
        <input type="checkbox" v-model="isChecked">
        Chấp nhận điều khoản
      </label>
      <p>Trạng thái: {{ isChecked ? 'Đã chấp nhận' : 'Chưa chấp nhận' }}</p>
    </div>
    <div>
      <input type="checkbox" value="HTML" v-model="checkedNames">
      HTML <br>
      <input type="checkbox" value="CSS" v-model="checkedNames">
      CSS <br>
      <input type="checkbox" value="JavaScript" v-model="checkedNames">
      JavaScript <br>
      <p>Ngôn ngữ bạn chọn: {{ checkedNames.join(', ') }}</p>
    </div>
    <div>
      <input type="radio" value="Male" v-model="gender"> Nam <br>
      <input type="radio" value="Female" v-model="gender"> Nữ <br>
      <p>Giới tính của bạn là: {{ gender }}</p>
    </div>
    <div>
      <label for="fruit">Chọn loại trái cây: </label>
      <select id="fruit" v-model="selectedFruit">
        <option value="Apple">Táo</option>
        <option value="Banana">Chuối</option>
        <option value="Orange">Cam</option>
      </select>
      <p>Trái cây bạn chọn là: {{ selectedFruit }}</p>
    </div>

</template>

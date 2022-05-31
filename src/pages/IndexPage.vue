<template>
  <q-page>
    <h5>Home Page</h5>
    Go To: <router-link class="mylink" to="/chips">Chips Page</router-link>
    <div class="q-ml-lg">

      <TRDatePicker
          class="q-ml-md"
        :value="idate"
        dense
        @input="idate=$event"
      />


      <br><br>
      MyQDatePicker version:

      <MyQDatePicker
          v-model="idate"
      />


      <br><br>

      RAW Qinput QDate type:
      <q-input filled v-model="idate" mask="date" :rules="['date']">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy cover transition-show="scale" transition-hide="scale">
              <q-date v-model="idate">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>

    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import {  ref } from 'vue';
import TRDatePicker from "components/TRDatePicker.vue";
import MyQDatePicker from "components/MyQDatePicker.vue";

//    const todos = ref<Todo[]>([
const meta = ref<Meta>({  totalCount: 1200 });

const idate = ref<string>('2019-10-05')


</script>

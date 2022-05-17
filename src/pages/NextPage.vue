<template>
  <q-oage>
    <h3>Next Page</h3>
    <div>
      MyVersion is {{ myVerNum }} and Str {{ myVerStr }}

      <q-btn>Thanks !!</q-btn>
    </div>
  </q-oage>
</template>
<script setup lang="ts">
import {Ref,ref} from 'vue'
const myVerNum: Ref<number> = ref(1.23)
const myVerStr: Ref<string> = ref(myVerNum.value + '.4.56a')
</script>

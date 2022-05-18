<template>
  <q-oage>
    <h3>Next Page</h3>
    <div>
      MyVersion is {{ myVerNum }} and Str {{ myVerStr }}

      <q-btn>Thanks !!</q-btn>

      <q-space></q-space>

      <QSelectChips
        :value="tags"
        :items="tagItems"
        @input="onTagInput"
        @drop="onTagDrop"
      />

      <div>

        <q-select
          label="Tags:"
          filled
          v-model="tagsArray"
          :options="tagItems"
          use-input
          use-chips
          multiple
          hide-dropdown-icon
          input-debounce="200"
          new-value-mode="add-unique"
          style="width: 250px"
        />
      </div>
    </div>
  </q-oage>
</template>
<script setup lang="ts">
import {Ref,ref} from 'vue'

import QSelectChips from "components/QSelectChips.vue";

const myVerNum: Ref<number> = ref(1.23)
const myVerStr: Ref<string> = ref(myVerNum.value + '.4.56a')

const tagItems = ref([ 'red', 'green', 'drums', 'bass', 'piano', 'guitar', 'used', 'new'
])
const tags = ref('blue guitar new')

const tagsArray = ref(['blue','guitar','new'])

const onTagDrop = (evt: string) => {
  alert('tag dropped = ' + evt)
}

const onTagInput = (evt: string) => {
  alert('tag added = ' + evt)
}

</script>

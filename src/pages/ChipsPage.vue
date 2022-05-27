<template>
  <q-page>
    <h5>Chips Page</h5>
    <router-link class="mylink" to="/">Go HOME</router-link>
    <div class="q-mt-lg">

      <div>
        <b>QselectChips version:</b>
        <QSelectChips
          v-model="tags"
          label="Enter tags for this object:"
          :items="tagItems"
          style="width: 40em"
          @input="onTagInput"
          @drop="onTagDrop"
        />
        v-model: {{tags}}
      </div>

      <div class="q-my-lg">
        <b>QSelect raw version:</b>
        <q-select
          label="Tags:"
          filled
          v-model="tagsArray"
          :options="options"
          use-input
          use-chips
          multiple
          hide-hint
          hide-bottom-space
          input-debounce="200"
          new-value-mode="add-unique"
          style="width: 500px"
          @filter="filterFn"
          @new-value="addNew"
        />
        v-model {{ tagsArray }}
      </div>

    </div>
  </q-page>
</template>
<script setup lang="ts">
import {Ref,watch,ref} from 'vue'
import {useExampleStore} from "stores/example-store";
import QSelectChips from "components/QSelectChips.vue";

const exStore = useExampleStore()

const myVerNum: Ref<number> = ref(1.23)
const myVerStr: Ref<string> = ref(myVerNum.value + '.4.56a')

const tagItems = exStore.tags

/*
    ref([ 'red', 'green', 'drums', 'bass', 'piano', 'guitar', 'used', 'new',
 'bassoon', 'trumpet', 'violin', 'trombone'
])
*/

const options = ref(tagItems.value)

const tags = ref('blue guitar new')

const tagsArray = ref( tags.value.split(' ') )

watch( tags, () => {
  tagsArray.value = tags.value.split(' ')
})

const onTagDrop = (evt: any) => {
  alert('tag dropped = ' + evt.value)
  exStore.dropTag( evt.value )
}

const onTagInput = (evt: string) => {
  alert('tag added = ' + evt)
}

const filterFn = (val: string, update: Function) => {
  if (val === '') {
    update(() => {
       options.value = tagItems.value
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options.value = tagItems.value.filter(v => v.toLowerCase().indexOf(needle) > -1)
  })
}

function addNew (val: string, done: Function): void {
  // specific logic to eventually call done(...) -- or not
  done(val, 'add-unique')
  options.value = [...options.value, val]
  tagItems.value = [...options.value]
  // done callback has two optional parameters:
  //  - the value to be added
  //  - the behavior (same values of new-value-mode prop,
  //    and when it is specified it overrides that prop –
  //    if it is used); default behavior (if not using
  //    new-value-mode) is to add the value even if it would
  //    be a duplicate
}

</script>

<template>
  <q-select
    v-if="items && items.length"
    v-model="valueArray"
    :value="taginput"
    :label="label"
    :options="tagOptions"
    :disable="disable"
    class="tags-input"
    filled
    use-chips
    use-input
    hide-hint
    hide-bottom-space
    multiple
    new-value-mode="add-unique"
    dense="dense"
    input-debounce="200"
    @filter="filterTags"
    @remove="removeItem"
    @add="addItem"
    @new-value="createTag"
    @input="inputEvent"
  >
  </q-select>
</template>

<script setup lang="ts">
import {ref,Ref,computed,watch,onMounted} from 'vue'

const props = defineProps({
  mvalue: {
    type: String,
  },
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: 'Enter tags:'
  },
  items: {
    type: Array
  },
  arraySeparator: {
    type: String,
    default: ' '
  },
  disable: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  },
  returnString: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['input','drop','update:modelValue'])

const valueArray: Ref<string[]> = ref([])
const taginput = ref()
const tagOptions =  ref<string[]>([])

/*
watch( props.mvalue, syncValue,
  {
      immediate: true,
      deep: true
    }
)
*/
onMounted( () => {
  syncValue( props.modelValue )
})


function syncValue(val: any) {
  valueArray.value = str2Array( val )
  console.log('syncValue', val, 'valueArray', valueArray.value)
}

function str2Array( str: string ): string[] {
  return str.split( props.arraySeparator )
}

function array2Str( arr: string[] ): string {
  return arr.join( props.arraySeparator )
}

const valueStr = computed( () => array2Str( valueArray.value ) )

watch( valueStr, (vs) => {
  emits( 'update:modelValue', vs )
})

function filterTags( val: string, update: Function): void {
  update(() => {
    if ( !val.length ) {
      tagOptions.value = props.items as string[]
    } else {
      const needle = val.toLocaleLowerCase()
      tagOptions.value = props.items.filter( v => v.toLocaleLowerCase().includes( needle ) ) as string[]
    }
  })
}

function removeItem(val: any) {
  console.log('remove item', val)
}

function addItem(val: any) {
  console.log('add item', val)
}

function createTag(val: string, done: Function) {
  alert('createTag fired ' + val)
  // done(val,'add-unique')
/*
  this.$store.dispatch('data/addItem', { sprop: 'tags', item: val })
    .then( () => {
      done( val,'add-unique')
      console.log('added store tag', val)
    })
*/
}

function inputEvent( evt: any ): void {
//      console.log('input event', evt, this.array2Str(evt), this.valueArray)
  console.log('inputEvent', evt, valueArray.value )
  // emits('input', props.returnString ? array2Str( evt ) : evt )
}

</script>

<style scoped lang="scss">
.q-chip {
  background-color: pink !important;
}
</style>

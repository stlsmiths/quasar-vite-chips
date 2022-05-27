<template>
  <q-select
    v-if="items && items.length"
    v-model="valueArray"
    :label="label"
    :options="options"
    :disable="disable"
    ref="qselect"
    class="Items-input"
    filled
    use-chips
    use-input
    hide-hint
    hide-bottom-space
    multiple
    new-value-mode="add-unique"
    :dense="dense"
    input-debounce="200"
    @filter="filterItems"
    @remove="removeItem"
    @add="addItem"
    @new-value="newItem"
  />
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
    default: 'Enter items:'
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
    default: true
  },
  filterStartsWith: {
    type: Boolean,
    default: false
  },
  filterExclude: {
    type: Boolean,
    default: true
  },
  returnString: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['new-item','drop-item','add-item','update:modelValue'])

const valueArray: Ref<string[]> = ref([])
const taginput = ref()
const options =  ref<string[]>([])
const qselect = ref()

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


const propsOptions = computed( () => props.filterExclude
  ? props.items.filter( i => valueArray.value.indexOf(i) === -1)
  : props.items
)

watch(
  propsOptions,
  (vals) => options.value = [...vals],
  {immediate: true}
)

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

function resetVal() {
  qselect.value.updateInputValue('')
  qselect.value.filter('')
}

function filterItems( val: string, update: Function): void {
  update(() => {
    const opts = propsOptions.value
    if ( !val.length ) {
      options.value = opts
    } else {
      const needle = val.toLocaleLowerCase()
      options.value = opts.filter( v => {
        let rtn = false
        if (props.filterStartsWith ) {
          rtn = v.toLocaleLowerCase().startsWith(needle)
        } else {
          rtn = v.toLocaleLowerCase().includes(needle)
        }
        return rtn
      }) as string[]
    }
  })
}

function removeItem(val: any) {
  // console.log('remove item', val)
  emits('drop-item', val)
}

function addItem(val: any) {
  // console.log('add item', val)
  resetVal()
  emits('add-item', val )
}

function newItem(val: string, done: Function) {
  // alert('createTag fired ' + val)
  resetVal()
  emits('new-item', val)
  done(val,'add-unique')
}

</script>

<style scoped lang="scss">
.q-chip {
  background-color: pink !important;
}
</style>

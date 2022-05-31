<template>
    <q-input
       filled
       v-model="dateStr"
       :label="label"
       ref="qinput"
       :hint="hint"
       hide-hint
       :dense="dense"
       mask="####-##-##"
       :disable="disable"
       :lazy-rules="required"
       :rules="[ val => val && val.length > 0 || 'Entry is required']"
       @change="onChange"
      >
      <template v-slot:append>
        <q-icon name="event" class="cursor-pointer">
          <q-popup-proxy ref="qDateProxy" v-model="qpshow" transition-show="scale" transition-hide="scale">
            <q-date v-model="dateStr"
                    minimal
                    mask="YYYY-MM-DD"
                    @update:model-value="onDateUpdate"
                    >
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Close" color="primary" flat />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
</template>

<script setup lang="ts">
import { ref,computed, watch, onMounted} from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
  },
  label: {
    type: String,
    default: 'Enter a Date'
  },
  hint: {
    type: String,
    default: 'YYYY-MM-DD format'
  },
  dense: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['input','update:model-value'])

const dateStr = ref<string|null>(null)
const qpshow = ref<boolean>(false)
const qinput = ref<any>(null)

watch(
    () => props.modelValue,
    (val) => {
      dateStr.value = props.modelValue
    },
    {immediate: true}
)

function changeValue( val ) {
  // console.log('changeVal', val, dateStr.value )
  dateStr.value = val
  emits('update:model-value', dateStr.value)
  qinput.value.blur()
  qpshow.value = false
}

function onDateUpdate(evt) {
  // console.log('dateinput', evt)
  changeValue(evt)
}

function onChange(evt) {
  // console.log('change', evt)
  changeValue(evt)
}
</script>

<style scoped>

</style>

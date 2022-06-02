<template>
    <div v-if="editingMode">
      <q-editor
        v-model="lvalue"
        class="note-link-editor"
        :disable="disable"
        :definitions="editorDefs"
        :toolbar="editorFullToolbar"
        :min-height="minHeight"
        :max-height="maxHeight"
        :fonts="{
          arial: 'Arial',
          arial_black: 'Arial Black',
          comic_sans: 'Comic Sans MS',
          courier_new: 'Courier New',
          impact: 'Impact',
          lucida_grande: 'Lucida Grande',
          times_new_roman: 'Times New Roman',
          verdana: 'Verdana'
        }"
        toolbar-push
        @input="inputNote"
        @update:model-value="updateNote"
      />
    </div>
    <div v-else>
      <q-card flat
              bordered
              class="note-display"
        style="min-height: 4rem;max-height: 20rem; overflow-y: scroll"
      >
        <q-card-section v-html="lvalue" />
      </q-card>
    </div>
</template>

<script setup lang="ts">
import {ref,watch,watchEffect} from "vue";
import {useQuasar} from "quasar";

// import {mapGetters} from "vuex";
// import {linkReplacer} from "src/common/link-replacer";

function linkReplacer( val, vfun) {
  console.log('linkreplacer mock', val, vfun)
  return val
}

const props = defineProps({
  modelValue: {
    type: String,
  },
  minHeight: {
    type: String,
    default: '5rem'
  },
  maxHeight: {
    type: String,
    default: '20rem'
  },
  disable: {
    type: Boolean,
    default: false
  },
  editingMode: {
    type: Boolean,
    default: true
  },
})

const emits = defineEmits(['input','update:model-value'])

const q = useQuasar()
const lvalue = ref()

const editorDefs = ref({
  checkLinks: {
    tip: 'Check Links',
    icon: 'construction',
    label: 'Check Links',
    handler: checkLinks
  },

  // copied from Quasar GH
  // https://github.com/quasarframework/quasar/blob/dev/ui/src/components/editor/QEditor.js
  myIndent: {
    type: 'no-state',
    disable: vm => vm.caret && !vm.caret.can('indent'),
    cmd: 'indent',
    icon: q.iconSet.editor.indent,
    tip: 'Indent',
    key: 84 // ctrl-T
  },
  myOutdent: {
    type: 'no-state',
    disable: vm => vm.caret && !vm.caret.can('outdent'),
    cmd: 'outdent',
    icon: q.iconSet.editor.outdent,
    tip: 'Outdent',
    key: 82 // ctrl-R
  },
})

const editorFullToolbar = ref([
  ['unordered', 'ordered', 'myOutdent', 'myIndent', 'link'],
  [
     {
        label: q.lang.editor.formatting,
        icon: q.iconSet.editor.formatting,
        list: 'no-icons',
        options: [ 'p','h1','h2','h3','h4','h5','h6','code' ]
      },

    {
      label: q.lang.editor.align,
      icon: q.iconSet.editor.align,
      fixedLabel: true,
      list: 'only-icons',
      options: ['left', 'center', 'right', 'justify']
    },
  ],
  [ 'bold', 'italic', 'strike', 'underline' ],
  [ 'token', 'hr', 'quote' ],
  [ 'print', 'fullscreen'],
  [ 'undo', 'redo'],
  [
    {
      label: q.lang.editor.fontSize,
      icon: q.iconSet.editor.fontSize,
      fixedLabel: true,
      fixedIcon: true,
      list: 'no-icons',
      options: [ 'size-1','size-2', 'size-3','size-4','size-5','size-6','size-7' ]
    },
    {
      label: q.lang.editor.defaultFont,
      icon: q.iconSet.editor.font,
      fixedIcon: true,
      list: 'no-icons',
      options: [ 'default_font', 'arial', 'arial_black','comic_sans', 'courier_new',
        'impact','lucida_grande','times_new_roman', 'verdana'
      ]
    },
    'removeFormat'
  ],
  ['viewsource','checkLinks']
])

function linkByKey() {

}

/*
  watch: {
    value: {
      handler: 'updateValue',
      immediate: true
    }
  },
*/

watchEffect( () => {
  if ( props.modelValue ) {
    updateValue(props.modelValue)
  }
})

function updateValue( val ) {
  lvalue.value = val
}

function inputNote( val ) {
  console.log('inputNote', val)
  // emits('input', val )
}

function updateNote( val ) {
  console.log('updateNote', val)
  // emits('input', val )
  emits('update:model-value', val)
}

function checkLinks( evt, arg ) {
  console.log('checklinks', evt, arg)
/*
  const sel = document.getSelection()
  console.log('getSelection', sel )
*/
  lvalue.value = linkReplacer( lvalue.value, linkByKey )
}
</script>

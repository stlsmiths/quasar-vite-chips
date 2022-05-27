<template>
  <div>
    <div v-if="editingMode">
      <q-editor
        :value="model"
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
        @input="updateNote"
      />
    </div>
    <div v-else>
      <q-card flat
              bordered
              class="note-display"
        style="min-height: 4rem;max-height: 20rem; overflow-y: scroll"
      >
        <q-card-section v-html="model" />
      </q-card>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {linkReplacer} from "src/common/link-replacer";

export default {
  name: 'TRNoteEditor',
  props: {
    value: {
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
  },
  data () {
    return {
      model: null,
      editorDefs: {
        checkLinks: {
          tip: 'Check Links',
          icon: 'construction',
          label: 'Check Links',
          handler: this.checkLinks
        },

        // copied from Quasar GH
        // https://github.com/quasarframework/quasar/blob/dev/ui/src/components/editor/QEditor.js
        myIndent: {
          type: 'no-state',
          disable: vm => vm.caret && !vm.caret.can('indent'),
          cmd: 'indent',
          icon: this.$q.iconSet.editor.indent,
          tip: 'Indent',
          key: 84 // ctrl-T
        },
        myOutdent: {
          type: 'no-state',
          disable: vm => vm.caret && !vm.caret.can('outdent'),
          cmd: 'outdent',
          icon: this.$q.iconSet.editor.outdent,
          tip: 'Outdent',
          key: 82 // ctrl-R
        },
      },

      editorFullToolbar:  [
        ['unordered', 'ordered', 'myOutdent', 'myIndent', 'link'],
        [
           {
              label: this.$q.lang.editor.formatting,
              icon: this.$q.iconSet.editor.formatting,
              list: 'no-icons',
              options: [ 'p','h1','h2','h3','h4','h5','h6','code' ]
            },

          {
            label: this.$q.lang.editor.align,
            icon: this.$q.iconSet.editor.align,
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
            label: this.$q.lang.editor.fontSize,
            icon: this.$q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [ 'size-1','size-2', 'size-3','size-4','size-5','size-6','size-7' ]
          },
          {
            label: this.$q.lang.editor.defaultFont,
            icon: this.$q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [ 'default_font', 'arial', 'arial_black','comic_sans', 'courier_new',
              'impact','lucida_grande','times_new_roman', 'verdana'
            ]
          },
          'removeFormat'
        ],
        ['viewsource','checkLinks']
        ]
    }
  },
  computed: {
    ...mapGetters('data',['linkByKey'])
  },
  watch: {
    value: {
      handler: 'updateValue',
      immediate: true
    }
  },
  methods: {

    updateValue( val ) {
      this.model = val
    },

    updateNote( val ) {
      this.$emit('input', val )
    },

    checkLinks( evt, arg ) {
      console.log('checklinks', evt, arg)
/*
      const sel = document.getSelection()
      console.log('getSelection', sel )
*/
      this.model = linkReplacer( this.model, this.linkByKey )
    }
  },
}
</script>

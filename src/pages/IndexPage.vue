<template>
  <q-page>
    <h5>Home Page</h5>
    Go To: <router-link class="mylink" to="/chips">Chips Page</router-link>

    <div class="q-ml-lg">
      <h6>Date Picker Components:</h6>
      <div class="row">
        <div class="col-3">
          MyQDatePicker version:
          <MyQDatePicker
              v-model="idate"
              :hint="null"
              style="width: 15rem"
          />
        </div>
        <div class="col-3">
          <MyQDatePicker
              v-model="ndate"
              label="Initial null date"
              :init-today="true"
          />
        </div>
        <div class="col-3">
          RAW Qinput QDate type:
          <q-input
              v-model="idate"
              style="width: 15rem"
              filled
              mask="date"
              :rules="['date']">
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
      </div>

    </div>

    <div class="q-ml-md">
      <h6>AutoComplete Components:</h6>
      <div class="row">
        <div class="col-3">
          <MyQAutoComp
            v-model="acvalue"
            :items="accts"
            label="Account Selector ..."
            option-label="aname"
            option-value="aid"
            :emit-value="true"
            @update:model-value="updateAcct"
          />
          acvalue {{ acvalue }}
        </div>
        <div class="col-3">

        </div>
      </div>

      <div>
        Note Editor:
        <MyQEditor
          v-model="note"
          @update:model-value="updateNote"
        />
        note {{ note }}
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { Todo, Meta } from 'components/models';
import { ref } from 'vue';
import TRDatePicker from "components/TRDatePicker.vue";
import MyQDatePicker from "components/MyQDatePicker.vue";
import MyQAutoComp from "components/MyQAutoComp.vue";

import {useExampleStore} from "stores/example-store";
import MyQEditor from "components/MyQEditor.vue";

const exStore = useExampleStore()

//    const todos = ref<Todo[]>([
const meta = ref<Meta>({  totalCount: 1200 });

const idate = ref<string>('2019-10-05')
const ndate = ref<string|null>()

const accts = exStore.accounts
const acvalue = ref<any>(exStore.activeAcct)

const note = ref(exStore.note)
// const note = exStore.note

function updateAcct(evt) {
  console.log('update acct fired', evt)
  exStore.setAccount( evt )
}

function updateNote(evt) {
  console.log('update note fired', evt)
  exStore.note = evt
}

</script>

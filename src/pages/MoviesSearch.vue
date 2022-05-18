<template>
  <q-page>
    <h5>Movies Search</h5>
    <div class="row vertical-middle">
      <div class="col-3">
        <q-input
            label="Enter search term"
            v-model="search"
            @keyup.enter="fetchTest"
        />
      </div>
      <div class="col">
        <q-btn @click="search=''">Clear</q-btn>
      </div>
    </div>
    <br>{{ searchPrep }}

    <div class="q-mt-lg" v-if="search">
      Get movies:
      <q-btn @click="fetchTest">Fetch test</q-btn>

      <div v-if="results.length">
        Returned {{ results.length }} movies
        <div class="row">
          <div class="col-6">
            <q-list>
              <q-item v-for="r in results"
                      :key="r.trackId"
                      clickable
                      @click="selected = r"
                      style="max-width: 500px"
              >
                <q-item-section avatar>
                  <img :src="r.artworkUrl100" width="100" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>
                    <span class="text-bold text-amber-6">{{ r.trackName }}</span>
                    ( {{ stripDate(r.releaseDate) }} )</q-item-label>
                  <q-item-label caption>{{ r.shortDescription }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
          <div v-if="selected" class="col">
            <div>
              <h5>{{ selected?.trackName }}</h5>
            </div>
            <div>Release Date: {{ selected.releaseDate }}</div>
            <div>
              <q-video
                  ratio="16/9"
                  style="height: 300px"
                  :src="selected.previewUrl"
              />
            </div>
            <div class="q-my-lg">
              {{ selected.longDescription }}
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        No results returned !!
      </div>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import {ref,Ref,computed} from 'vue'
import {api} from "boot/axios";
import { ItunesResp } from "components/models";

const search = ref('')
const results = ref<ItunesResp[]>([])
const selected: Ref<ItunesResp | undefined> = ref()

const fields = 'trackId,collectionName,collectionViewUrl,longDescription,artworkUrl100,shortDescription,trackName,trackViewUrl,previewUrl,releaseDate'

const searchPrep = computed(() => search.value.replaceAll(' ', '+') )
const stripDate = (d) => d.substring(0,10)

const mapFields = (data: object) => {
  let obj = {} as ItunesResp
  if (data) {
    fields.split(',').forEach( (f: string) => {
      obj[f] = data[f]
      if ( f === 'releaseDate' ) {
        obj[f] = stripDate(data[f])
      }
    })
  }
  return obj
}

async function fetchTest() {
  const resp = await api.get(`/search?term=${searchPrep.value}&limit=20&country=US&media=movie`)

  if ( resp.data?.results ) {
    console.log('response', resp)
    results.value = resp.data.results.map( d => mapFields(d as ItunesResp) ) //.map( d => )
  } else {
    results.value = []
  }
}

</script>

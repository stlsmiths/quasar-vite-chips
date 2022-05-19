<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawerOpen = !drawerOpen"
        />

        <q-toolbar-title>
          <router-link
            class="no-link"
            to="/">
            Quasar App
          </router-link>
        </q-toolbar-title>
        <q-space/>
        <q-btn
            label="Movies"
            to="/movies"
        />
        <q-btn
          label="Chips"
          to="/chips"
        />


        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

// remember defineProps and defineEmits .. no import reqd

// also ts only defineProps ... https://vuejs.org/api/sfc-script-setup.html#typescript-only-features


const essentialLinks = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Vue JS',
    caption: 'Vue 3 Guide',
    icon: 'record_voice_over',
    link: 'https://vuejs.org/guide/introduction.html'
  },
];

const drawerOpen = ref(false)
const viz = ref(false)

nextTick( () => {
  drawerOpen.value = false
  viz.value = true
})
</script>
<style>
.no-link {
  color: white;
  text-decoration: none;
}
</style>

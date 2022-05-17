<template>
  <div>
    <p>{{ title }}</p>
    <ul>
      <li v-for="todo in todos" :key="todo.id" @click="increment">
        {{ todo.id }} - {{ todo.content }}
      </li>
    </ul>
    <p>Count: {{ todoCount }} / {{ meta.totalCount }}</p>
    <p>Active: {{ active ? 'yes' : 'no' }}</p>
    <p>Clicks on todos: {{ clickCount }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef, Ref } from 'vue';
import { Todo, Meta } from './models';


function useClickCount() {
  const clickCount = ref(0);
  function increment() {
    clickCount.value += 1
    return clickCount.value;
  }

  return { clickCount, increment };
}

const { clickCount, increment } = useClickCount()


const props = defineProps<{
  title: string,
  todos?: Todo[]
  meta: Meta,
  active?: boolean
}>()

const todoCount = computed(() => props.todos.length);

function useDisplayTodo(todos: Ref<Todo[]>) {
  const todoCount = computed(() => todos.value.length);
  return { todoCount };
}

// const todoCount = computed(() => todos.value && Array.isArray(todos.value) ? todos.value.length) : null;
// const { todoCount } = useDisplayTodo( toRef(props, 'todos') )

</script>

<template>
  <div>
    <ul class="flex items-center mb-5 text-lg text-gray-700 bg-gray-50 shadow-md rounded">
      <li
        v-for="(item) in tabTitles"
        :key="item"
        :class="{ selected: item == selectedTitle }"
        @click="selectedTitle = item"
        @keydown="selectedTitle = item"
      >
        {{ item }}
      </li>
    </ul>
    <slot />
  </div>
</template>

<script>
import { ref, provide } from 'vue';

export default {
  setup(props, { slots }) {
    const tabTitles = ref(slots.default().map((tab) => tab.props.title));
    const selectedTitle = ref(tabTitles.value[0]);

    provide('selectedTitle', selectedTitle);
    return {
      selectedTitle,
      tabTitles,
    };
  },
};
</script>
<style scoped>
li {
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom-width: 3px;
  border-bottom-color: transparent;
}
li.selected {
  font-weight: bold;
  border-color: rgb(17 24 39 );
}
</style>

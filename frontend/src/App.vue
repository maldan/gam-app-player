<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  async mounted() {},
  methods: {},
  data: () => {
    return {
      apiUrl: process.env.VUE_APP_API_URL || `${window.location.origin}/api`,
    };
  },
});
</script>

<style lang="scss" scoped></style>

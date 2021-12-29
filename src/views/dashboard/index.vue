<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
  </div>
</template>

<script lang="ts">
import { mapState, useUserStore } from "@/store";

export default {
  name: "Dashboard",
  computed: {
    ...mapState(useUserStore, ["name"]),
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

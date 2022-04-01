<template>
  <div>
    <h2 class="microfront-title">Micro Frontend Atenea - Tabla de Líneas</h2>
    <TableCustomers />
    <SharedComponent
      style="margin-top: 50px;"
      :steps="[
        { name: 'Step One' },
        { name: 'Step Two' },
        { name: 'Step Three' },
      ]"
    />
  </div>
</template>

<script>
import TableCustomers from "./components/TableLines.vue";
import { defineAsyncComponent } from "vue";
// import { computed } from "vue";
// import { useStore } from "vuex";

export default {
  name: "App",
  components: {
    TableCustomers,
    SharedComponent: defineAsyncComponent(() =>
      import("MfeOne/SharedComponent")
    ),
  },
  setup() {
    // const store = useStore();

    // store.dispatch("getCustomers");

    return {};
  },
};
</script>

<style>
</style>

<template>
  <div class="home">
    <beer-list2 />
  </div>
</template>

<script>
// @ is an alias to /src
import BeerList2 from "@/components/BeerList2.vue";

export default {
  name: "home",
  components: {
    BeerList2
  }
};
</script>

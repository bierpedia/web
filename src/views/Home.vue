<template>
  <div class="home">
    <beer-list />
  </div>
</template>

<script>
// @ is an alias to /src
import BeerList from "@/components/BeerList.vue";

export default {
  name: "home",
  components: {
    BeerList
  }
};
</script>

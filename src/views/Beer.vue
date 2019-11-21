<template>
    <div>
      <div>{{ beer.name }} </div>
      <div v-html="beer.description"></div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
    components: {},
})
export default class Beer extends Vue {
  @Prop() private slug!: string;
  public beer: any = {};

  created() {
    axios.get("http://localhost:5000/api/v1/beers/" + this.slug).then((data) => {
      this.beer = data.data;
    });
  }
}
</script>

<style scoped lang="scss">


</style>
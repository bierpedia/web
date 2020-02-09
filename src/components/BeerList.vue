<template>
  <ul class="list">
    <div v-for="(item, $index) in list" :key="$index">
      <beer-list-item :beer="item" />
    </div>

    <infinite-loading @infinite="infiniteHandler"></infinite-loading>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BeerListItem from "@/components/BeerListItem.vue";
import axios from "axios";

@Component({
  components: { BeerListItem }
})
export default class BeerList extends Vue {
  @Prop() private name!: string;
  public list: Object[] = [];
  public nextUrl = "http://localhost:5000/api/v1/beers";

  infiniteHandler($state: any) {
    axios.get(this.nextUrl).then((data: any) => {
      if ("next" in data.data.links) {
        this.nextUrl = data.data.links.next;
        this.list.push(...data.data.result);
        $state.loaded();
      } else {
        $state.complete();
      }
    });
  }
}
</script>

<style scoped lang="scss"></style>

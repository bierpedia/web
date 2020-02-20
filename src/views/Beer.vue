<template>
  <div>
    <ApolloQuery
      :query="require('../queries/beer.gql')"
      :variables="{
        slug: slug,
      }"
    >
      <template slot-scope="{ result: { data, loading } }">
        <div v-if="loading">Loading...</div>
        <div v-else-if="data">
          <div>{{ data.beer.name }}</div>
          <div v-html="data.beer.description"></div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component({
  components: {}
})
export default class Beer extends Vue {
  @Prop() private slug!: string;
  
  
}
</script>

<style scoped lang="scss"></style>

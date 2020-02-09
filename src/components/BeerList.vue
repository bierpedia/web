<template>
  <div>
    <b-form-input v-model="filter" @input="onFilterChange" placeholder="Volltextsuche"></b-form-input>
    <b-form-checkbox
      id="orderDirection"
      v-model="direction"
      name="checkbox-order-direction"
      value="ASC"
      unchecked-value="DESC"
      @input="onFilterChange"
    > {{ direction }}
    </b-form-checkbox>
    <ul class="list">
      <div v-if="beers">
        <div v-for="beer in beers.edges" :key="beer.id">
          <beer-list-item :beer="beer.node" />
        </div>
      </div>
      <infinite-loading :identifier="infiniteId" @infinite="infiniteHandler"></infinite-loading>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BeerListItem from "@/components/BeerListItem.vue";
import axios from "axios";
import gql from "graphql-tag"

@Component({
  components: { BeerListItem },
  apollo: {
    beers: {
      query: gql`
        query beers(
          $offset: String!
          $filter: String!
          $direction: Direction!
        ) {
          beers(
            first: 10
            after: $offset
            orderBy: { field: NAME, direction: $direction }
            filter: $filter
          ) {
            edges {
              cursor
              node {
                id
                name
                slug
                breweries {
                  name
                }
                beerTypes {
                  name
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
      // Initial variables
      variables: {
        offset: "0",
        filter: "",
        direction: "ASC",
      },
      result ({ data, loading, networkStatus }) {
        this.offset = parseInt(data.beers.pageInfo.endCursor);
        if(!data.beers.pageInfo.hasNextPage) {
          this.hasNextPage = false;
        } else {
          this.hasNextPage = true;
        }
      },
    }
  }
})
export default class BeerList extends Vue {
  private offset: Number = 0;
  private filter: String = "";
  private infiniteId = 0;
  private hasNextPage = true;
  private direction: string = "ASC";

  infiniteHandler($state: any) {
    if (!this.hasNextPage) {
      $state.complete();
      return;
    }
    this.$apollo.queries.beers.fetchMore({
      variables: {
        offset: this.offset.toString(),
        filter: this.filter,
        direction: this.direction,
      },
      // Transform the previous result with new data
      updateQuery: (previousResult, { fetchMoreResult }) => {
        $state.loaded();
        
        let edges = previousResult ? 
          [...previousResult.beers.edges, ...fetchMoreResult.beers.edges] :
        fetchMoreResult.beers.edges;
      
        return {
          beers: {
            __typename: fetchMoreResult.beers.__typename,
            // Merging the edges
            edges: edges,
            pageInfo: fetchMoreResult.beers.pageInfo,
          },
        }
      },
    });
  }

  async onFilterChange() {
    await this.$apollo.queries.beers.refetch({
      offset: 0,
      filter: this.filter,
      direction: this.direction,
    });
    this.infiniteId++;
  }
}
</script>

<style scoped lang="scss">
</style>
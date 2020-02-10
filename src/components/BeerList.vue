<template>
  <div>
    <ApolloQuery
      :query="require('../queries/beers.gql')"
      :variables="{
        offset: 0,
        filter: '',
        direction: 'ASC'
      }"
      @result="onResult"
    >
      <template v-slot="{ result: { loading, error, data }, query }">
        <b-form-input
          v-model="filter"
          @input="onFilterChange(query)"
          placeholder="Volltextsuche"
        ></b-form-input>
        <b-form-checkbox
          id="orderDirection"
          v-model="direction"
          name="checkbox-order-direction"
          value="ASC"
          unchecked-value="DESC"
          @input="onFilterChange(query)"
        > {{ direction }}
        </b-form-checkbox>
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <ul class="list">
            <div v-for="beer in data.beers.edges" :key="beer.node.slug">
              <beer-list-item :beer="beer.node" />
            </div>
          </ul>
          <infinite-loading
            :identifier="infiniteId"
            @infinite="infiniteHandler($event, query)"
          ></infinite-loading>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import BeerListItem from "@/components/BeerListItem.vue";
import axios from "axios";
import gql from "graphql-tag";
import { SmartQuery } from "vue-apollo/types/vue-apollo";
import { ApolloQueryResult } from "apollo-boost";

@Component({
  components: { BeerListItem },
})
export default class BeerList extends Vue {
  private offset: Number = 0;
  private filter: String = "";
  private infiniteId = 0;
  private hasNextPage = true;
  private direction: string = "ASC";

  infiniteHandler($state: any, query: SmartQuery<any>) {
    if (!this.hasNextPage) {
      $state.complete();
      return;
    }
    query.fetchMore({
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

  async onFilterChange(query: any) {
    await query.refetch({
      offset: 0,
      filter: this.filter,
      direction: this.direction,
    });
    this.infiniteId++;
  }

  async onResult(result: any) {
      this.offset = parseInt(result.data.beers.pageInfo.endCursor);
      if(!result.data.beers.pageInfo.hasNextPage) {
        this.hasNextPage = false;
      } else {
        this.hasNextPage = true;
      }
    }
}
</script>

<style scoped lang="scss">
</style>
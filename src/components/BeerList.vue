<template>
  <div>
    <ApolloQuery
      :query="require('../queries/beers.gql')"
      :variables="{
        offset: '',
        filter: '',
        filter_low: '',
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
        >
          {{ direction }}
        </b-form-checkbox>
        <!-- Loading -->
        <!--div v-if="loading" class="loading apollo">Loading...</div-->

        <!-- Error -->
        <div v-if="error" class="error apollo">An error occurred</div>

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
import { ApolloQueryResult, FetchMoreQueryOptions, FetchMoreOptions, ObservableQuery } from "apollo-boost";
import { BeerConnection, BeerEdge, Maybe, Query, SortOperationKind } from '@/generated/graphql';
import Beer from '../views/Beer.vue';
import { Debounce } from 'vue-debounce-decorator'


@Component({
  components: { BeerListItem }
})
export default class BeerList extends Vue {
  private offset: string | null = null;
  private filter: string = '';
  private infiniteId = 0;
  private hasNextPage = true;
  private direction = SortOperationKind.Asc;

  infiniteHandler($state: any, query: SmartQuery<Query>) {
    if (!this.hasNextPage) {
      $state.complete();
      return;
    }

    query.fetchMore({
      variables: {
        offset: this.offset,
        filter: this.filter,
        filter_low: this.swapCaseFirstLetter(this.filter),
        direction: this.direction
      },
      // Transform the previous result with new data
      updateQuery: (previousResult: Query, { fetchMoreResult } : {fetchMoreResult?: Query}) => {
        $state.loaded();

        if(!previousResult.beers || !fetchMoreResult?.beers) {
          return; // or throw?
        }

        var edges: BeerEdge[] = [];
        if (previousResult.beers.edges) {
          edges.push(...previousResult.beers.edges);
        }

        if(fetchMoreResult.beers.edges) {
          edges.push(...fetchMoreResult.beers.edges);
        }

        return {
          beers: {
            __typename: previousResult.beers.__typename,
            // Merging the edges)
            edges: edges,
            pageInfo: fetchMoreResult.beers.pageInfo
          }
        };
      }
    });
  }

  @Debounce(150)
  async onFilterChange(query: any) {
    await query.refetch({
      offset: "",
      filter: this.filter,
      filter_low: this.swapCaseFirstLetter(this.filter),
      direction: this.direction
    });
    this.infiniteId++;
  }

  async onResult(result: any) {
    this.offset = result.data.beers.pageInfo.endCursor;
    if (!result.data.beers.pageInfo.hasNextPage) {
      this.hasNextPage = false;
    } else {
      this.hasNextPage = true; 
    }
  }

  swapCaseFirstLetter(text: string | null) {
    if (!text) {
      return text;
    }
    if (text.length == 0) {
      return text;
    }
    if (text[0] === text[0].toLowerCase()) {
      return text[0].toUpperCase() + text.slice(1, -1);
    }
    return text[0].toLowerCase() + text.slice(1, -1);
  } 
}
</script>

<style scoped lang="scss"></style>

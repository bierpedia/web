<template>
	<router-link :to="{ name: 'beer', params: { slug: beer.slug }}" class="float-left">
		<li>
			<div class="headshot mx-auto">
			<img
				class="attachment-thumbnail"
				alt="platzhalter"
				srcset="/assets/platzhalter-120x253.jpg, /assets/platzhalter-120x253@2x.jpg 2x"
			/>
			</div>
			<div class="ellipsis name">{{ beer.name }}</div>
			<div class="ellipsis">
				<span v-for="beerType of beer.beerTypes" :key="beerType.slug">{{ beerType.name }}</span>
			</div>
			<div class="ellipsis">
				<span v-for="brewery of beer.breweries" :key="brewery.slug">{{ brewery.name }}</span>
			</div>
			
		</li>
	</router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios from "axios";

@Component
export default class BeerListItem extends Vue {
	@Prop({ required: true }) private beer!: any;

}
</script>

<style scoped lang="scss">


a:hover, a:focus, a:active {
	text-decoration: none;
}

a {
	width: 50%;
	width: 100%;
}

@media(min-width:768px) {
	a {
		width: 50%;
	}
}

@media(min-width:992px) {
	a {
		width: 33.3%;
	}
}
	

li {
	margin: 10px;
	padding: 10px;
	background-color: #f0f0f0;
	border: 2px #f0f0f0 solid;
	text-align: center;
	transition: all 0.2s;
	-webkit-column-break-inside: avoid;
	page-break-inside: avoid;
	break-inside: avoid;
	list-style: none;
	color: #7f8d8c;
}
li:hover {
  border: 2px #f0f0f0 solid;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.26);
}

.ellipsis {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	height: 1.5em;
}
li:hover .ellipsis {
	white-space: nowrap;
	overflow: inherit; 
}

.ellipsis > span {
	margin-right: 10px;
}

.headshot {
  width: 120px;
  height: 120px;
  overflow: hidden;
  border-radius: 50%;
  display: block;
  pointer-events: none;
}
.headshot .note {
  transition: opacity 0.2s;
  opacity: 1;
  position: relative;
  top: 20px;
  left: 0;
  width: 100%;
  font-weight: 700;
  font-size: 50px;
  color: #24282d;
  text-align: center;
  z-index: 2;
}
.nach-komma {
  font-size: 60%;
}
.headshot img {
  position: relative;
  top: -75px;
  width: 120px;
  opacity: 0.5;
}
.headshot .note + img {
  top: -135px;
}
li:hover .headshot .note {
  opacity: 0;
}
li:hover .headshot img {
  opacity: 1;
}

.name {
  font-family: "Roboto Slab";
  font-weight: 400;
  color: #24282d;
  transition: all 0.2s;
}

li:hover .name {
  color: #ca3d00;
}
</style>

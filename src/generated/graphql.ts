export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  PaginationAmount: any,
  Decimal: any,
  MultiplierPath: any,
};

export type Beer = {
   __typename?: 'Beer',
  aBV: Scalars['Decimal'],
  averageGrade: Scalars['Decimal'],
  breweries: Array<Brewery>,
  concern: Concern,
  concernId: Scalars['Int'],
  description: Scalars['String'],
  name: Scalars['String'],
  ratingCount: Scalars['Int'],
  slug?: Maybe<Scalars['ID']>,
  styles: Array<Style>,
};

export type BeerConnection = {
   __typename?: 'BeerConnection',
  edges?: Maybe<Array<BeerEdge>>,
  nodes?: Maybe<Array<Maybe<Beer>>>,
  pageInfo: PageInfo,
  totalCount: Scalars['Int'],
};

export type BeerEdge = {
   __typename?: 'BeerEdge',
  cursor: Scalars['String'],
  node?: Maybe<Beer>,
};

export type BeerFilter = {
  AND?: Maybe<Array<BeerFilter>>,
  name?: Maybe<Scalars['String']>,
  name_contains?: Maybe<Scalars['String']>,
  OR?: Maybe<Array<BeerFilter>>,
};

export type BeerSort = {
  aBV?: Maybe<SortOperationKind>,
  averageGrade?: Maybe<SortOperationKind>,
  concernId?: Maybe<SortOperationKind>,
  description?: Maybe<SortOperationKind>,
  name?: Maybe<SortOperationKind>,
  slug?: Maybe<SortOperationKind>,
};

export type Brewery = {
   __typename?: 'Brewery',
  country: Country,
  description: Scalars['String'],
  name: Scalars['String'],
  slug?: Maybe<Scalars['ID']>,
};

export type BreweryConnection = {
   __typename?: 'BreweryConnection',
  edges?: Maybe<Array<BreweryEdge>>,
  nodes?: Maybe<Array<Maybe<Brewery>>>,
  pageInfo: PageInfo,
  totalCount: Scalars['Int'],
};

export type BreweryEdge = {
   __typename?: 'BreweryEdge',
  cursor: Scalars['String'],
  node?: Maybe<Brewery>,
};

export type Concern = {
   __typename?: 'Concern',
  beers: Array<Maybe<Beer>>,
  description: Scalars['String'],
  name: Scalars['String'],
  slug: Scalars['String'],
};

export type Country = {
   __typename?: 'Country',
  breweries: Array<Maybe<Brewery>>,
  description: Scalars['String'],
  name: Scalars['String'],
  slug: Scalars['String'],
};



export type PageInfo = {
   __typename?: 'PageInfo',
  endCursor?: Maybe<Scalars['String']>,
  hasNextPage: Scalars['Boolean'],
  hasPreviousPage: Scalars['Boolean'],
  startCursor?: Maybe<Scalars['String']>,
};


export type Query = {
   __typename?: 'Query',
  beers?: Maybe<BeerConnection>,
  breweries?: Maybe<BreweryConnection>,
};


export type QueryBeersArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['PaginationAmount']>,
  last?: Maybe<Scalars['PaginationAmount']>,
  order_by?: Maybe<BeerSort>,
  where?: Maybe<BeerFilter>
};


export type QueryBreweriesArgs = {
  after?: Maybe<Scalars['String']>,
  before?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['PaginationAmount']>,
  last?: Maybe<Scalars['PaginationAmount']>
};

export enum SortOperationKind {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type Style = {
   __typename?: 'Style',
  description: Scalars['String'],
  name: Scalars['String'],
  parent?: Maybe<Style>,
  slug?: Maybe<Scalars['ID']>,
};

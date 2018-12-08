import React from 'react'

export const columns = [
  {
    Header: "Trakt Id",
    id: "id",
    accessor: "id",
    width: 100,
    filterable: false
  },
  {
    Header: "Movie",
    id: "query",
    accessor: "title",
    filterable: true
  },
  {
    Header: "Year",
    id: "years",
    accessor: "year",
    width: 100,
    filterable: true
  },
  {
    Header: 'Rating',
    id: "ratings",
    accessor:"rating",
    width: 100,
    filterable: true
  },
  {
    Header: "Watcher Count",
    id: "watcherCount",
    accessor: "watcherCount",
    width: 150,
    filterable: false
  },
  {
    Header: "Runtime",
    id: "runtime",
    accessor: "runtime",
    width: 100,
    filterable: true

  },
  {
    Header: 'FanArt',
    id: "imgUrl",
    accessor: "imgUrl",
    width: 210,
    Cell: row => <img style={{ width:210, height:'auto' }} src={ row.value } />,
    filterable: false
  },
];
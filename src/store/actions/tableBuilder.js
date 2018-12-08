import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
import { apiConfig } from '../../assets/constants/apiConfig';


export const setData = (data) => {
    return {
        type: actionTypes.SET_DATA,
        data: data.rows,
        pages: data.pages,
        page: data.page,
        filtered: data.filtered
    };
};

export const fetchDataFailed = () => {
    return {
        type: actionTypes.FETCH_DATA_FAILED
    };
};

export const requestShows = () => {
   return {
       type: actionTypes.REQUEST_SHOWS,
   };
};

export const getData = (page = 1, filtered = []) => {
  return async dispatch => {
    dispatch(requestShows())
    let response
    try {
      response = await requestData(20, page, false, filtered)
      dispatch(setData(response));
    } catch (er) {
      dispatch(fetchDataFailed())
    }
  };
};


const requestData = async (pageSize, page, sorted, filtered) => {
  const params = { 
    page: page,
    limit: pageSize || 20,
    pagination: true,
    extended: 'full',
  };

  if (filtered && filtered.length) {
    for (const i in filtered) {
      params[filtered[i].id] = filtered[i].value
    }
  }

  let response = 
    await axios({
      method: 'get',
      url: filtered && 
        filtered.length ? 
        apiConfig.searchUrl : 
        apiConfig.defaultUrl,
      headers: {
        'Content-Type': 'application/json',
        'trakt-api-version': '2',
        'trakt-api-key': apiConfig.clientID,
      },
      params: params,
    });

  page = 
    parseInt(response.headers['x-pagination-page']);
  const totalRows =
    parseInt(response.headers['x-pagination-page-count']);

  const filterResponse =  
    await Promise.all(response.data.map(async function(item) {
      const url = apiConfig.imgUrl + item.show.ids.tmdb + '/images'
      const { show } = item
      let img
      try {
        if (item.show.ids.tmdb) {
          img = await axios.get(url, { params: { api_key: apiConfig.key } })
        } else {
          img = apiConfig.Url404
        }
      } catch (er) {
        img = apiConfig.Url404
      }

      const filterObj = {
        id: item.show.ids.trakt,
        title: item.show.title,
        year: item.show.year,
        runtime: item.show.runtime,
        watcherCount: item.watcher_count,
        rating: item.show.rating,
        details: show,
        modalIsOpen: false,
        imgUrl: 
          img.data && 
          img.data.backdrops && 
          img.data.backdrops.length > 0 ?
          apiConfig.baseImgUrl + img.data.backdrops[0].file_path : apiConfig.Url404,
      }

      return filterObj
    }));

  const res = {
    rows: filterResponse,
    pages: totalRows,
    page: page,
    filtered: filtered,
  };

  return res || [];
}

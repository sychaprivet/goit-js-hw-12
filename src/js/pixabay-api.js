import axios from 'axios';

export async function fetchImg(query, page = 1) {
  axios.defaults.baseURL = 'https://pixabay.com/api/';

  const response = await axios.get('?', {
    params: {
      key: '47504793-d73e7cf3fd6e66d39d7291c94',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 15,
    },
  });
  return response.data;
}
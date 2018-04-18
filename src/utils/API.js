import axios from 'axios';

const host = 'https://api.giphy.com';
const key = 'SJQy3yR5xwmDtqTM87GGATjhpNBnQB6I';

export default {
	getGifs: searchTerm => {
		const path = '/v1/gifs/search';
		return axios.get(`${host}${path}?api_key=${key}&q=${searchTerm}`)
	},
};

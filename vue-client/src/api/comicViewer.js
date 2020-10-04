import axios from 'axios';
const urlXkcd = 'http://localhost:4000/proxy/xkcd';

export class ComicViewerApi {
    getxkdc(id) {
        return axios.get(urlXkcd, {
            params: {
                id: id
            }
        })
    }
}
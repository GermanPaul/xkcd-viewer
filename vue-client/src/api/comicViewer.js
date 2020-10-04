import axios from 'axios';

export class ComicViewerApi {
    getxkdc(id) {
        return axios.get('proxy/xkcd', {
            params: {
                id: id
            }
        })
    }
}
import 'axios'
import Axios from 'axios'

export function request(url: string, headers?: object): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        Axios({
            method: 'GET',
            url: url,
            headers: headers
        }).then((resp) => {
            if (resp.status == 200) {
                resolve(resp.data);
            } else {
                reject(new Error('status code - ' + resp.status));
            }
        }).catch(error => {
            reject(error);
        });    
    });
}
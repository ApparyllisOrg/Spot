import * as axios from 'axios';
import config from '../config';

export default async function search(version?: string): Promise<any[]> {
    const params = {
        'jql': 'project%20%3D%20SP%20AND%20status%20in%20(%22Claimed%20Fixed%22%2C%20%22In%20Pre-Testing%22)%20AND%20updated%20%3E%3D%20-24h%20ORDER%20BY%20created%20DESC',
        'maxResults': 100,
        'startAt': 0
    };

    if (version) {
        params.jql = `project%20%3D%20SP%20AND%20status%20in%20(%22Claimed%20Fixed%22%2C%20%22In%20Pre-Testing%22)%20AND%20%22Fixed%20In%20Version%5BNumber%5D%22%20%3D%20%22${version}%22%20ORDER%20BY%20created%20DESC`;
    }

    const issues: any[] = [];
    let jsonResponse: any | null = null;

    do {
        // @ts-expect-error
        const httpParams = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
        const url = `${config.jira.baseUrl}/search?${httpParams}`;

        const serverResponse = await new axios.Axios({}).get(url);
        jsonResponse = JSON.parse(serverResponse.data);

        issues.push(...jsonResponse!.issues);
        params.startAt += 100;
    } while (jsonResponse!.issues.length > 99 && jsonResponse!.total > 100);

    return issues;
}
import { ThreadsPost } from './types/ThreadsPost';
import { transformThreadsPost } from './transformer';
import { request, GaxiosResponse } from 'gaxios';
import axios from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';

const agent = new HttpsProxyAgent(process.env.PROXY);

class ThreadsApi {
  static async _getPostId(url: string) {
    try {
      const response: GaxiosResponse<string> = await request({
        url,
        headers: {
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
          'cache-control': 'max-age=0',
          'sec-ch-prefers-color-scheme': 'dark',
          'sec-ch-ua':
            '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
          'sec-ch-ua-full-version-list':
            '"Not.A/Brand";v="8.0.0.0", "Chromium";v="114.0.5735.198", "Google Chrome";v="114.0.5735.198"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"macOS"',
          'sec-ch-ua-platform-version': '"13.4.1"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'none',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'viewport-width': '769',
        },
        // @ts-ignore
        agent: agent,
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'omit',
      });

      const regex = /"post_id":"(\d+)"/;
      const match = regex.exec(response.data);
      const postId: string = match && match.length ? match[1] : '';

      if (postId) {
        return {
          postId,
          success: true,
        };
      }

      return {
        success: false,
      };
    } catch (error) {
      console.log('[ERROR] _getPostId', error);
      return {
        success: false,
      };
    }
  }

  static async _getMediaJson(postId: string) {
    try {
      const body = `lsd=HFrY0gn8r6ox-SRJVs36y-&fb_api_caller_class=RelayModern&fb_api_req_friendly_name=BarcelonaPostPageQuery&variables=%7B%22postID%22%3A%22${postId}%22%7D&server_timestamps=true&doc_id=6374009175999984`;
      console.log('[DEBUG] body', body);

      const response = await axios.post(
        'https://www.threads.net/api/graphql',
        body,
        {
          httpsAgent: agent,
          headers: {
            accept: '*/*',
            'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8',
            'content-type': 'application/x-www-form-urlencoded',
            'sec-ch-prefers-color-scheme': 'dark',
            'sec-ch-ua':
              '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
            'sec-ch-ua-full-version-list':
              '"Not.A/Brand";v="8.0.0.0", "Chromium";v="114.0.5735.198", "Google Chrome";v="114.0.5735.198"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'sec-ch-ua-platform-version': '"13.4.1"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'viewport-width': '769',
            'x-asbd-id': '129477',
            'x-csrftoken': '',
            'x-fb-friendly-name': 'BarcelonaPostPageQuery',
            'x-fb-lsd': 'HFrY0gn8r6ox-SRJVs36y-',
            'x-ig-app-id': '238260118697367',
          },
          // @ts-ignore
          referrerPolicy: 'origin-when-cross-origin',
          mode: 'cors',
          credentials: 'omit',
        }
      );

      if (response.data) {
        return {
          data: response.data,
          success: true,
        };
      }

      return {
        success: false,
      };
    } catch (error) {
      console.log('[ERROR] _getMediaJson', error);
      return {
        success: false,
      };
    }
  }

  static async getMedia(url: string): Promise<{
    success: boolean;
    data: ThreadsPost | null;
  }> {
    const postIdResponse = await ThreadsApi._getPostId(url);
    console.log('[DEBUG] postIdResponse', postIdResponse);
    if (!postIdResponse.success || !postIdResponse.postId) {
      return {
        success: false,
        data: null,
      };
    }

    const mediaJsonResponse = await ThreadsApi._getMediaJson(
      postIdResponse.postId
    );
    console.log('[DEBUG] mediaJsonResponse', mediaJsonResponse);
    if (!mediaJsonResponse.success) {
      return {
        success: false,
        data: null,
      };
    }

    const threadsPostFormatted = transformThreadsPost(mediaJsonResponse.data);

    return {
      success: true,
      data: threadsPostFormatted,
    };
  }
}

export default ThreadsApi;

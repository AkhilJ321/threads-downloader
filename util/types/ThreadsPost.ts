export type MediaCandidate = {
  height: number;
  width: number;
  url: string;
  type: 'image' | 'video';
};

export interface ThreadsPost {
  id: string;
  user: {
    id: string;
    username: string;
    profilePicUrl: string;
    isVerified: boolean;
  };
  metrics: {
    likeCount: number;
    replyString: string;
  };
  thumbnail: string;
  media: {
    caption: string;
    mediaType: 'singleImage' | 'singleVideo' | 'carousel';
    candidates: MediaCandidate[];
  };
}

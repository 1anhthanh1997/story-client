export interface Chapter {
  _id: string;
  title: string;
  chapterNumber: number;
  wordCount: number;
  readingTime: string;
  isRead: boolean;
  isLocked: boolean;
  publishedDate: string;
}

export interface Review {
  _id: string;
  user: {
    name: string;
    avatar: string;
  };
  rating: number;
  comment: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

export interface Author {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Story {
  id: string;
  title: string;
  author: Author;
  image: string;
  rating: number;
  views: string;
  chapters: number;
  status: string;
  updatedDate: string;
  publishedDate: string;
  genres: string[];
  tags: string[];
  currentChapter: number;
  progress: number;
  description: string;
  chaptersData?: Chapter[];
  reviewsData?: Review[];
}

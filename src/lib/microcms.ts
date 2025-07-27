import { createClient } from 'microcms-js-sdk';
import type { MicroCMSQueries } from 'microcms-js-sdk';

// microCMSクライアントの初期化
export const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

// ブログの型定義
export type Blog = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  title: string;
  slug: string;
  content: string;
  description?: string;
  heroImage?: {
    url: string;
    height: number;
    width: number;
  };
  category?: Category;
  tags?: Tag[];
};

// カテゴリーの型定義
export type Category = {
  id: string;
  name: string;
  slug: string;
};

// タグの型定義
export type Tag = {
  id: string;
  name: string;
  slug: string;
};

// ブログ一覧を取得
export const getBlogs = async (queries?: MicroCMSQueries) => {
  return await client.get<Blog>({ 
    endpoint: 'blogs',
    queries
  });
};

// ブログ詳細を取得
export const getBlogDetail = async (
  contentId: string,
  queries?: MicroCMSQueries
) => {
  return await client.getListDetail<Blog>({
    endpoint: 'blogs',
    contentId,
    queries
  });
};

// スラッグでブログを取得
export const getBlogBySlug = async (slug: string) => {
  const blogs = await client.get<Blog>({
    endpoint: 'blogs',
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1
    }
  });
  return blogs.contents[0];
};

// カテゴリー一覧を取得
export const getCategories = async () => {
  return await client.get<Category>({
    endpoint: 'categories'
  });
};

// タグ一覧を取得
export const getTags = async () => {
  return await client.get<Tag>({
    endpoint: 'tags'
  });
}; 
import { ArcaAPI } from 'arcalive';

export default async function handler(req, res) {
  const api = new ArcaAPI();
  const posts = await api.get_posts('characterai', 1);

  const today = new Date().toDateString();
  const todayPosts = posts.filter(post =>
    new Date(post.date).toDateString() === today
  );

  res.json({
    count: todayPosts.length,
    posts: todayPosts.map(post => ({
      title: post.title,
      author: post.user?.username || '익명',
      url: `https://arca.live/b/characterai/${post.id}`
    }))
  });
}

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useState, useEffect } from 'react';
import classes from '../pages/blog/style.module.css'

const RecentBlogs = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://blog.abhicares.com/wp-json/wp/v2/posts');
        const postsWithfeaturedimage = response.data.map(async (post) => {
          if (post.featured_media) {
            const mediaResponse = await axios.get(`https://blog.abhicares.com/wp-json/wp/v2/media/${post.featured_media}`);
            return { ...post, featured_image: mediaResponse.data };
          }
          return post;
        });
        const postsWithMedia = await Promise.all(postsWithfeaturedimage);
        setPosts(postsWithMedia);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper">
      <div className={classes["recent-blogs-wrapper"]}>
        <h1>Recent blogs</h1>
        <div className={classes['blogs-sidebar-inner']}>
        {posts.slice(0, 3).map((post) => (
        <div className={classes["recent-blogs-cards"]} key={post.id}>
              <div className={classes["blog-swiper-thumbnail"]}>
                <Link to={`/single-blog/${(post.id)}`}><img src={post.featured_image.source_url} alt="image" /></Link>
              </div>
              <div className={classes["blog-content"]}>
                <div className={classes["authoring-date"]}>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className={classes["blog-name"]}>
                  <h5>
                    <Link to={`/single-blog/${(post.id)}`}>{post.title.rendered}</Link>
                  </h5>
                </div>
                <div className={classes["read-more"]}>
                  <Link to={`/single-blog/${(post.id)}`}>
                    Read more&nbsp;<ArrowForwardIcon />
                  </Link>
                </div>
              </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  )
}
export default RecentBlogs;

import axios from "axios"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import classes from './style.module.css'
import WebsiteWrapper from "../WebsiteWrapper"

const BlogsCategory = () => {
  const { id } = useParams();
  console.log(id)
  const [postsByCategory, setPostsByCategory] = useState({});
  const [categoriesBlogs, setCategoriesBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryId = id;

        const categoryBlogs = async (id) => {
          try {
            const response = await axios.get(`https://blog.abhicares.com/wp-json/wp/v2/posts?categories=${id}`);
            console.log(response.data);

            const blogsWithMedia = await Promise.all(response.data.map(async (post) => {
              try {
                const mediaResponse = await axios.get(`https://blog.abhicares.com/wp-json/wp/v2/media/${post.featured_media}`);
                console.log('Media Response for Post ID', post.id, mediaResponse.data);
                return { ...post, featuredMedia: mediaResponse.data };
              } catch (mediaError) {
                console.error('Error fetching featured media for Post ID', post.id, mediaError);
                return { ...post, featuredMedia: null };
              }
              finally{
                setLoading(false);
              }
            }));

            setCategoriesBlogs(blogsWithMedia);
          } catch (error) {
            console.error('Error fetching category blogs:', error);
          }
        };

        await categoryBlogs(categoryId);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
        <WebsiteWrapper>
            <div className={classes["recent-blogs-wrapper-loading"]}>
                <div className={classes['loading']}><h1>....Loading</h1></div>
            </div>
        </WebsiteWrapper>
    );
}

  return (
    <WebsiteWrapper>
      <div className="wrapper">
        <div className={classes['recent-blogs-wrapper']}>
          <div>
            <div className={classes["category-wrapper"]}>
              <div className={classes["blogs-container"]}>
                {categoriesBlogs.map((blog) => (
                  <div className={classes["blog-cards"]} key={blog.id}>
                    <div className={classes['blog-thumbnail']}>
                      {blog.featuredMedia && (
                        <Link to={`/single-blog/${blog.id}`}><img src={blog.featuredMedia.source_url} alt="Image" /></Link>
                      )}
                    </div>
                    <div className={classes["blog-content"]}>
                      <div className={classes["authoring-date"]}><span>{new Date(blog.date).toLocaleDateString()}</span></div>
                      <div className={classes["blog-name"]}>
                        <h5><Link to={`/single-blog/${blog.id}`}>{blog.title.rendered}</Link></h5>
                      </div>
                      <div className={classes["read-more"]}>
                        <Link to={`/single-blog/${blog.id}`}>Read more&nbsp;<ArrowForwardIcon /></Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </WebsiteWrapper>
  )
}
export default BlogsCategory
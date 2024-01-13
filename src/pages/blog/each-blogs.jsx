import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import RecentBlogs from "../../components/RecentBlogs";
import classes from './style.module.css'
import WebsiteWrapper from "../WebsiteWrapper";


const SingleBlog = () => {

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const PostId = id;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`https://blog.abhicares.com/wp-json/wp/v2/posts/${PostId}`);
        setPost(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [PostId]);

  if (loading) {
    return (
      <WebsiteWrapper>
        <div className={classes["recent-blogs-wrapper-loading"]}>
          <div className={classes['loading']}><h1>....Loading</h1></div>
        </div>
      </WebsiteWrapper>
    );
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!post) {
    return <p>No post found with ID {PostId}</p>;
  }

  return (
    <WebsiteWrapper>
      <div className={classes['recent-blogs-wrapper']}>
        <h2>{post.title.rendered}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      </div>
      <RecentBlogs />
    </WebsiteWrapper>
  )
}
export default SingleBlog
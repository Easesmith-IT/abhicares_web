import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link } from 'react-router-dom';
import axios from 'axios'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from 'react';
import RecentBlogs from '../../components/RecentBlogs';
import classes from './style.module.css'
import WebsiteWrapper from '../WebsiteWrapper';

const Blogs = () => {
    const [loading, setLoading] = useState(true);
    const responsive = {
        superLargeDesktop: {

            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4
        },
        tablet: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
        },
        mobile: {
            breakpoint: { max: 520, min: 0 },
            items: 2
        },
        largemobile: {
            breakpoint: { max: 520, min: 0 },
            items: 1
        }
    };

    const [postsByCategory, setPostsByCategory] = useState({});
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get('https://blog.abhicares.com/wp-json/wp/v2/categories');
                setCategories(categoriesResponse.data);

                const postsPromises = categoriesResponse.data.map(async (category) => {
                    const postsResponse = await axios.get(`https://blog.abhicares.com/wp-json/wp/v2/posts?categories=${category.id}`);

                    const postsWithMediaPromises = postsResponse.data.map(async (post) => {
                        if (post.featured_media) {
                            const featuredMediaResponse = await axios.get(`https://blog.abhicares.com/wp-json/wp/v2/media/${post.featured_media}`);
                            return { ...post, featured_media_data: featuredMediaResponse.data };
                        }
                        return post;
                    });

                    const postsWithMedia = await Promise.all(postsWithMediaPromises);
                    return { category, posts: postsWithMedia };
                });

                const postsData = await Promise.all(postsPromises);
                const postsByCategoryObject = {};
                postsData.forEach(({ category, posts }) => {
                    postsByCategoryObject[category.id] = { name: category.name, posts };
                });

                setPostsByCategory(postsByCategoryObject);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
            <div className={classes["wrapper"]}>
                <RecentBlogs />
                <div className={classes['recent-blogs-wrapper']}>
                    <div>
                        {
                            Object.keys(postsByCategory).map((categoryId) =>
                                <div key={categoryId}>
                                    <h1>{postsByCategory[categoryId].name}</h1>

                                    <div className={classes["category-wrapper"]}>
                                        <div className={classes["blogs-container"]}>
                                            {postsByCategory[categoryId].posts.slice(0, 4).map((post) => (
                                                <div className={classes["blog-cards"]} key={post.id}>
                                                    <div className={classes['blog-thumbnail']}>

                                                        {post.featured_media_data && (
                                                            <Link to={`/single-blog/${(post.id)}`}><img src={post.featured_media_data.source_url} alt="" /></Link>
                                                        )}

                                                    </div>
                                                    <div className={classes["blog-content"]}>
                                                        <div className={classes["authoring-date"]}><span>{new Date(post.date).toLocaleDateString()}</span></div>
                                                        <div className={classes["blog-name"]}>
                                                            <h5><Link to={`/single-blog/${(post.id)}`}>{post.title.rendered}</Link></h5>
                                                        </div>
                                                        <div className={classes["read-more"]}><Link to={`/single-blog/${(post.id)}`}>Read more&nbsp;<ArrowForwardIcon /></Link></div>
                                                    </div>
                                                </div>
                                            ))}


                                        </div>
                                        <div className={classes['view-more-button']}>
                                            <button className={classes.btn}><Link to={`/blog-category/${categoryId}`}>View More</Link></button>
                                        </div>
                                    </div>
                                </div>
                            )}
                    </div>

                </div>

            </div>
        </WebsiteWrapper>
    )
}

export default Blogs
// Import CSS module styles for utility classes
import utilStyles from '../../styles/utils.module.css';

// Import the custom Date component for formatting dates
import Date from '../../components/date';

// Import the Head component from Next.js for managing document head elements
import Head from 'next/head';

// Import the Layout component for consistent page structure
import Layout from '../../components/layout';

// Import functions to get all post IDs and individual post data
import { getAllPostIds, getPostData } from '../../lib/posts-json';
 
// Static generation function that runs at build time to fetch data for individual posts
export async function getStaticProps({ params }) {
    // Extract the post ID from the URL parameters
    // Add the "await" keyword like this:
    const postData = await getPostData(params.id);
   
    // Return the post data as props to be passed to the component
    return {
      props: {
        postData,
      },
    };
  }
 
// Static generation function that defines all possible paths for this dynamic route
export async function getStaticPaths() {
  // Get all available post IDs from the markdown files
  const paths = getAllPostIds();
  
  // Return the paths and fallback configuration
  return {
    paths,
    fallback: false, // 404 for paths not returned by getStaticPaths
  };
}

// Define the default export function component for individual blog posts
// This component receives postData as a prop from getStaticProps
export default function Post({ postData }) {
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article className={utilStyles.articleContent}>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} /> • By {postData.author}
          </div>
          <div className={utilStyles.blogContent} dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    );
  }
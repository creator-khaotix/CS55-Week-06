// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';

// Import the custom Date component for formatting dates
import Date from '../components/date';

// Import the Head component from Next.js for managing document head elements
import Head from 'next/head';

// Import the Layout component and siteTitle constant from the layout component
import Layout, { siteTitle } from '../components/layout';

// Import CSS module styles for utility classes
import utilStyles from '../styles/utils.module.css';

// Import the getSortedPostsData function to fetch blog post data
import { getSortedPostsData } from '../lib/posts-json';
 
// Static generation function that runs at build time to fetch data for this page
export async function getStaticProps() {
  // Call the function to get all blog posts sorted by date
  const allPostsData = getSortedPostsData();
  
  // Return the data as props to be passed to the component
  return {
    props: {
      allPostsData,
    },
  };
}

// Define the default export function component named Home
// This component receives allPostsData as a prop from getStaticProps
export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.centeredContent}>
      <p><Link href="/posts/first-post">[DUMB DUMB DUMB DUMB DUMB]</Link></p>
      {/* Working YouTube Video */}
      <iframe 
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/621LzO0qWnU" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
        style={{ marginBottom: '10px' }}
      />
      
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title, author }) => (
            <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} /> • By {author}
            </small>
          </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
// Import the Head component from Next.js for managing document head elements
import Head from 'next/head';
// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';
// Import the Layout component from the parent components directory
import Layout from '../../components/layout';
 
// Define the default export function component named FirstPost
export default function FirstPost() {
    // Return the JSX structure for the first post page
    return (
      <>
        <Head>
          <title>First Post</title>
        </Head>
        
        <h2>The imbed was in case you didn't get the reference.</h2>
        <h2>
          <Link href="/">← Forgive me if you are Mormon</Link>
        </h2>
      </>
    );
  }
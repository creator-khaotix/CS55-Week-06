// Import the firebase app instance
import { db } from './firebase'; // load from firebase.js in same dir
// Import Firestore functions for database operations
import { collection, getDocs, query, where, documentId } from 'firebase/firestore';

// Export async function to get all posts sorted by title
export async function getSortedPostsData() {
    // Create reference to 'posts' collection in Firestore
    const postsCollectionRef = collection(db, 'posts');
    // Get all documents from the posts collection
    const querySnapshot = await getDocs(postsCollectionRef);
    // Convert Firestore documents to JavaScript objects with id and data
    const jsonObj = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    
    // Sort posts alphabetically by title
    jsonObj.sort(function (a, b) {
        // Compare titles using localeCompare for proper string sorting
        return a.title.localeCompare(b.title);
    });

    // Return array with only required fields for post list
    return jsonObj.map((item) => ({
        // Convert document ID to string
        id: item.id.toString(),
        // Include post title
        title: item.title,
        // Include post date
        date: item.date,
        // Include post author
        author: item.author
    }));

}

// Export async function to get all post IDs for dynamic routing
export async function getAllPostIds() {
    // Create reference to 'posts' collection in Firestore
    const postsCollectionRef = collection(db, 'posts');
    // Get all documents from the posts collection
    const querySnapshot = await getDocs(postsCollectionRef);
    // Extract only document IDs from each post
    const jsonObj = querySnapshot.docs.map((doc) => ({ id: doc.id }));
    // Return array formatted for Next.js getStaticPaths
    return jsonObj.map((item) => ({
        // Each item needs params object for Next.js routing
        params: {
            // Convert document ID to string for URL parameter
            id: item.id.toString()
        }
    }));
}

// Export async function to get specific post by ID
export async function getPostData(id) {
    // Create reference to 'posts' collection in Firestore
    const postsCollectionRef = collection(db, 'posts');
    // Create query to find document with specific ID
    const searchQuery = query(postsCollectionRef, where(documentId(), '==', id));
    // Execute query to get matching documents
    const querySnapshot = await getDocs(searchQuery);
    // Convert Firestore documents to JavaScript objects
    const jsonObj = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    // Check if any documents were found
    if (jsonObj.length === 0) {
        // Return "Not found" object if no post exists
        return {
            // Use the searched ID
            id: id,
            // Set title to indicate not found
            title: 'Not found',
            // Set empty date
            date: '',
            // Set content to indicate not found
            contentHtml: 'Not found'
        }
    } else {
        // Return the first (and only) matching post
        return jsonObj[0];
    }

}
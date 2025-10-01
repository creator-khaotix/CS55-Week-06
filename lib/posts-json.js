// Import Node.js built-in modules for file system operations and path handling
import fs from 'fs';
import path from 'path';

// Define the data directory path relative to the current working directory
const dataDir = path.join(process.cwd(), 'data');

/**
 * Helper function to read and parse the posts.json file
 * This eliminates code duplication across all functions
 * @returns {Array} Parsed array of post objects from posts.json
 */
function getPostsData() {
    // Construct the full path to the posts.json file
    const filePath = path.join(dataDir, 'posts.json');
    
    // Read the JSON file synchronously and get the content as a string
    const jsonString = fs.readFileSync(filePath, 'utf8');
    
    // Parse the JSON string into a JavaScript object and return it
    return JSON.parse(jsonString);
}

/**
 * Retrieves all posts from posts.json, sorts them alphabetically by title,
 * and returns them in a standardized format
 * @returns {Array} Array of post objects with id, title, date, and author
 */
export function getSortedPostsData() {
    // Get the parsed posts data using the helper function
    const jsonObj = getPostsData();
    
    // Sort the posts alphabetically by title using localeCompare for proper string comparison
    jsonObj.sort(function (a, b) {
        return a.title.localeCompare(b.title);
    });
    
    // Map the sorted posts to a standardized format, converting id to string
    return jsonObj.map(item => {
        return {
          id: item.id.toString(),
          title: item.title,
          date: item.date,
          author: item.author
        }
      });
}

/**
 * Retrieves all post IDs from posts.json and formats them for Next.js dynamic routing
 * This function is typically used with getStaticPaths() for static generation
 * @returns {Array} Array of objects with params property containing the post id
 */
export function getAllPostIds() {
    // Get the parsed posts data using the helper function
    const jsonObj = getPostsData();
    
    // Debug: Log the parsed JSON object to console
    console.log(jsonObj);
    
    // Map each post to the format required by Next.js getStaticPaths
    // Each item needs a params object with the id property
    return jsonObj.map(item => {
        return {
          params: {
            id: item.id.toString()
          }
        }
      });
}

/**
 * Retrieves a specific post by its ID from posts.json
 * Returns a "Not found" object if the post doesn't exist
 * @param {string} id - The ID of the post to retrieve
 * @returns {Object} The post object or a "Not found" object if post doesn't exist
 */
export function getPostData(id) {
    // Get the parsed posts data using the helper function
    const jsonObj = getPostsData();
    
    // Filter the posts array to find the post with the matching ID
    const objReturned = jsonObj.filter(obj => {
        return obj.id.toString() === id;
      });
      
      // If no post found with the given ID, return a "Not found" object
      if (objReturned.length === 0) {
        return {
          id: id,
          title: 'Not found',
          date: '',
          contentHtml: 'Not found'
        }
      } else {
        // Return the first (and should be only) matching post
        return objReturned[0];
      }
}
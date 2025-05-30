function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return {
        name: data.name,
        email: data.email,
        lastLogin: new Date(data.lastLoginTimestamp)
      };
    })
    .catch(error => {
      console.error('Fetch error:', error);
      return null;
    });
}

/**
 * Fetches and processes user data from the API.
 * 
 * @async
 * @function fetchUserData
 * @param {string|number} userId - The unique identifier of the user to fetch
 * @returns {Promise<Object|null>} A promise that resolves to an object containing user data or null if the fetch fails
 * @throws {Error} Throws an error if the API request fails
 * 
 * @example
 * // Fetch user with ID 123
 * fetchUserData(123)
 *   .then(userData => {
 *     if (userData) {
 *       console.log(userData.name);
 *     }
 *   });
 * 
 * @example
 * // Using async/await
 * const userData = await fetchUserData(123);
 * if (userData) {
 *   console.log(userData.email);
 * }
 */
function fetchUserData(userId) {
  return fetch(`https://api.example.com/users/${userId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      return {
        name: data.name,
        email: data.email,
        lastLogin: new Date(data.lastLoginTimestamp)
      };
    })
    .catch(error => {
      console.error('Fetch error:', error);
      return null;
    });
}

/**
 * @typedef {Object} UserData
 * @property {string} name - The user's full name
 * @property {string} email - The user's email address
 * @property {Date} lastLogin - The timestamp of the user's last login
 */

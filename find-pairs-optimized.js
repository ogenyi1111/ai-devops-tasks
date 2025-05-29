/**
 * Finds all pairs of numbers in an array that sum up to the target value.
 * Optimized version using a hash map for O(n) time complexity.
 * 
 * @param {number[]} arr - Input array of numbers
 * @param {number} targetSum - Target sum to find
 * @returns {number[][]} Array of pairs that sum to target
 * 
 * @example
 * findPairs([1, 2, 3, 4, 5], 7) // returns [[2, 5], [3, 4]]
 */
function findPairs(arr, targetSum) {
    const pairs = [];
    const seen = new Map(); // Hash map to store seen numbers

    for (const num of arr) {
        const complement = targetSum - num;
        
        // If complement exists in map, we found a pair
        if (seen.has(complement)) {
            pairs.push([complement, num]);
        }
        
        // Add current number to seen map
        seen.set(num, true);
    }

    return pairs;
}

// Test cases
const testCases = [
    {
        arr: [1, 2, 3, 4, 5],
        target: 7,
        expected: [[2, 5], [3, 4]]
    },
    {
        arr: [1, 1, 1, 1],
        target: 2,
        expected: [[1, 1], [1, 1], [1, 1]]
    },
    {
        arr: [1, 2, 3],
        target: 10,
        expected: []
    }
];

// Run tests
console.log('Testing findPairs function:');
testCases.forEach((test, index) => {
    const result = findPairs(test.arr, test.target);
    console.log(`Test ${index + 1}:`, {
        input: { arr: test.arr, target: test.target },
        result,
        expected: test.expected,
        passed: JSON.stringify(result) === JSON.stringify(test.expected)
    });
});

/**
 * Complexity Analysis:
 * 
 * Time Complexity: O(n)
 * - Single pass through the array
 * - Map operations (set/get) are O(1) on average
 * 
 * Space Complexity: O(n)
 * - Map stores at most n elements
 * - Result array stores pairs (worst case n/2 pairs)
 * 
 * Advantages over original O(n²) solution:
 * 1. Faster execution time for large arrays
 * 2. More efficient use of memory
 * 3. Better scalability
 * 
 * Trade-offs:
 * 1. Uses more memory for the hash map
 * 2. May not preserve original order of pairs
 * 3. Assumes unique numbers (can be modified to handle duplicates)
 */

// Export the function
module.exports = findPairs;

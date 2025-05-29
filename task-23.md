# Algorithm Complexity Analysis: Finding Pairs with Target Sum

## Original Algorithm
```javascript
function findPairs(arr, targetSum) {
  const pairs = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === targetSum) {
        pairs.push([arr[i], arr[j]]);
      }
    }
  }
  return pairs;
}
```

## Optimized Algorithm
```javascript
function findPairs(arr, targetSum) {
    const pairs = [];
    const seen = new Map();
    
    for (const num of arr) {
        const complement = targetSum - num;
        if (seen.has(complement)) {
            pairs.push([complement, num]);
        }
        seen.set(num, true);
    }
    return pairs;
}
```

## Complexity Analysis

### Original Algorithm
1. **Time Complexity: O(n²)**
   - Outer loop: n iterations
   - Inner loop: (n-1) to 1 iterations
   - Total iterations: n(n-1)/2
   - Example: For array of size 5, iterations = 5 * 4 / 2 = 10

2. **Space Complexity: O(n)**
   - Stores pairs in result array
   - Worst case: n/2 pairs (when all numbers form pairs)
   - Example: [1,2,3,4] with target 5 → [[1,4], [2,3]]

### Optimized Algorithm
1. **Time Complexity: O(n)**
   - Single pass through array: n iterations
   - Map operations (set/get): O(1) average case
   - Total operations: n * O(1) = O(n)
   - Example: For array of size 5, iterations = 5

2. **Space Complexity: O(n)**
   - Map storage: at most n elements
   - Result array: at most n/2 pairs
   - Total space: O(n) + O(n) = O(n)

## Performance Comparison

### Time Complexity
| Array Size | Original (O(n²)) | Optimized (O(n)) |
|------------|------------------|------------------|
| 10         | 45 operations    | 10 operations    |
| 100        | 4,950 operations | 100 operations   |
| 1000       | 499,500 ops      | 1,000 operations |

### Memory Usage
| Array Size | Original | Optimized |
|------------|----------|-----------|
| 10         | ~5 pairs | ~10 map entries |
| 100        | ~50 pairs| ~100 map entries|
| 1000       | ~500 pairs| ~1000 map entries|

## Improvements

1. **Time Efficiency**
   - Reduced from quadratic to linear time
   - Eliminated nested loops
   - Faster execution for large datasets

2. **Algorithm Design**
   - Uses hash map for O(1) lookups
   - Single pass through array
   - Immediate pair detection

3. **Code Quality**
   - More readable and maintainable
   - Better separation of concerns
   - Easier to test and debug

## Trade-offs

1. **Advantages**
   - Much faster for large arrays
   - More efficient memory usage
   - Better scalability
   - Cleaner code structure

2. **Disadvantages**
   - Slightly more complex implementation
   - Uses additional memory for hash map
   - May not preserve original order of pairs
   - Assumes unique numbers (can be modified for duplicates)

## Use Cases

1. **Original Algorithm Better For**
   - Very small arrays (n < 10)
   - When memory is extremely limited
   - When order of pairs matters
   - When handling duplicate numbers

2. **Optimized Algorithm Better For**
   - Large datasets
   - Real-time processing
   - High-performance requirements
   - When order doesn't matter

## Conclusion

The optimized algorithm provides significant performance improvements for most practical use cases. The O(n) time complexity makes it much more scalable and suitable for production environments. However, the original algorithm might still be preferred in specific scenarios where memory is extremely limited or when the order of pairs is crucial.

# Original Version (O(n²) time complexity)
def find_duplicates(list_of_items):
    duplicates = []
    for i in range(len(list_of_items)):
        for j in range(i+1, len(list_of_items)):
            if list_of_items[i] == list_of_items[j] and list_of_items[i] not in duplicates:
                duplicates.append(list_of_items[i])
    return duplicates

# Optimized Version (O(n) time complexity)
def find_duplicates_optimized(list_of_items):
    seen = set()
    duplicates = set()
    
    for item in list_of_items:
        if item in seen:
            duplicates.add(item)
        else:
            seen.add(item)
    
    return list(duplicates)

# Example usage:
test_list = [1, 2, 3, 2, 4, 5, 3, 6, 7, 8, 8]
print(find_duplicates_optimized(test_list))  # Output: [2, 3, 8]

# Performance Comparison:
"""
Original Version:
- Time Complexity: O(n²)
- Space Complexity: O(n)
- Uses nested loops to compare each element with every other element
- Checks if item is already in duplicates list for each comparison

Optimized Version:
- Time Complexity: O(n)
- Space Complexity: O(n)
- Uses a single pass through the list
- Uses sets for O(1) lookup time
- No need to check if item is already in duplicates (sets handle this automatically)
"""

# Additional Optimized Version using Counter (if you need frequency information)
from collections import Counter

def find_duplicates_with_frequency(list_of_items):
    return [item for item, count in Counter(list_of_items).items() if count > 1]

# Example with frequency:
test_list = [1, 2, 3, 2, 4, 5, 3, 6, 7, 8, 8]
print(find_duplicates_with_frequency(test_list))  # Output: [2, 3, 8]

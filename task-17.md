# Task Filtering Solution

## Description
The solution provides a function `getCompletedTaskTitles` that processes an array of task objects to:
1. Filter out only completed tasks
2. Sort them by ID in ascending order
3. Return an array containing only the task titles

## Function Signature
```javascript
function getCompletedTaskTitles(tasks: Array<{id: number, title: string, status: string}>): string[]
```

## Parameters
- `tasks`: An array of task objects where each object has:
  - `id`: number (unique identifier)
  - `title`: string (task description)
  - `status`: string (task status, e.g., "completed", "pending", "in-progress")

## Return Value
- Returns an array of strings containing only the titles of completed tasks
- Tasks are sorted by their ID in ascending order

## Example Usage

```javascript
// Sample task data
const tasks = [
    { id: 3, title: "Complete project documentation", status: "completed" },
    { id: 1, title: "Set up development environment", status: "pending" },
    { id: 2, title: "Write unit tests", status: "completed" },
    { id: 4, title: "Deploy to production", status: "in-progress" },
    { id: 5, title: "Code review", status: "completed" }
];

// Get completed task titles
const completedTitles = getCompletedTaskTitles(tasks);

console.log(completedTitles);
// Output: ["Write unit tests", "Complete project documentation", "Code review"]
```

## How It Works

1. **Filtering**
   - Uses `filter()` to keep only tasks where status is "completed"
   - Example: From 5 tasks, only 3 are kept (status = "completed")

2. **Sorting**
   - Uses `sort()` to order tasks by ID
   - Example: [3, 2, 5] becomes [2, 3, 5]

3. **Mapping**
   - Uses `map()` to extract only the title property
   - Example: [{id: 2, title: "Write unit tests"}, ...] becomes ["Write unit tests", ...]

## Edge Cases Handled

1. **Empty Array**
```javascript
getCompletedTaskTitles([]) // Returns []
```

2. **No Completed Tasks**
```javascript
const tasks = [
    { id: 1, title: "Task 1", status: "pending" },
    { id: 2, title: "Task 2", status: "in-progress" }
];
getCompletedTaskTitles(tasks) // Returns []
```

3. **All Tasks Completed**
```javascript
const tasks = [
    { id: 2, title: "Task 2", status: "completed" },
    { id: 1, title: "Task 1", status: "completed" }
];
getCompletedTaskTitles(tasks) // Returns ["Task 1", "Task 2"]
```

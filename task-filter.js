/**
 * Filters completed tasks, sorts them by ID, and returns their titles
 * @param {Array<{id: number, title: string, status: string}>} tasks - Array of task objects
 * @returns {string[]} Array of titles from completed tasks, sorted by ID
 * 
 * @example
 * const tasks = [
 *   { id: 3, title: "Task 3", status: "completed" },
 *   { id: 1, title: "Task 1", status: "pending" },
 *   { id: 2, title: "Task 2", status: "completed" }
 * ];
 * 
 * const completedTitles = getCompletedTaskTitles(tasks);
 * console.log(completedTitles); // ["Task 2", "Task 3"]
 */
function getCompletedTaskTitles(tasks) {
    return tasks
        .filter(task => task.status === "completed")
        .sort((a, b) => a.id - b.id)
        .map(task => task.title);
}

// Example usage:
const tasks = [
    { id: 3, title: "Complete project documentation", status: "completed" },
    { id: 1, title: "Set up development environment", status: "pending" },
    { id: 2, title: "Write unit tests", status: "completed" },
    { id: 4, title: "Deploy to production", status: "in-progress" },
    { id: 5, title: "Code review", status: "completed" }
];

const completedTitles = getCompletedTaskTitles(tasks);
console.log(completedTitles);
// Output: ["Write unit tests", "Complete project documentation", "Code review"]

// Test cases
function testGetCompletedTaskTitles() {
    const testCases = [
        {
            input: [],
            expected: [],
            description: "Empty array"
        },
        {
            input: [
                { id: 1, title: "Task 1", status: "pending" }
            ],
            expected: [],
            description: "No completed tasks"
        },
        {
            input: [
                { id: 2, title: "Task 2", status: "completed" },
                { id: 1, title: "Task 1", status: "completed" }
            ],
            expected: ["Task 1", "Task 2"],
            description: "Multiple completed tasks"
        }
    ];

    testCases.forEach(({ input, expected, description }) => {
        const result = getCompletedTaskTitles(input);
        const passed = JSON.stringify(result) === JSON.stringify(expected);
        console.log(`Test "${description}": ${passed ? "PASSED" : "FAILED"}`);
        if (!passed) {
            console.log(`Expected: ${JSON.stringify(expected)}`);
            console.log(`Got: ${JSON.stringify(result)}`);
        }
    });
}

// Run tests
testGetCompletedTaskTitles();

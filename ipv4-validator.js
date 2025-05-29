/**
 * Validates an IPv4 address using a regular expression.
 * An IPv4 address consists of four octets, each ranging from 0 to 255,
 * separated by dots.
 * 
 * @param {string} ip - The IPv4 address to validate
 * @returns {boolean} - True if the address is valid, false otherwise
 * 
 * @example
 * isValidIPv4('192.168.1.1')    // returns true
 * isValidIPv4('256.1.2.3')      // returns false
 * isValidIPv4('1.1.1.1.1')      // returns false
 * isValidIPv4('192.168.001.1')  // returns false
 */
function isValidIPv4(ip) {
    // Regular expression pattern for IPv4 validation
    const ipv4Pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    return ipv4Pattern.test(ip);
}

// Test cases
const testCases = [
    '192.168.1.1',     // Valid
    '10.0.0.1',        // Valid
    '172.16.0.1',      // Valid
    '255.255.255.255', // Valid
    '0.0.0.0',         // Valid
    '256.1.2.3',       // Invalid - number > 255
    '1.1.1.1.1',       // Invalid - too many octets
    '192.168.001.1',   // Invalid - leading zeros
    '192.168.1',       // Invalid - too few octets
    '192.168.1.',      // Invalid - trailing dot
    '.192.168.1.1',    // Invalid - leading dot
    '192.168.1.1.1',   // Invalid - too many octets
    '192.168.1.256',   // Invalid - number > 255
    '192.168.1.-1',    // Invalid - negative number
    '192.168.1.abc',   // Invalid - non-numeric
];

// Run tests
console.log('IPv4 Address Validation Tests:');
testCases.forEach(ip => {
    console.log(`${ip}: ${isValidIPv4(ip) ? 'Valid' : 'Invalid'}`);
});

// Export the function for use in other modules
module.exports = isValidIPv4;

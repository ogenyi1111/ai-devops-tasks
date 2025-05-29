# IPv4 Address Validation

## Regular Expression Pattern
```
^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
```

## Pattern Explanation

The regex pattern is broken down into the following components:

1. `^` - Start of string
2. `(...)` - Capturing group for each octet
3. `25[0-5]` - Matches numbers 250-255
4. `|` - OR operator
5. `2[0-4][0-9]` - Matches numbers 200-249
6. `|` - OR operator
7. `[01]?[0-9][0-9]?` - Matches numbers 0-199
8. `\.` - Matches literal dot
9. `{3}` - Repeat the pattern 3 times (for first three octets)
10. `$` - End of string

### Octet Validation Rules
- Each octet must be a number between 0 and 255
- No leading zeros allowed (e.g., 001 is invalid)
- Must have exactly 4 octets
- Octets must be separated by dots

## Test Examples

### Valid IPv4 Addresses
```
192.168.1.1     # Common local network address
10.0.0.1        # Private network address
172.16.0.1      # Private network address
255.255.255.255 # Maximum valid address
0.0.0.0         # Minimum valid address
127.0.0.1       # Localhost
8.8.8.8         # Google DNS
```

### Invalid IPv4 Addresses
```
256.1.2.3       # Number > 255
1.1.1.1.1       # Too many octets
192.168.001.1   # Leading zeros
192.168.1       # Too few octets
192.168.1.      # Trailing dot
.192.168.1.1    # Leading dot
192.168.1.1.1   # Too many octets
192.168.1.256   # Number > 255
192.168.1.-1    # Negative number
192.168.1.abc   # Non-numeric
```

## Usage Example

```javascript
function isValidIPv4(ip) {
    const ipv4Pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipv4Pattern.test(ip);
}

// Test the function
console.log(isValidIPv4('192.168.1.1'));  // true
console.log(isValidIPv4('256.1.2.3'));    // false
```

## Common Use Cases

1. **Form Validation**
   - Validating IP address input in web forms
   - Network configuration interfaces

2. **API Validation**
   - Validating IP addresses in API requests
   - Input sanitization

3. **Network Configuration**
   - Validating IP addresses in configuration files
   - Network device setup

## Performance Considerations

- The regex is optimized for readability and maintainability
- For high-performance applications, consider:
  - Caching the regex pattern
  - Using a compiled regex in languages that support it
  - Implementing a non-regex solution for maximum performance

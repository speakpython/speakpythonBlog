---
layout: post
heading: Converting Hexadecimal to Decimal Made Easy!
keywords: ['hex-to-decimal']
author_id: 'webriddler'
credits: ['wikipedia']
level: 3
published: true
---

If you're looking to improve your Python skills, learning how to convert hexadecimal to decimal is a great place to start. In this tutorial, we'll explore the _basics of hexadecimal_ and walk through the steps of converting it to decimal using Python.

!['case-converter'](../../../image/deciaml-banner.jpg)

## Decimal and Hexadecimal Numbers

Decimal and hexadecimal are two different numbering systems used to represent numbers in computing and mathematics.

__Decimal__, also known as _base-10_, is the numerical system that most people are familiar with, which _uses 10 digits (0-9)_ to represent values. 

- Each digit's position represents a power of 10. 

- For example, the number `1234` in decimal form represents the value of `1x10^3 + 2x10^2 + 3x10^1 + 4x10^0`.

__hexadecimal__, also known as `base-16`, is a numerical system that uses `16 digits (0-9, A-F)` to represent values. 

- Each digit's position represents a power of 16. 
- For example, the number `1A` in hexadecimal form represents the value of `1x16^1 + 10x16^0`, which is equal to `26` in decimal form.

<br />

<hr>

_Before starting to write code, it's important to have a basic understanding of how the two numbering systems work._

__Resource link__: [How to Convert from Hexadecimal to Decimal](https://www.wikihow.com/Convert-Hexadecimal-to-Binary-or-Decimal).  

<hr>

<br />

>Keep calm coding begins...

### _Int_ - Built-in function

The `int()` is used to convert a value to an integer, and the `base` parameter specifies the base of the number being converted, in this case `16` for `hexadecimal`.

```python
int('af71', base=16)

#Output: 44913
```
The resulting decimal value of this function call would be `44913`.

<br/>

### hexToDecimal - Custom function

We have defines two functions `hexToDecimal()` and `hexCharToDecimal()` that can be used to convert a hexadecimal string to its decimal equivalent in Python.


```python
def hexToDecimal(hex):
    decimalValue = 0
    for i in range(len(hex)):
        ch = hex[i]
        
        if 'A' <= ch <= 'F' or '0' <= ch <= '9':
            decimalValue = decimalValue * 16 + hexCharToDecimal(ch)
        else:
            return None
    
    return decimalValue

def hexCharToDecimal(ch):
    if 'A' <= ch <= 'F':
        return 10 + ord(ch) - ord('A')
    return int(ch)
```

Here's how it works:

`hexToDecimal(hex)` takes a string `hex` representing a hexadecimal number as _input_, and _returns_ its decimal equivalent.

- It does so by iterating over each character of the input string, and multiplying the decimal value by `16` for each new digit encountered, and adding the decimal equivalent of that digit to the total - `decimalValue`.

`hexCharToDecimal(ch)` function takes a single character `ch` as _input_, and _returns_ its decimal equivalent. 

- It does so by checking if the character is in the range `A` to `F`, and if so, returns its decimal value as `10` plus the difference between the `ASCII` value of `ch` and the `ASCII` value of `A`.

- If the character is not in this range, it is assumed to be a digit in the range `0` to `9`, and its integer value is returned.

<br/>

### Driver Code - function calling

This code provides a way for a user to input a hexadecimal number and convert it to its decimal equivalent using the `hexToDecimal()`.

```python
hexData = input('Enter a hex number: ').strip()
decimal = hexToDecimal(hexData.upper())

print("The decimal value for hex number",hexData,"is",decimal) if decimal else  print("Incorrect hex number.")
```

- the code prompts the user to enter a hexadecimal number using the `input()`, and stores the input in the variable `hexData`. 

- The `strip()` function is called on this input to remove any leading or trailing whitespace characters.

- Next, the `hexData` string is converted to uppercase using the `.upper()` method to ensure consistency in character case, since _hexadecimal digits can be represented in both uppercase and lowercase_.

- Then, the `hexToDecimal()` is called with the `hexData` string as input, and the resulting decimal value is stored in the variable `decimal`.

- If `decimal` is not `None`, the code prints the resulting decimal otherwise error message. 

<br />

### Example testing


!['example-testing-hex-to-decimal'](../../../image/example-testing-hex-to-decimal.png)
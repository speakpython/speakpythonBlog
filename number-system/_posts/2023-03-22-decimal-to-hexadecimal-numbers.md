---
layout: post
heading: Mastering Decimal to Hexadecimal Conversion
keywords: ['decimal-to-hex']
author_id: 'dev3058'
credits: ['wikipedia']
level: 3
published: true
---

In this tutorial, we will explore how to convert decimal numbers to hexadecimal using Python. 

We will cover two main approaches: using the built-in `hex()` function and _implementing our own algorithm_.


!['case-converter'](https://www.ionos.ca/digitalguide/fileadmin/DigitalGuide/Teaser/zahlen-t.jpg)

## Decimal and Hexadecimal Numbers

Decimal and hexadecimal are two different numbering systems used to represent numbers in computing and mathematics.

__Decimal__, also known as _base-10_, is the numerical system that most people are familiar with, which _uses 10 digits (0-9)_ to represent values. 

- Each digit's position represents a power of 10. 

- For example, the number `1234` in decimal form represents the value of `1x10^3 + 2x10^2 + 3x10^1 + 4x10^0`.

__hexadecimal__, also known as `base-16`, is a numerical system that uses `16 digits (0-9, A-F)` to represent values. 

- Each digit's position represents a power of 16. 
- For example, the number `1A` in hexadecimal form represents the value of `1x16^1 + 10x16^0`, which is equal to `26` in decimal form.

<br/>

<hr>

_Before starting to write code, it's important to have a basic understanding of how the two numbering systems work._

__Resource link__: [How to Convert from Decimal to Hexadecimal](https://www.wikihow.com/Convert-from-Decimal-to-Hexadecimal).  

<hr>

<br />
>Keep calm coding begins...

### _hex_ - Built-in function

The `hex()` function in Python is used to convert an integer number to its corresponding hexadecimal string representation. 

```python
hex('15')

#Output: '0xf'
```
The output is a string `0xf`, which represents the hexadecimal value of `15`. The prefix `0x` is added to indicate that the string is in _hexadecimal format_.

<br/>

### decimalToHex - Custom function

We have defines two functions `decimalToHex()` and `toHexChar()`, which are used to convert a decimal value to its corresponding hexadecimal representation.


```python
def decimalToHex(decimalValue):
    hex = ""
    while decimalValue != 0:
        hexValue = decimalValue % 16
        hex = toHexChar(hexValue) + hex
        decimalValue = decimalValue // 16
    
    return hex

def toHexChar(hexValue):
    if 0 <= hexValue <= 9:
        return str(hexValue)
    return chr(hexValue - 10 + ord('A'))
```

Here's how it works:

`decimalToHex(decimalValue)` function takes an input decimal value and iteratively divides it by 16 `to` convert it into its corresponding hexadecimal representation. 

- The remainder of each division operation is used to compute the hexadecimal digit using the `toHexChar(hexValue)` function. 

- The hexadecimal digit is then _concatenated_ to the left of the previously computed digits. This process continues until the decimal value becomes zero.

`toHexChar(hexValue)` function takes an input integer value between 0 and 15 and returns its corresponding hexadecimal character representation. 

- If the input value is between `0` and `9`, the function returns its _string representation_. 

- Otherwise, it computes the character representation by subtracting `10` from the input value, adding the `ASCII` code of the character `A` to it, and returning the resulting character.

<br/>

### Driver Code - function calling

This code provides a way for a user to input a decimal number and convert it to its hexadecimal equivalent using the `decimalToHex()`.

```python
decimalValue = int(input("Enter a decimal Value: "))
print("The hex number for decimal", decimalValue, "is", decimalToHex(decimalValue))
```

<br />

### Example testing


!['example-testing-decimal-to-hex'](../../../image/example-testing-decimal-to-hex.png)
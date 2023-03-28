---
layout: post
heading:  Validating Credit and Debit Card Numbers
keywords: ['luhn-algorithm']
author_id: 'dev3058'
credits: []
level: 5
published: true
---

In this blog post, we'll be exploring how to validate credit and debit card numbers using Python. 

By the end of this post, you'll have a solid understanding of how the Luhn algorithm works and how to use it in Python to check whether a given card number is valid or not. 

!['tic-tac-toe-image'](https://www.serviceobjects.com/blog/wp-content/uploads/2019/02/Credit-Card-BIN.jpg)


## Luhn Algorithm

It is also known as the _mod 10 algorithm_, is a `checksum` formula used to validate identification numbers, including credit and debit card numbers. It works by performing a series of mathematical operations on the digits of the card number.

To validate a card number using the Luhn algorithm, 

- we start by doubling every second digit, starting from the second-to-last digit and working towards the beginning of the number

- If __doubling__ a digit results in a two-digit number, we add the two digits together to get a single digit.

- Then we _sum up all the digits_ in the resulting number, including the check digit. 

- If the _total sum is divisible by 10_, the card number is considered valid. Otherwise, it's __invalid__.

<br/>
<hr>


<br/>

> Keep calm coding begins....

## Card Validation in Python
These functions provide a basic implementation of the Luhn algorithm for validating credit and debit card numbers, by computing the sums of the digits in the odd and even positions of the number, and checking whether their sum is divisible by 10.



```python
def getDigit(number):
    if len(number) > 1:
        digitSum = 0
        for digit in number:
            digitSum += int(digit)
        return digitSum
    
    return int(number)

def sumOfDoubleEvenPlace(number):
    evenDigitSum = 0
    for i in range(1, len(number), 2):
        evenDigitSum += getDigit(str(int(number[i]) * 2))
        
    return evenDigitSum

def sumOfOddPlace(number):
    oddDigitSum = 0
    for i in range(0, len(number), 2):
        oddDigitSum += int(number[i])

    return oddDigitSum
```
 `getDigit(number)` computes the sum of the digits in a given number.

- If the number has more than one digit, it iterates over each digit in the number and adds them up, returning the resulting sum.  

- If the number has only one digit, it simply returns that digit as an integer.. 

`sumOfDoubleEvenPlace(number)` computes the sum of the digits in the _even positions of a card number_, after doubling each digit. 

- It does so by iterating over every second digit in the card number, starting from the _second-to-last digit (i.e., the second-to-rightmost position)_, and multiplying each digit by `2`. 

- The resulting numbers are then passed to `getDigit()` to get the sum of their digits, which are added to `evenDigitSum`.

`sumOfOddPlace(number)` computes the sum of the digits in the odd positions of a card number.

- It does so by iterating over every _second digit in the card number_, starting from the _leftmost position_, and adding each digit to `oddDigitSum`.

<br/>

### Driver Code - isValid(number)
It checks whether a given card number is valid by using the defined algorithm with some additional conditions.

```python
def isValid(number):
    if 14 <= len(number) <= 16:
        number = number[::-1]
        if (sumOfOddPlace(number) + sumOfDoubleEvenPlace(number)) % 10 == 0:
            return True

    return False
```
- It first checks whether the number has a valid length (i.e., between 14 and 16 digits).

- if the number is valid, it reverses the order of the digits in the number using the `[::-1]` syntax, and then computes the sum of the digits in the odd and even positions using `sumOfOddPlace()` and `sumOfDoubleEvenPlace()`. 

- If the resulting sum is divisible by `10`, the card number is considered _valid_, and the function returns `True`. Otherwise, it returns `False`.


### Example testing

Please note that given card numbers are just an example and should not be used for any illegal or fraudulent activities.

```python
number = '5105105105105100' #fictitious Mastercard Card Number
print(isValid(number))

#Output: True
```

```python
number = '4556567890123456' #fictitious Visa Card Number
print(isValid(number))

#Output: True
```
```python
number = '4559567990123456' #fictitious Visa Card Number
print(isValid(number))

#Output: False
```

<br />

<hr />

__Note__: _Defined solution, may not cover all possible card number validation scenarios, and may need to be adapted to meet specific requirements or use cases._
<hr />

<br/>
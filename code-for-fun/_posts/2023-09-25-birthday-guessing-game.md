---
layout: post
heading: Birthday Guessing Game
keywords: ['birthday-guess', 'binary-encoding']
author_id: 'dev3058'
credits: ['yongdaniel-liang']
level: 2
published: true
---

Imagine a code-breaking adventure where you can determine someone's birthdate with just a series of simple questions and Python's power. In this blog post, we'll unveil the secrets of a Python program that uses binary encoding to decipher birthdays. 

Let's embark on this digital journey and learn how to perform some Python sorcery!

!['case-converter'](../../../image/birthday.jpg)

## Simple Steps 🎂 

We are unveiling the secrets of a Python program that uses binary encoding to decipher birthdays, the code snippet you see below does just that. 

It takes you through a set of five questions, each narrowing down the possible birthdate until it finally reveals the day of the month. 

<hr>

<br />

>Keep calm coding begins...

### Complete code

The provided Python code snippet takes you on a journey through a sequence of questions, each designed to narrow down the potential birthdate.

```python
day = 0 # birth day to be determined 

# Prompt the user to answer the first question
question1 = \
"""
Is your birthday in Set1

  1  3  5  7
  9 11 13 15
 17 19 21 23
 25 27 29 31

 Enter 0 for No and 1 for Yes: 
""" 
answer = eval(input(question1 + ' >> '))

if answer == 1:
    day += 1
    
# Prompt the user to answer the second question
question2 = \
"""
Is your birthday in Set2

  2  3  6  7
 10 11 14 15
 18 19 22 23
 26 27 30 31

 Enter 0 for No and 1 for Yes:
""" 
answer2 = eval(input(question2 + ' >> '))

if answer2 == 1:
    day += 2

#Prompt the user to answer the third question
question3 = \
"""
 Is your birthday in Set3
 
 4  5  6  7
 12 13 14 15
 20 21 22 23
 28 29 30 31

 Enter 0 for No and 1 for Yes: 
"""
answer3 = eval(input(question3 + ' >> '))

if answer3 == 1:
    day += 4
    
#Prompt the user to answer the fourth question
question4 = \
"""
 Is your birthday in Set4
 
 8  9  10 11
 12 13 14 15
 24 25 26 27
 28 29 30 31
 
 Enter 0 for No and 1 for Yes: 
"""
answer4 = eval(input(question4 + ' >> '))

if answer4 == 1:
    day += 8
    
#Prompt the user to answer the last question
question5 = \
"""
Is your birthday in Set5

 16 17 18 19
 20 21 22 23
 24 25 26 27
 28 29 30 31
 
 Enter 0 for No and 1 for Yes: 
"""
answer5 = eval(input(question5 + ' >> '))

if answer5 == 1:
    day += 16

print("*"*24)
print("Your birthday is on " + str(day) + "!") #displayng result!
print("*"*24)

```
<br/>
Let's break down how this mysterious code works step by step:

##### Step 1: The Setup

- We begin by initializing a variable called `day` to `0`, representing an undetermined birthdate. The code then presents the first question, question1, asking if the birthdate falls within "`Set1`." Users respond with either `0` for "No" or `1` for "Yes."

##### Step 2: Enter Binary Decoding

- When a user responds "Yes" to the first question, the program adds `1` to the `day` variable. This may seem arbitrary, but _it's the essence of binary decoding_ in action. 

Each question corresponds to a specific binary digit, and answering "Yes" sets that digit to `1`.

##### Step 3: Journey Through the Sets

- The program continues by asking a series of questions, moving through "Set2," "Set3," "Set4," and finally "Set5." For each "Yes" answer, the day variable is incremented by a __power of 2 (1, 2, 4, 8, and 16, respectively)__. 

This binary representation ingeniously ensures that every day of the month has a unique combination of "Yes" and "No" answers.


##### Step 4: The Grand Revelation
- After the fifth question, the program performs a binary calculation to decode the birthdate's day of the month. The result is displayed in decimal form, unveiling the birthdate with precision. It's like solving a digital puzzle!

<br/>


### Example testing
Suppose my birtdhay is on 1st Date.

!['example-testing-hex-to-decimal'](../../../image/test.jpg)

### Conclusion
What you've seen here is not just a mere guessing game; it's a captivating showcase of binary decoding and logical deduction. By utilizing binary representations and simple questions, this Python program can accurately unveil any day of the month in a matter of moments. 

It's a testament to the versatility of Python and how it can transform complex tasks into straightforward solutions. So, the next time you want to impress your friends or colleagues, consider using this Python-powered binary guessing game to reveal their birthdays with flair!
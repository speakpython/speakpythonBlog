---
layout: post
heading: Text Case Manipulation Built-in and Custom
keywords: ['text-case-methods', 'custom-methods']
author_id: 'webriddler'
credits: []
level: 4
published: true
---

Today, we'll explore how to add new text case manipulation methods, as well as how to use the built-in methods in Python for maximum efficiency.

!['case-converter'](../../../image/string-case-banner.jpeg)

## Text cases in Python

Text cases in Python refer to the different ways in which the capitalization of letters in a string can be modified. There are several standard text cases that are commonly used, including _uppercase, lowercase, and title case_.

Text case manipulation is an important aspect of working with text data in Python, as it allows for the effective processing and formatting of strings in a variety of applications.

<br/>

### Types of text cases
There are basically five main types of text cases:

- __Uppercase__: In this case, all letters in a string are converted to uppercase letters.

- __Lowercase__: In this case, all letters in a string are converted to lowercase letters.

- __Titlecase__: In this case, the first letter of each word in a string is capitalized, while all other letters are lowercase.

- __Sentence case__: The first letter of the first word in the __sentence__ is capitalized while all other letters are in lowercase.

- __Inverse case__: The case of each letter in the string is swapped.

<br/>

>Keep calm coding begins...

## Built-in methods

Python offers a variety of built-in methods for manipulating text case, such as:

```python
string = "Speak python"
string.upper() #Output: SPEAK PYTHON
string.lower() #Output: speak python
string.title() #Output: Speak Python
string.capitalize() #Output: Speak python
string.swapcase() #Output: sPEAK PYTHON
```

- `upper()` : Returns a string in all uppercase letters.

- `lower()` : Returns a string in all lowercase letters.

- `capitalize()`: Returns a string with the first letter capitalized and the rest in lowercase.

- `title()`: Returns a string with the first letter of each word capitalized.

- `swapcase()`: Returns a string with uppercase letters converted to lowercase and vice versa.

Python does not have a built-in method for converting `text to sentence case`. However, we can create our own function to do this.

<br/>

### Sentence case - Custom Method

Sentence case is a style of writing where the first letter of the first word in a sentence is capitalized, while the rest of the words are in lowercase, _unless they are proper nouns or acronyms._

This is a Python function that converts a given string to sentence case.
<br/>

```python
def sentencecase(string):
    split_chr = ['!', '?', '.']
    string = string.lowercase()
    for c in split_chr:
        after_dec = string.split(c)
        new_str = ""
        for a in range(len(after_dec)):
            if(len(after_dec[a]) > 0):
                new_str += after_dec[a].strip()[0].upper() + after_dec[a].strip()[1:]
                if (len(after_dec) != a + 1):
                    new_str += c + ' '
        string = new_str
    return string
```

Here's how it works:

- It initializes a list of characters that are used to split the string into sentences. In this case, the list contains the characters __'!'__, __'?'__, and __'.'__.

- It converts the input `string` to `lowercase` using the `lower()` method, so that all words in the string can be properly capitalized.

- It then loops through the list of split characters, splitting the string into sentences at each occurrence of a split character.

- For each sentence, it converts the first letter of the first word to uppercase using the `upper()` method, and then __concatenates__ the rest of the sentence in lowercase using string __slicing__.

- It then appends the split character back to the sentence, and adds a space after it for formatting purposes.

Finally, it returns the fully formatted string in sentence case.

Here's an example of how to use this function:


```python
string = "hey There! hOW aRe yOU tOdaY? i hOPE yOU'rE dOING wELL."
print(sentencecase(text))
#Output: Hey there! How are you today? I hope you're doing well.
```


<br/>

<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="fluid"
     data-ad-layout-key="-fb+5w+4e-db+86"
     data-ad-client="ca-pub-4655390962543707"
     data-ad-slot="5226911603"></ins>

### Custom Text Case Conversion 

I have defined a Python class called `string` that contains several methods for manipulating text cases.
<br/>

```python
class string:
    def __init__(self, given_string):
        self.given_string = given_string
    
    def uppercase(self):
        return self.given_string.upper()
    
    def lowercase(self):
        return self.given_string.lower()
    
    def titlecase(self):
        return self.given_string.title()
    
    def capitalcase(self):
        return self.given_string.capitalize()
    
    def swapcase(self):
        return self.given_string.swapcase()
    
    def sentencecase(self):
        split_chr = ['!', '?', '.']
        self.given_string = self.lowercase()
        for c in split_chr:
            after_dec = self.given_string.split(c)
            new_str = ""
            for a in range(len(after_dec)):
                if(len(after_dec[a]) > 0):
                    new_str += after_dec[a].strip()[0].upper() + after_dec[a].strip()[1:]
                    if (len(after_dec) != a + 1):
                        new_str += c + ' '
            self.given_string = new_str
        return self.given_string
```

- The class is initialized with a given string, and provides methods for converting the string to uppercase, lowercase, title case, capital case, and inverse case. 

- Additionally, there is a method for converting the string to ['sentence case'](#sentence-case---custom-method).

<br />

### Example testing


```python
text = string("hey There! hOW aRe yOU tOdaY? i hOPE yOU'rE dOING wELL.")
```


```python
text.uppercase()
#Output: HEY THERE! HOW ARE YOU TODAY? I HOPE YOU'RE DOING WELL.

text.sentencecase()
#Output: Hey there! How are you today? I hope you're doing well.
```

<br />
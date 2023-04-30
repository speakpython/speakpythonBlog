---
layout: post
heading:  Balancing Braces and Parentheses
keywords: ['stack-push-pop', 'balancing-symbols']
author_id: 'dev3058'
credits: []
level: 4
published: true
---

In this blog post, we will explore how to use a stack in Python to balance symbols, and we will walk through a step-by-step guide on how to implement this solution. 


!['balancing'](https://miro.medium.com/v2/resize:fit:1400/0*PJ-SPI1RfWY8smKb)


## Symbol Balancing

Balancing symbols like braces and parentheses in code is a crucial task that every programmer needs to do. Failing to do so can lead to syntax errors, which can be difficult to find and fix. 

Luckily, there is an elegant solution to this problem using the stack data structure.

!['balancing-statement'](https://miro.medium.com/v2/resize:fit:1400/1*OQCqjov45xVUm3Tfrs-yxw.gif)

1. Define a stack data structure, which is a collection of elements that supports two main operations: `push` _(adds an element to the top of the stack)_ and `pop` _(removes the top element from the stack)_.

2. Iterate through each symbol in the statement. If the symbol is an opening symbol ( e.g., `{`, `(`, `[` ), push it onto the stack.

3. If the symbol is a closing symbol ( e.g., `}`, `)`, `]` ), check if it matches the opening symbol at the top of the stack. If it does, pop the opening symbol from the stack. If it doesn't, the statement is not balanced, and you can stop iterating.

4. After iterating through all symbols, check if the stack is empty. If it is, the statement is balanced. If it's not, the statement is not balanced.

<br/>
<hr>


<br/>

> Keep calm coding begins....

## Python Symbol Balancing
This is a Python program that uses a stack to check if a given string of symbols has a balanced arrangement.

```python
print("Input: ")
arrangement = input("")
arrangement = arrangement.replace(' ', '')
```

- The input is taken using the `input()` function and stored in the arrangement variable. 

- The `replace()` function is used to remove any white spaces from the input.


```python
symb = {
    "{" : "}",
    "[" : "]",
    "(" : ")",
}
stack = []
inc = 0
miss = None
```
- A dictionary called `symb` is defined to store the opening and closing symbols. The `keys` represent the _opening symbols_, and the `values` represent their corresponding _closing symbols_.

- An empty list called stack is initialized to act as the stack.

```python
for i in arrangement:
	if i in symb:
	    stack.append(i)
	    print("Push",i," >> ",stack)
	
	inc +=  1
	
	if i in symb.values():
	    key = [x for x in symb if symb[x] == i]
	    if stack and key[0] in stack:
	        peak = stack.pop()
	        if peak == key[len(key) - 1]:
	            key.pop()
	            print("Pop ",i," >> ",stack)
	            continue
	    miss = key[0]
	    break
	    
if not stack and not miss and inc == len(arrangement):
	print("\nValid Pattern")
else:
	print("\nInvalid Pattern")	
```
- A loop is used to iterate through each symbol in the input string. If the symbol is an opening symbol, it is added to the top of the stack using the `append()` function.

- If the symbol is a closing symbol, the program checks _if it matches the opening symbol_ at the top of the stack using the `pop()` function. If the matching opening symbol is found, it is removed from the stack.

- If the input string is completely processed and the _stack is empty_, then the pattern is considered __valid__. If the stack is _not empty_ or there is a _missing closing symbol_, then the pattern is considered __invalid__.

Finally, the program prints either "__Valid Pattern__" or "__Invalid Pattern__" based on the stack's status and the presence of any missing symbols.

### Example testing
!['symb-balancing-test-1'](../../../image/symb-balancing-test-1.png)

!['symb-balancing-test-2'](../../../image/symb-balancing-test-2.png)


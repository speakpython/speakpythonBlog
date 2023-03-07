---
layout: post
heading: Hangman - classic word game
keywords: ['problem-solving', 'fun-with-pyth']
author_id: 'dev3058'
credits: []
level: 4
---

Are you interested in creating a fun and interactive game in Python? If so, let's dive into building a Hangman game!

<br/>

!['Hangman'](https://www.rd.com/wp-content/uploads/2017/08/Here-Is-The-Hardest-Word-To-Guess-in-Hangman-According-To-Science-ft.jpg)

<br />

## About Hangman
Hangman is a __word guessing game__ where one player thinks of a word and the other player(s) try to guess it by suggesting letters. 

- The player(s) have a _limited number of guesses_ and for each incorrect guess, a part of a hanging man is drawn. 

- The game continues until the player(s) either guess the word correctly or the hanging man is fully drawn, in which case the game is lost.

<br/>

> Keep calm coding begins....

## Hangman in Python

<hr>
<br/>

### Required library and expected input.

This code sets up the puzzle answer and hint for the Hangman game, which will be used later in the game to generate the puzzle and provide hints to the user.

```python
from getpass import getpass
import math, random

string = getpass("\nProvide Puzzle Answer (Player 1) : ").strip().replace(" ", "").casefold()
hint = input('Any Hint : ')
```

>notes to the codes...

- The code above imports the `getpass` function from the `getpass` module, which allows the user to input a value without it being displayed on the screen.

- The next line prompts the user to input a puzzle answer which is then `stripped` of any leading or trailing `white spaces` and converted to `lowercase` letters. This ensures that the puzzle answer is __consistent__ and easier to compare with the user's guesses.

- Last line prompts the user to input a hint for the puzzle answer, which is stored in the `hint` variable. This hint can be displayed to the user during the game to provide additional context for the puzzle answer.

<br />

### Random and Custom Puzzle design

You can express the two ways of creating a puzzle for the Hangman game in your code by providing the user with the _option to either input their own word_ for the game or have the game _randomly select a word_ for them.

<br/>

##### Random puzzle design

<hr>

```python
def auto_puzzle(puzzle, missing_words = ""):
    for i in range((len(puzzle)//2)):
        random_value = puzzle[math.floor(random.random()*len(puzzle))]
        if random_value not in missing_words:
            missing_words += random_value
    for a in range(len(puzzle)):
        if puzzle[a] in missing_words:
            puzzle = puzzle.replace(puzzle[a],'_')
    return puzzle, missing_words
```

`auto_puzzle` that takes in a "puzzle" string and an optional `missing_words` string.

- The function first loops through half of the length of the puzzle string and randomly selects a character that is not already in the `missing_words` string.

- Next, the function loops through each character in the puzzle string and replaces any character that is in the `missing_words` string with an __underscore__.

<br/>

##### Custom puzzle design
<hr>

This function allows the user to manually select characters to be blanked out in the puzzle, and `returns` the updated puzzle and missing words to be used in the Hangman game.

```python
def custom_puzzle(puzzle, missing_words = ""):
    num_blanks = int(input('How many blanks you prefer? : '))
    while len(missing_words) < num_blanks:
        blank_char = input('which character you want to blanked : ')
        if blank_char in puzzle:
            puzzle = puzzle.replace(blank_char,'_')
            missing_words += blank_char
            print(puzzle)
        else:
            print('Element not exist in Puzzle')
    return puzzle, missing_words
```

- The function first prompts the user to input the number of blanks they would like to have in the puzzle by asking for an integer value. 

- It then enters a loop that runs until the number of missing words in the puzzle is equal to the desired number of blanks.

- Within the loop, the function prompts the user to input a character that they want to blank out. 

- If the character is present in the puzzle string, the function __replaces all instances__ of that character with an __underscore__ in the puzzle string, adds the character to the `missing_words` string, and prints the updated puzzle string to the console.

<br/>

### Validating Guesses

This function allows the user to make guesses for the missing characters in the puzzle and displays the updated puzzle string with correct guesses.

```python
def check_for_guess(puzzle, string, missing_words):
    false_attempt = 0
    while false_attempt < len(missing_words):
        if puzzle == string.lower():
                break
        ask = 'Remain Attempt : {} | Guess a Word (unique) : '.format(len(missing_words)-(false_attempt))
        guess = input(ask).casefold()
        if guess in missing_words and len(guess) == 1:
            for a in range(len(puzzle)):
                if string[a].lower() == guess:
                    puzzle = puzzle[:a] + guess + puzzle[a+1:]
            print('Keep it on ',puzzle)
        else:
            false_attempt += 1
            print('Oops! Try again')
    return puzzle
```

`check_for_guess` that takes in three parameters: the `puzzle` string, the `string` representing the answer, and the `missing_words` string that contains the characters that are missing from the puzzle.

- Within the loop, the function prompts the user to input a guess for the missing characters in the puzzle. The prompt also displays the number of remaining attempts.

- If the __guess__ is a single character and is present in the `missing_words` string, the function replaces the corresponding underscores in the `puzzle` string with the guessed character.

- It then outputs a message indicating that the guess is correct and displays the updated puzzle string.

- If the __guess__ is not a single character or is not present in the `missing_words` string, the function increments the `false_attempt` counter and outputs a message indicating that the guess is incorrect.

- The function continues looping until either the puzzle is solved (i.e., the `puzzle` string matches the `string` answer), or the user exhausts their attempts.

<br/>

### Understanding the driver code

It creates a puzzle for the game based on user input. The code first sets the variable `puzzle` equal to the input `string` that represents the answer to the puzzle.

```python
puzzle = string
if len(string) < 6:
    print('Answer should be > 6 characters')
else:
    false_attempt = 0
    puzzle_type = input('\nDo you want system designed puzzle? y/n : ')
    puzzle, missing_words = auto_puzzle(puzzle) if puzzle_type == 'y' or puzzle_type == 'Y' else custom_puzzle(puzzle)
    print('\n\nYour Puzzle (Player 2):',puzzle)
    print('Given hint: ',hint)
    given_answer = check_for_guess(puzzle, string, missing_words)
    print('\nCongratulation you won, Player 1 lost!') if given_answer == string.lower() else print('\nYou lost, Player 1 Won')
```

- If the answer is at least 6 characters long, the code prompts the user to input whether they want a system-generated puzzle or to create their own puzzle using the `custom_puzzle()`.

- The `auto_puzzle()` is called with the `puzzle` argument if the user wants a system-generated puzzle. Otherwise, the `custom_puzzle()`  is called with the `puzzle` argument.

- The code then displays the updated puzzle string and the hint provided by Player 1. 

- It allows Player 2 to make guesses for the missing characters in the puzzle and displays the updated puzzle string with correct guesses.


Finally, the code checks if the returned `given_answer` (which is the final puzzle string with any correct guesses) is equal to the `string` answer in lower case. 

If it is, the code prints a message indicating that __Player 2__ won and Player 1 lost. Otherwise, it prints a message indicating that Player 2 lost and __Player 1__ won.

<br/>

### Let's play for fun

<hr/>

!['hangman-player-1'](../../../image/hangman-player-1.png)

<hr/>

!['hangman-player-2'](../../../image/hangman-player-2.png)



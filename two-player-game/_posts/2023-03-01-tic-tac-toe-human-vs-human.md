---
layout: post
heading: Tic-tac-toe, Human vs Human
keywords: ['problem-solving', 'fun-with-python']
author_id: 'webriddler'
credits: ['wikipedia']
level: 5
published: true
---

Create a complete `three-by-three` Tic-Tac-Toe, two player game using basics of python. The game requires basic programming concepts such as variables, conditionals, loops, and functions.

!['tic-tac-toe-image'](../../../image/tic-tac-toe-banner.jpg)


## What is Tic-tac-toe

Tic-tac-toe, noughts and crosses, or Xs and Os is a paper-and-pencil game for `two players` who take turns marking the spaces in a `three-by-three grid` with X or O. 

The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row is the winner. 


```cpp
Note: In this module both players are human.
```

<hr>

Before you start exploring each modules you must have 

-  clear understanding - [how tic-tac-toe works](https://en.wikipedia.org/wiki/Tic-tac-toe)
-  basics of python programming - as always!


<br/>

> Keep calm coding begins....

## Tic-tac-toe in Python
<hr>


### Grid box pattern 

The `game_grid(value)` function takes a list value containing the current state of the Tic-Tac-Toe game board as input.


```python
def game_grid(value):  
    print("\n")  
    print("\t____________________")  
    print("\t|      |      |     |")  
    print("\t|    {} |  {}   |  {}  |".format(value[0], value[1], value[2]))  
    print('\t|______|______|_____|')  
    print("\t|      |      |     |") 
    print("\t|   {}  |  {}   |  {}  |".format(value[3], value[4], value[5]))  
    print('\t|______|______|_____|')  
    print("\t|      |      |     |")  
    print("\t|  {}   |  {}   |  {}  |".format(value[6], value[7], value[8]))  
    print('\t|______|______|_____|')
    print("\n") 
```

- The function prints the __Tic-Tac-Toe game board__ using __ASCII__ art to display the current state of the game. 

- The function prints a __3x3__ grid with lines and pipes using the values in the value list to represent the __Xs__ and __Os__ on the board.

- The value list contains 9 elements representing the 9 positions on the Tic-Tac-Toe board.

<br/>

### Possible winning patterns
The code defines a list called `wining_pattern` which contains sub-lists of all the possible winning combinations in a Tic-Tac-Toe game. 
<br/>

```python
wining_pattern = [
    
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
    
]
```
<br/>

### Game initialisation
We have some global data structures (list) which we want to update each time the game starts. 
<br/>

```python
default_values = [' ' for i in range(9)] #create a list of 9 single spaces 
players_moves = { 
    'X_moves': [], # record palyer X's taken moves
    'O_moves': []  # record palyer O's taken moves
}
players = ['X', 'O'] # signifies total number of players
taken_move = [] # records all the moves taken by both the players
```

<br/>

### Decide winner 
On the basis of taken steps, recorded inside `players_moves` dictionary, `check_wining` will decide the winner.
<br/>

```python
def check_wining(moves):
    for i in wining_pattern:
        if all(j in moves for j in i):
            return True 
    return False 
```

- The function `check_wining(moves)` takes a list moves as input, which contains the positions of the moves made by a player on the board. 

- The function checks if any of the sub-lists in `wining_pattern` is a _subset of moves_, which means the player has achieved a winning combination. If a _winning combination_ is found, the function returns `True`, otherwise it returns `False`.

<br/>

### Driver code [🧠 Brain]
Our `main()` function consists all the required logics,

- which enables the palyers to take alternative moves.
- prevents the overlapping of each moves.
- avoid invalid or already taken moven.

<br/>

```python
def main():
    step = 0
    game_grid(default_values)
    while step < 9:
        
        if step > 7:
            print('Match tied!')
            break
            
        player = players[step % 2]
        
        try:
            move = int(input(player + " : "))
            if move < 10 and move not in taken_move:
                taken_move.append(move)
                players_moves[player + '_moves'].append(move)
                default_values[move - 1] = player
                game_grid(default_values)
                step += 1
                if check_wining(players_moves[player + '_moves']):
                    print(player, 'Won!')
                    break
                continue

            print('Invalid move, try again!\n')

        except ValueError:
            print('Invalid move, try again!\n')
```

<br/>

### Example testing

Calling the `main()` function in order to start the game.
<br/>

```python
main() #calling driver code to start the game!
```
!['tic-tac-toe-code-output'](../../../image/tic-tac-toe-code-output.png)

<br/>

### Conclusion

<hr/>

Building a Tic Tac Toe game in Python is a great exercise for beginner programmers to practice their skills. Playing against another human player is a fun way to test the game and hone your strategy.

Additionally, the game can be expanded to include more [advanced concepts such as AI algorithms for a single player mode](somelink). 


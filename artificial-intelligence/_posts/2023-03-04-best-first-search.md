---
layout: post
heading: Best-first search (BFS)
keywords: ['search-algorithm', 'problem-solving']
author_id: 'dev3058'
credits: ['wikipedia']
level: 6
---

Implementing basic approaches of Best-first search (Informed Search) by using `heapq` module of python.

!['bfs-image'](https://www.fnr.lu/wp-content/uploads/2020/01/1_3u0f1sqBMUS-kLmVhs40kw.jpeg)

## Best-first Search (BFS)

Best-first search is a class of `search algorithms`, which explores a graph by expanding the most promising node chosen according to a specified rule.

Judea Pearl described the best-first search as estimating the promise of node `n` by a heuristic evaluation function 
`f(n)`. 


```cpp
Note: In this module we will use pre-defined f(n).
```

<hr>

It's must that you should have all the basic ideas about 

-  [how best-first search algorithm works](https://iq.opengenus.org/best-first-search/)
-  __basics of python__ programming - as always!


<br/>

> Problem domain and solution... 

### Understanding problem

As per given graph we need to move from `S` to `G`. Start node i.e. `S` having heruistic value as `h(8)`.

!['bfs-problem-domain-1'](../../../image/bfs-problem-domain-1.png)

<br/>

### Possible solution

By using the given heruistic function we have maintained a `priority queue` as per BFS algorithm.

!['bfs-problem-domain-1'](../../../image/bfs-problem-domain-1-solution.png)

Hence the best path as per BFS is `S -> C -> G`.

<br/>

> Keep calm coding begins....

## BFS using Python

<hr>

### Graph relations and heuristic

The code defines two dictionaries `graph_relation` and `heuristic`.

```python
graph_relation = {
    "S": ["A", "B", "C"],
    "A": ["D", "E", "G"],
    "B": ["G"],
    "C": ["G"],
    "D": [""],
    "E": [""],
    "G": [""],
}

heuristic = {
    "S": 8,
    "A": 8,
    "B": 4,
    "C": 3,
    "D": -1,
    "E": -1,
    "G": 0,
}
```


- `graph_relation` represents a graph where each key represents a node and its corresponding value represents a list of nodes that are adjacent to it. 

For example, the key __S__ has adjacent nodes __A__, __B__, and __C__. Nodes __D__, __E__, and __G__ have no adjacent nodes, so their lists are empty strings.

- `heuristic` represents a heuristic function that assigns a numerical value to each node representing its estimated distance from the goal node. 

A lower heuristic value indicates that the node is closer to the goal node. In this example, the goal node is __G__.


<br/>

### Required library

We will use only two predefined methods of `heapq`,

```python
import heapq
```

- `heapq.heappop()`

The heappop method __pops__ and returns the smallest element of the given heap.

- `heapq.heappush()`

This function __adds__ an element to the heap without altering the current heap.

<br/>
### BFS function
Inside `best_first_search()` function we are maintaining,

- `que` - a list, having tuples, consisting current node and its `h()` value.
- `came_from` - a dict used to track the nodes which are already visited.

<br/>

```python
def best_first_search(graph, start, goal, heuristic):
    """
    graph: Dict having Tree Structure.
    start: Starting Node of the Tree.
    goal: Node to Search.
    heuristic: List of heuristic cost.
    """
    que = [(heuristic[start], start)]
    came_from = {}
    came_from[start] = None
    
    while que:
        _, peak_node = heapq.heappop(que)
        
        if peak_node == goal:
            break
            
        for neighbor in graph[peak_node]:
            if neighbor not in came_from:
                heapq.heappush(que, (heuristic[neighbor], neighbor))
                came_from[neighbor] = peak_node
    
    return came_from
```

<br/>

### Function calling

Calling the `best_first_search()` function with required __args__.
<br/>

```python
start_node = 'S'
goal_node = 'G'
came_from = best_first_search(graph_relation, start_node, goal_node, heuristic)
print(came_from)
```

>>how a node visited another node - this data is traced by `came_from` dict.

```python
{'S': None, 'A': 'S', 'B': 'S', 'C': 'S', 'G': 'C'} #Output
```

<br/>

### Backtracking

In order to have the __optimal__ path _(somehow)_, we need to backtrack the `came_from` starting from the `goal_node`

```python
node = goal_node
path = [node]

while node != start_node:
    node = came_from[node]
    path.append(node)
    
path.reverse()
print("BFS path from",start_node,"to",goal_node,":",path)
```

```python
BFS path from S to G : ['S', 'C', 'G'] #Output
```





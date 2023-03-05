---
layout: post
heading: Best-first search (BFS)
keywords: ['search-algorithm', 'problem-solving']
author_id: 'dev3058'
credits: ['wikipedia']
level: 6
---

Implementing basic approaches of Best-first search (Informed Search) by using `heapq` module of python.

<br/>
!['Water Jug Image'](https://d1m75rqqgidzqn.cloudfront.net/wp-data/2019/12/18153623/shutterstock_178143896.jpg)

<br/>
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
-  basics of python programming - as always!


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

## Understanding modules
<hr><br/>

### Graph relations and heuristic
As per given graph define a dictionary with all the connected nodes inside a list as value to the parent node (key).

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

<br/>

### Required library
We will use only two predefined methods of `heapq`,

```python
import heapq
```

- `heapq.heappop()`

The heappop method pops and returns the smallest element of the given heap.

- `heapq.heappush()`

This function adds an element to the heap without altering the current heap.

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

Calling the `mbest_first_searchain()` function with required args.
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
In order to have the optimal path (somehow), we need to backtrack the `came_from` starting from the `goal_node`

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





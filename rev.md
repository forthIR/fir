
reversible version of machine


code, stack, stash, trace  <-- reverse code

```
[[code [push x cs] [stack ss]   [stash ss] [trace ts]]]
[[code cs          [stack x ss] [stash ss] [trace [rev [drop]] ts]

[[code drop cs] [stack s ss] sh [trace ts]]]
[[code cs       [stack ss]   sh [trace [rev [push s]]
```

When a loop is executed, it leaves a trace that looks like an unrolled loop.
When a case is executed, it leaves a trace of all the branches it didn't take.

A loop can be implemented with recursive ADT constructors, while a case is a destructor.
In both cases, the "machine view" is a much more practical representation.
Here we have a 'program counter' which is actually a control stack called the 'program path'.
Now the trace only needs to contain data, not instructions.

```
[revfir [code path stack stash trace]]
```

Operations on stacks, and what they modify
  push     path stack
  swap     path stack
  drop     path stack       trace
  tostash  path stack stash
  unstash  path stack stash


Reversible arithmetic requires dummy variables.

(a, b)  (a*b, b)
(x/y,y)  (x, y)


(a, b, a - b, - a)   (a + b, -b, b - a, b)
something like this I forgot too lazy now







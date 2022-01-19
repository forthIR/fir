### fir -- Portable Compact AST for pure concatenative functions

* fir is a binary AST describing a metered VM with a small core of stack-only opcodes, including a few O(1) RLP operations
* you can use fir as a lightweight/embedded functional scripting engine
* you can use fir as the foundation for a new VM or language by inventing rules for how to glue together the result of fir functions at each step
* at the heart of fir is a recursive `eval/step` opcode, which can advance arbitrarily nested representations of the VM in O(1) time (amortized)
    * in other words, fir scripts can make use of metered sandboxing and virtualization, with nesting, with zero overhead
    * all of this is in a purely functional context with an explicit canonical serialization/merkelization of the entire VM at each step
    * this possibly makes fir a new paradigm for smart contract VMs, with nested rollups as just the tip of the iceberg
    * if you're just embedding fir for regular stuff, you can disable `step` support and/or metering for massive performance gains and ultra minimalist semantics
* fir is inspired by evm, nock, wasm, lisp, and forth

### RLP as both AST and binary for LISPs and Forths

RLP makes a good bytecode encoding because half of the one-byte values are serialized directly, and a list of these is serialized directly in a byte sequence.
Naturally, you will want core ops that manipulate RLP. This gives you a nice homoiconic foundation for your deterministic VM.

A core subset of basic stack ops for specifying pure functions that are guaranteed to terminate is useful for any higher level language. You can statically determine worst-case execution cost.
This core does have basic define/call that is equivalent to inlining.

All items on the stack are RLP objects, recursive lists with buffers at the leafs.
RLP operations all take constant time in the implementation, this requirement basically defines the set of operations.
These are usable like cons lists or buffer, depending on node type.

Draft opcode table below.

```
00-
3f  push/<k>
40  push/data <d>

    stack/dup
    stack/drop
    stack/swap
    stack/rot

    rlp/isBlob
    rlp/isList

    num64/cast, cast-try
    num64/add,sub,...,not,and,or
    num64/add-try, sub-try, etc
    
    (rlp/isBlob)
    blob/len
    blob/cat
    blob/slice
    [blob/zeros <k>]

    (rlp/isList)
    list/len
    list/cat
    list/cons
    list/head
    list/tail
    list/lempty
    list/wrap
    list/unwrap

    [control/case [k,f]* f?]
    [control/loop k f]

    [control/bind f* f]
    [control/call k]
    
    control/break      // variants:  (loop|case)*cleanstack?
    control/continue   // variants:  (loop|case)*cleanstack?
    control/ret        // variants:  cleanstack?*flag?
    control/trap       // variants:  many...

70  [eval/step k]      // advance the state of the emulation frame on the data stack
71  [eval/frame k]     // put binding k onto the data stack as a fresh evaluation frame
7f  unreachable

#  extensions

80+ extended instruction set (2-byte+ operations)




```

### scratchpad

```// put first element of first list as first element of second list
demote := head rot cons swap

---- [[a,b,c], [d,e,f]]
head [[a,b,c], [d,e], f]
rot  [[d,e], [a,b,c], f]
cons [[d,e], [a,b,c,f]]
swap [[a,b,c,f], [d, e]]
````


```
[loop '5',
  [case
    [ '0', push/0 push/0 drop ]
    [ '1', push/1 push/0 drop ]
    push/7 ] ]
```
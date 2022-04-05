```
// `trip` and slightly more ergonomic `dive` rules

'm ['trip .c0] [['trap .c1] s1] s0
'm ['trip .c0] ['m .c1 .s1] s0

'm ['trip .c0] ['m ['trap .c1] s1] s0
'm .c0 [['trap .c1] s1] s0

// mini

'm ['i .c]       => 'm ['m .c]
'm ['m ['o .c]]] => 'm ['o ['i .c]]

'm 'trap .c0
communicate with environment

'm ['trip .code]
'm ['m .code]

'm ['m ['trap .code]]
'm ['trap ['trip .code]]


// no stack variant as dive

'm ['dive .c1]
'm ['dive ['m .c1]]

'm ['dive ['m ['trap .c1]]]
'm .c1

// variant with stack, trace, and metering

'm ['trip .c0] [['trap .c1 .s1 .t1 .n1] .t0 .n0
'm ['trip .c0] ['m .c1 .s1 .t1 .n1] .t1 .n1

'm ['trip .c0] ['m ['trap .c1] .s1 .t1 .n1] .t0 .n0
'm .c0 [['trap .c1] .s1 .t1 .n1] .t0 .n0
```
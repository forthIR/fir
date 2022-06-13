const ebnf = require('ebnf')
const it = require('tapzero').test

const gram = `
frag ::= WS* "[" WS* (WS* op WS*)* WS* "]" WS*
op   ::= "_ADD"
       | "_SWAP"
       | "[" WS* "_PUSH" WS* num WS* "]"
num  ::= [0-9]+
WS   ::= [" " | "\n" | "\t" | "\r"]+
`

const parser = new ebnf.Grammars.Custom.Parser(gram)

it('grammar', t=>{
    const code0 = `[ _ADD _ADD ]`
    const ast0 = parser.getAST(code0)
    console.log(ast0)

    const code1 = `[ [ _PUSH 1 ] [ _PUSH 2 ] _SWAP _ADD ]`
    const ast1 = parser.getAST(code1)
    console.log(ast1)
})





step = (code, stack) => {
    pp = stack.pop()
    op = extract(code, pp)
    f = ops(op)
    [code, pp, stack] = f(code, pp, stack)
    return [code, [pp, stack]]
}

step = (code, cstack, dstack) => {
    op = extract(code, cstack)
    [cstack, dstack] = stepOp(op, cstack, dstack)
    return [code, cstack, dstack]
}

step = (frame) => {
    [[code, cstack], dstack] = frame
    op = extract(code, stack)
    [cstack, dstack] = stepOp(op, cstack, dstack)
    return [[code, cstack], dstack]
}


/*
step = \frame/frame2.
  [code stack] dstack = frame
  op = extract code stack
  [cstack dstack] = stepOp op cstack dstack
  return [code, stack], dstack
;

step = \ frame:Frame / :frame .
  [[code, stack], dstack] = frame
  op = extract(cstack, dstack)
  ^ [[code, cstack], dstack]
;

= step \ frame:Frame / :Frame .
= [[code stack] dstack] frame
  = op (extract cstack dstack)
  ^ ret [[code cstack] dstack]
;
*/

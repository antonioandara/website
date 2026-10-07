---
title: Thinking in bits
slug: thinking-in-bits
summary: Eight switches. One number. A small experiment in how computers represent quantities.
---

## A number you can touch

A bit has two states: **0** and **1**. Put eight bits together and each position carries a different weight, from 128 on the left to 1 on the right.

Try the calculator below. Toggle a bit in row **A**, watch its decimal value change, then set a second number in row **B**.

<binary-calculator id="preview-bits" />

## Check your intuition

```quiz id="preview-bit-question"
question: What is the decimal value of 00001010?
type: single-choice
options:
  - text: 8
    correct: false
  - text: 10
    correct: true
  - text: 12
    correct: false
feedback:
  correct: Exactly. The set bits contribute 8 and 2.
  incorrect: Look at the weights of the two set bits. Count from the right: 1, 2, 4, 8.
```


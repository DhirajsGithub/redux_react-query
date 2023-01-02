# Working with forms and User Input

## What's Complex About Forms ?
### Forms and inputs can Assume different states
|                   one or more inputs are invalid                   |        all inputs are Valid        |
| :----------------------------------------------------------------: | :--------------------------------: |
| Output input-spcific error messages & highlight problematic inputs |
|                Ensure form can't be submitted/save                 | Allow form to be submitted / saved |


## When to Validate ?

|               When a form is Submitted               | When a input is losing focus | on every key stroke |
| :--------------------------------------------------: | :--------------------------: | :-----------------: |
| allows the user before to eneter valid value warning | allows the user before to eneter valid value warning | Warns the user before user had a chance of entering valid values
| Avoid unnecessary warnings but maybe present feedback "too late" | very useful for untouched form | If applied only on invalid inputs, has a potential of providing more direct feedback
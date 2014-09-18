#!/bin/bash
for fn in $@; do
    if [ -e "$fn" ]; then
        cat "$fn"
    else
        [ -e "../snippets/$fn" ] && cat "../snippets/$fn"
    fi
done

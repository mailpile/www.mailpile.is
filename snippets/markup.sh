#!/bin/bash
FORMAT=$(sed -e '/^$/,$ d' < "$1" |grep -ie "^Format: " |cut -f2 -d\ )
if [ "$FORMAT" = 'html' ]; then
  sed -e '1,/^$/ d' < "$1"
else
  sed -e '1,/^$/ d' < "$1" |markdown
fi

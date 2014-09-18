#!/bin/bash
VARS="$1"
BASEURL="http://www.mailpile.is/$(basename $(pwd))/"
exec sed \
  -e "s^@SUBJECT@^`grep ^Subject: $VARS |head -1|cut -f2- -d' '`^g" \
  -e "s/@AUTHOR@/`grep ^Author: $VARS |head -1|cut -f2- -d' '`/g" \
  -e "s^@DATE@^`grep ^Date: $VARS |head -1|cut -f2- -d' '`^g" \
  -e "s^@BASEURL@^$BASEURL^" \
  -e "s^@URL@^`echo $VARS |sed -e s,.md$,.html,`^" \

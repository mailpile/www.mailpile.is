EXPAND=snippets/expand.sh
MARKUP=snippets/markup.sh
SOURCES=$(wildcard *.md)
PAGES=$(SOURCES:.md=.html)
SNIPPETS=Makefile \
         snippets/head.html \
         snippets/head.rss \
         snippets/body.html \
         snippets/page-top.html \
         snippets/post-fragment.html \
         snippets/tail.html \
         snippets/tail.rss

all: blogposts pressrels donatepage pages faqpage

blogposts:
	@cd blog && make

donatepage:
	@cd donate && make

pressrels:
	@cd press && make

faqpage:
	@cd faq && touch index.md && make

pages: $(PAGES)

%.html: %.md $(SNIPPETS) $(EXPAND) $(MARKUP)
	@(cat snippets/head.html snippets/body.html \
           |$(EXPAND) $<; \
	 $(MARKUP) $<; \
	 $(EXPAND) $< < snippets/tail.html) >$@
	@ls -l $@


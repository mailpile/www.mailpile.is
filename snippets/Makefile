EXPAND=../snippets/expand.sh
SNIPPET=../snippets/snippet.sh
MARKUP=../snippets/markup.sh
SOURCES=$(wildcard *.md)
PAGES=$(SOURCES:.md=.html)
SNIPPETS=Makefile \
	 ../snippets/head.html \
	 ../snippets/head.rss \
	 ../snippets/body.html \
	 ../snippets/page-top.html \
	 ../snippets/post-top.html \
	 ../snippets/post-fragment.html \
	 ../snippets/page-bottom.html \
	 ../snippets/tail.html \
	 ../snippets/tail.rss

pages: $(PAGES) contents.html index.rss

%.html: %.md $(SNIPPETS) $(EXPAND) $(MARKUP) $(SNIPPET)
	@[ -e $<.py ] && python $<.py > $< || true
	@($(SNIPPET) head.html body.html *-page-top.html \
	   |$(EXPAND) $<; \
	  $(MARKUP) $<; \
	  $(SNIPPET) *-page-bottom.html tail.html \
	   |$(EXPAND) $<;) >$@
	@ls -l $@

contents.html: contents.txt . $(SNIPPETS) $(EXPAND) $(MARKUP)
	@($(SNIPPET) head.html body.html page-top.html \
	    |$(EXPAND) contents.txt; \
	 for P in $$(ls -1 *md|sort -r |head -4); do \
		$(SNIPPET) post-top.html |$(EXPAND) $$P; \
	        $(MARKUP) $$P; \
		echo '<hr>'; \
	 done; \
	 echo "<h3>Older stuff</h3><ul>"; \
	 for P in $$(ls -1 *md|sort -r |sed -e '1,4 d'); do \
		$(SNIPPET) post-fragment.html | $(EXPAND) $$P; \
	 done; \
	 echo "</ul><hr></div></div>"; \
	 $(SNIPPET) tail.html |$(EXPAND) contents.txt) >$@
	@ls -l $@

index.rss: contents.txt . $(SNIPPETS) $(EXPAND)
	@($(SNIPPET) head.rss |$(EXPAND) contents.txt; \
	 for P in $$(ls -1 *md|sort -r |head -7); do \
		$(SNIPPET) item-top.rss |$(EXPAND) $$P; \
	        $(MARKUP) $$P \
	          |sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g'; \
		$(SNIPPET) item-bot.rss |$(EXPAND) $$P; \
	 done; \
	 $(SNIPPET) tail.rss |$(EXPAND) contents.txt) >$@
	@ls -l $@


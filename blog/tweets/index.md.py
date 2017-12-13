#!/usr/bin/python
import copy
import json
import markdown
import pytz
import os
import re
import subprocess
import sys
import tweepy

# Parameters.
me = 'MailpileTeam'
maxtweets = 20
homedir = os.path.dirname(__file__)
tweetjson = os.path.join(homedir, 'tweets.json')
relativize = 'https://www.mailpile.is'
urlprefix = 'https://twitter.com/%s/status/'
datefmt = '%a, %d %b %Y %H:%M'
homeTZ = pytz.timezone('UTC')


def setup_api():
  """Authorize the use of the Twitter API."""
  a = {}
  with open(os.environ['HOME'] + '/.twitter-credentials') as credentials:
    for line in credentials:
      k, v = line.split(': ')
      a[k] = v.strip()
  auth = tweepy.OAuthHandler(a['consumerKey'], a['consumerSecret'])
  auth.set_access_token(a['token'], a['tokenSecret'])
  return tweepy.API(auth)


TWO_RE = re.compile(r'(^|\s+)([#@][A-Za-z0-9_]+)\b')

def expand_twords(text):
  fmt = '%s<a href="https://twitter.com/%s%s">%s</a>'
  def replace_tword(m):
    space, word = m.group(1), m.group(2)
    if word[0] == '@':
      return fmt % (space, '', word[1:], word)
    else:
      return fmt % (space, 'hashtag/', word[1:], word)
  return TWO_RE.sub(replace_tword, text)


TCO_RE = re.compile(r'(https?://t.co/[A-Za-z0-9_]+)')

def expand_urls(text, mappings=None):
  mappings = {} if (mappings is None) else mappings
  def replace_url(m):
    url = m.group(1)
    if url in mappings:
      return mappings[url]
    try:
      lines = ('\n'.join(subprocess.Popen(['curl', '-sI', url],
                                          stdout=subprocess.PIPE,
                                          stderr=subprocess.PIPE
                                         ).communicate())).split('\n')
      loc = [l for l in lines if l.lower().startswith('location: ')][-1]
      dest = loc.split(': ', 1)[1].strip()
      mappings[url] = dest
      return mappings[url]
    except (subprocess.CalledProcessError, IndexError):
      return url
  return mappings, TCO_RE.sub(replace_url, text)

def markdown_urls(et, mappings):
  def trunc(u):
    if len(u) > 43:
      u = ('/'.join(u.split('/')[2:4]))[:40] + '...'
    return u
  def rel(u):
    if u.startswith(relativize):
      return u[len(relativize):]
    return u
  for url, dest in mappings.iteritems():
    et = et.replace(dest, '[%s](%s)' % (trunc(dest), rel(dest)))
  return et


# Authorize.
try:
  api = setup_api()

  # Collect all the tweets since the last one.
  tweets = []
  tweets.extend(api.user_timeline(me, count=(maxtweets * 2),
                                      include_rts=False,
                                      exclude_replies=True,
                                      tweet_mode="extended"))
  tweets.sort(key=lambda t: t.created_at)
  tweets = reversed(tweets[-maxtweets:])

  # Write Tweets to STDOUT as Markdown
  data = []
  output = [
    '# Twitter',
    '']
  for t in tweets:
    ts = pytz.utc.localize(t.created_at).astimezone(homeTZ)

    try:
      frm = t.author.screen_name
    except AttributeError:
      frm = me

    try:
      txt = t.full_text
    except AttributeError:
      txt = t.text

    txt = txt.replace('&lt;', '<').replace('&gt;', '>').replace('&amp;', '&')
    urlmap, et = expand_urls(expand_twords(txt))
    tweet = {
      'from': frm,
      'date': ts.strftime(datefmt).decode('utf8'),
      'link': '%s%s' % (urlprefix % frm, t.id_str),
      'tweet': txt.replace('\n', '\n '),
      'urls': urlmap,
      'expanded_tweet': et}
    tweet['markdown_tweet'] = markdown_urls(et, urlmap).strip().replace('\n', '  \n')
    tweet['markdown_tweet'] = ("""\
%(markdown_tweet)s  
*[@%(from)s](https://twitter.com/%(from)s), [%(date)s](%(link)s)*  
""") % tweet
    tweet['html_tweet'] = ('<div class="tweet">%s</div>\n'
      % markdown.markdown(tweet['markdown_tweet']))
    data.append(tweet)
    output.append(tweet['html_tweet'])

  # Write tweets out to the JSON file.
  json.dump(data, open(tweetjson, 'wb'), indent=2)

  with open(os.path.join(homedir, 'index.bak'), 'w') as fd:
    fd.write('\n'.join(output).encode('utf-8'))
  print '\n'.join(output).encode('utf-8')

except:
  import traceback
  sys.stderr.write(traceback.format_exc())
  with open(os.path.join(homedir, 'index.bak'), 'r') as fd:
    print fd.read() 

#!/usr/bin/python
#
# This is a command-line utility that allows one to use the Jinja2 templating
# engine to work with static files.
#
# Usage examples:
#
#    # Render to standard output
#    jinjatool.py input.jinja
#
#    # Render to a named file
#    jinjatool.py input.jinja:output.html
#
#    # Render the same template twice using different variables
#    jinjatool.py title=Great input.jinja:great.html \
#                 title=Sucks input.jinja:sucks.html
#
#    # Calculate Makefile-style dependencies for some templates
#    jinjatool.py --deps thing.jinja otherthing.jinja
#
# The variables provided to the Jinja rendering engine are the Unix
# environment variables, optionally updated/augmented with foo=bar pairs
# from the command line as illustrated above.
#
# Variable definitions and input/output rendering pairs can be mixed and
# matched and will be processed in order.
#
import copy
import jinja2
import jinja2.utils
import json
import os
import re
import subprocess
import sys

from jinja2.ext import Extension
from markdown import markdown


# This lets us spy on which files get opened, for calculating dependencies.
REAL_OPEN = open
OPENED_FILES = set()

def open(fn, *args, **kwargs):
    try:
        rv = REAL_OPEN(fn, *args, **kwargs)
        OPENED_FILES.add(os.path.abspath(fn))
        return rv
    except:
#       sys.stderr.write('Failed to open: %s\n' % fn)
        raise

jinja2.open = open
jinja2.utils.open = open


# This is a Jinja extension which gives us cat, markdown and json processing
class JinjaToolExtension(Extension):
    def __init__(self, env):
        Extension.__init__(self, env)
        env.globals['cat'] = self._cat
        env.globals['ls'] = self._ls
        env.filters['set'] = self._set
        env.filters['date'] = self._date
        env.filters['without'] = self._without
        env.filters['markdown'] = self._markdown
        env.filters['to_json'] = self._to_json
        env.filters['from_json'] = self._from_json
        env.filters['from_rfc822'] = self._from_rfc822

    def _ls(self, dirname, pattern='^[^\.]'):
        try:
            OPENED_FILES.add(os.path.abspath(dirname))
            return sorted([fn for fn in os.listdir(dirname)
                           if re.search(pattern, fn)])
        except (OSError, IOError):
            return None

    def _cat(self, fn):
        try:
            return open(fn, 'r').read().decode('utf-8')
        except (OSError, IOError):
            return None

    def _date(self, data, fmt='%Y-%m-%d', field='date'):
        if isinstance(data, dict):
            d = copy.copy(data)
            d[field] = self._date(d[field], fmt=fmt)
            return d
        try:
            if fmt[:1] not in ('-', '+'):
                fmt = '+%s' % fmt
            data = data.replace(',', ' ')
            if ':' not in data:
                data += ' 12:00'
            return subprocess.check_output(['date', fmt, '--date', data]
                                           ).decode('utf-8').strip()
        except (OSError, IOError, subprocess.CalledProcessError):
            return data

    def _set(self, data, field, var):
        d = copy.copy(data)
        d[field] = var
        return d

    def _without(self, data, skip=[]):
        d = {}
        skip = set([s.lower() for s in skip])
        for k, v in data.iteritems():
            if k.lower() not in skip:
                d[k] = v
        return d

    def _markdown(self, text):
        return jinja2.Markup(markdown(text))

    def _to_json(self, data):
        j = json.dumps(data, sort_keys=True, indent=2)
        j = j.replace('<', '\\x3c').replace('&', '\\x26')
        return jinja2.Markup(j)

    def _from_json(self, data):
        return json.loads(data)

    def _from_rfc822(self, text, parse_markdown=True):
        header, body = ((text or '') + '\n\n'
                        ).replace('\r', '').split('\n\n', 1)
        header_lines = header.splitlines()
        if not (header_lines and ':' in header_lines[0]):
            body = header + '\n\n' + body
            header, header_lines = '', []

        rfc822 = dict([(h1.lower(), h2.strip())
                       for h1, h2 in [h.split(':', 1)
                                      for h in header_lines if ':' in h]])

        if parse_markdown and rfc822.get('format') in (None, '', 'markdown'):
            rfc822['body'] = markdown(body).rstrip()
        else:
            rfc822['body'] = body.rstrip()
        return rfc822


def MakeJinjaEnvironment():
    script_path = os.path.dirname(os.path.abspath(__file__))
    script_parent = os.path.abspath(os.path.join(script_path, '..'))
    return jinja2.Environment(
        loader=jinja2.FileSystemLoader(searchpath=[script_path,
                                                   script_parent,
                                                   '/']),
        autoescape=True,
        extensions=['jinja2.ext.with_',
                    'jinja2.ext.do',
                    'jinja2.ext.autoescape',
                    JinjaToolExtension]
    )


def Main():
    global OPENED_FILES

    jinja_env = MakeJinjaEnvironment()
    variables = copy.copy(os.environ)
    depcheck = False
    basedir = os.path.abspath('.')

    for arg in sys.argv[1:]:

        if '=' in arg:
            k, v = arg.split('=', 1)
            variables[k] = v

        elif arg.startswith('-'):
            arg = arg.replace('-', '')
            if arg == 'deps':
                depcheck = True
            elif arg == 'nodeps':
                depcheck = False

        else:
            infile, ofile = (':' in arg and arg.split(':') or (arg, None))
            inpath = os.path.abspath(infile)
            inrelpath = os.path.relpath(inpath)
            assert(os.path.exists(inpath))

            # This renders the data, hooray!
            try:
                os.chdir(variables.get('dir', os.path.dirname(inpath)))
                template = jinja_env.get_template(inpath)
                data = template.render(variables).encode('utf-8')
                os.chdir(basedir)
            except:
                if depcheck:
                    print '# FAILED DEPS: %s' % inpath
                    continue
                else:
                    raise

            if depcheck:
                deps = sorted([os.path.relpath(o) for o in OPENED_FILES])
                if ofile:
                    relofile = os.path.relpath(os.path.abspath(ofile))
                    if relofile in deps:
                        deps.remove(relofile)
                    print '%s: %s' % (relofile, ' '.join(deps))
                else:
                    deps.remove(inrelpath)
                    print '%s: %s'  % (inrelpath, ' '.join(deps))

                # Clear caches so each dependency list is correct
                jinja_env = MakeJinjaEnvironment()
                OPENED_FILES = set()
            else:
                if ofile:
                    open(ofile, 'w').write(data)
                else:
                    sys.stdout.write(data)
                    sys.stdout.write('<!-- EOF:%s -->\n' % infile)

Main()

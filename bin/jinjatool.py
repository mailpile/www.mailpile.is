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
import sys

from jinja2.ext import Extension
from markdown import markdown


# This lets us spy on which files get opened, for calculating dependencies.
REAL_OPEN = open
OPENED_FILES = set()

def open(fn, *args, **kwargs):
    OPENED_FILES.add(os.path.abspath(fn))
    return REAL_OPEN(fn, *args, **kwargs)

jinja2.open = open
jinja2.utils.open = open


# This is a Jinja extension which gives us cat, markdown and json processing
class JinjaToolExtension(Extension):
    def __init__(self, env):
        Extension.__init__(self, env)
        env.globals['cat'] = self._cat
        env.filters['markdown'] = self._markdown
        env.filters['to_json'] = self._to_json
        env.filters['from_json'] = self._from_json

    def _cat(self, fn):
        return open(fn, 'r').read().decode('utf-8')

    def _markdown(self, text):
        return jinja2.Markup(markdown(text))

    def _to_json(self, data):
        j = json.dumps(data, sort_keys=True, indent=2)
        j = j.replace('<', '\\x3c').replace('&', '\\x26')
        return jinja2.Markup(j)

    def _from_json(self, data):
        return json.loads(data)


def Main():
    global OPENED_FILES

    jinja_env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(searchpath='/'),
        autoescape=True,
        trim_blocks=True,
        extensions=['jinja2.ext.with_',
                    'jinja2.ext.do',
                    'jinja2.ext.autoescape',
                    JinjaToolExtension]
    )

    variables = copy.copy(os.environ)
    depcheck = False

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
            template = jinja_env.get_template(inpath)
            data = template.render(variables).encode('utf-8')

            if depcheck:
                deps = sorted([os.path.relpath(o) for o in OPENED_FILES])
                if ofile:
                    print '%s: %s' % (ofile, ' '.join(deps))
                else:
                    deps.remove(inrelpath)
                    print '%s: %s'  % (infile, ' '.join(deps))
                # Clear caches so each dependency list is correct
                jinja2.clear_caches()
                OPENED_FILES = set()
            else:
                if ofile:
                    open(ofile, 'w').write(data)
                else:
                    sys.stdout.write(data)
                    sys.stdout.write('<!-- EOF:%s -->\n' % infile)

Main()

#!/bin/bash

export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
export PATH="/usr/local/opt/ruby/bin:$PATH"
bundle exec jekyll serve -l -H localhost --trace
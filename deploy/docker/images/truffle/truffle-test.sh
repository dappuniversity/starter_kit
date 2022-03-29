#!/usr/bin/env bash

sh -c "cd ./backend && 
        truffle compile &&
        truffle test --stacktrace"

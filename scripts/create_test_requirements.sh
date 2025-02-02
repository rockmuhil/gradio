#!/bin/bash
if [ -z "$(ls | grep CONTRIBUTING.md)" ]; then
  echo "Please run the script from repo directory"
  exit -1
else
  echo "Creating requirements under test/requirements.txt using requirements.in"
  cd test
  pip install --upgrade pip-tools
  pip-compile
fi

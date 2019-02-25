##
## Set up 'nodeenv' without sudo permissions (e.g. for the school lab machines)
##

export PY_VENV=".tmp-env"
export NODE_VENV="env"

## Set up and activate the Python virtual env first
virtualenv -p python3 $PY_VENV
source `pwd`/$PY_VENV/bin/activate

## Install nodeenv
pip install nodeenv

## Create a new node virtual environment
nodeenv $NODE_VENV

## Delete the old Python env
rm -rf $PY_VENV

## All done!
echo ""
echo ""
echo "All done! To use Node, run:"
echo -e "\tsource $NODE_VENV"
echo ""

#!/bin/bash
#
# Build the app and copy the files into the work area

cd ../
yarn build
cd docker
mkdir -p work
cp -r ../build/* work/

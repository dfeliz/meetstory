#!/bin/bash

build() {
    echo 'building react'

    rm -rf dist/*

    export INLINE_RUNTIME_CHUNK=false
    export GENERATE_SOURCEMAP=false

    react-scripts build

    mkdir -p dist
    cp -r build/* dist

    rm -rf build/*
    rm build

    mv dist/index.html dist/popup.html
}

build
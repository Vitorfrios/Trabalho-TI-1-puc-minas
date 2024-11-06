#!/bin/bash

# Para cada arquivo modificado, faça um commit separado
for file in $(git status --porcelain | grep '^ M' | cut -d ' ' -f 2); do
    git add "$file"
    git commit -m "Commit para o arquivo $file"
done

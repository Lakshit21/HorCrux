#! /bin/bash

# some initial steps
# 1. setup golang (in your system)
# 2. go and get the modules
# 3. setup react (in your system)
# 4. npm init
# 5. run this file to build the application (single binary)
# 6. enjoy

cd horcrux-frontend
npm run build
cd ..
mv horcrux-frontend/build/* horcrux-backend/static/
cd horcrux-backend
go build -o HorCrux-app
cd ..

# compile.sh
#!/bin/bash

# First we build the client bundle (This is the vue/vite part)
echo " "
echo " "
echo "--------------------------------------"
echo "Starting Vite build...."
vite build
echo "Client bundle built successfully."
echo "--------------------------------------"
echo " "
echo " "
echo "--------------------------------------"
echo "Starting VFS build...."
# Then we take the whole dist folder and create a vfs bundle. this is required so that we can embed the client bundle into the server bundle.
bunx make-vfs --dir ./dist --content-format string --outfile ./dist/client-bundle-vfs.js
# Log the output of the vfs bundle
echo "VFS bundle built successfully."
echo "--------------------------------------"
echo " "
echo " "
echo "--------------------------------------"
echo "Starting BUN build...."
# finaly we build the server bundle. this is the bun part.
bun build ./src/server/main-compile.js --compile --outfile myServer
echo "VFS bundle built successfully."
echo "--------------------------------------"
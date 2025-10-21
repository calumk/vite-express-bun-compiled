// This script bundles all files in a directory into a single JavaScript file
// with base64 encoded content. It can be used to create a virtual file system (VFS) for a web application.
// Usage: bunx make-vfs --dir <directory> [--outfile <output_file>]
// Example: bunx make-vfs --dir ./dist --outfile ./src/client-bundle-vfs.js

// THIS IS AN ALTERNATIVE TO MAKE-VFS : https://www.npmjs.com/package/make-vfs

// It is a single file script with no dependencies, and seems to work better!

// Note - Bun native file system APIs cant be used in all contexts - (mkdir) so we use fs/promises


import { join, relative } from "path";
import { readdir, mkdir } from "fs/promises";
import { readFile } from "fs/promises";

// Parse command line arguments
const args = process.argv.slice(2);
const argMap = {};

for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--') && i + 1 < args.length) {
    argMap[args[i].slice(2)] = args[i + 1];
    i++; // Skip the next argument
  }
}

if (!argMap.dir) {
  console.error('Error: --dir argument is required');
  console.error('Usage: bun bundle-to-base64.js --dir <directory> [--outfile <output_file>]');
  process.exit(1);
}

const targetDir = argMap.dir;
const outputFile = argMap.outfile || 'bundle-output.js';

// Object to store all files
const bundleObject = {};

// Recursive function to traverse directory
async function traverseDirectory(dir, baseDir = dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively traverse subdirectories
        await traverseDirectory(fullPath, baseDir);
      } else {
        // Get relative path
        const relativePath = relative(baseDir, fullPath);
        
        try {
          // Read file as binary data
          const fileBuffer = await readFile(fullPath);
          // Convert to base64
          const base64Data = fileBuffer.toString('base64');
          
          // Store in our bundle object with the relative path as key
          bundleObject[relativePath] = base64Data;
          console.log(`Added: ${relativePath}`);
        } catch (fileErr) {
          console.error(`Error processing file ${fullPath}:`, fileErr);
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err);
  }
}

// Main execution
console.log(`Starting to bundle directory: ${targetDir}`);

try {
  // Ensure the target directory exists; create it if it doesn't.
  try {
    await mkdir(targetDir, { recursive: true });
    console.log(`Ensured directory exists: ${targetDir}`);
  } catch (mkErr) {
    console.error(`Unable to create or access directory ${targetDir}:`, mkErr);
    process.exit(1);
  }
  // Execute the traversal
  await traverseDirectory(targetDir);
  
  // Format the output
  let output = 'export default {\n';
  
  for (const [path, data] of Object.entries(bundleObject)) {
    output += `  "${path}": "${data}",\n`;
  }
  
  // Remove trailing comma from the last entry if it exists
  if (output.endsWith(',\n')) {
    output = output.slice(0, -2) + '\n';
  }
  
  output += '};\n';
  
  // Write to output file
  await Bun.write(outputFile, output);
  console.log(`Bundle written to: ${outputFile}`);
  console.log(`Total files bundled: ${Object.keys(bundleObject).length}`);

} catch (err) {
  console.error('Fatal error:', err);
  process.exit(1);
}

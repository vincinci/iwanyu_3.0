const { spawn } = require('child_process');

console.log('Starting Next.js build with debug output...');

const build = spawn('npm', ['run', 'build'], {
  stdio: ['inherit', 'pipe', 'pipe'],
  env: { ...process.env, DEBUG: 'next:*' }
});

build.stdout.on('data', (data) => {
  console.log('STDOUT:', data.toString());
});

build.stderr.on('data', (data) => {
  console.log('STDERR:', data.toString());
});

build.on('close', (code) => {
  console.log(`Build process exited with code ${code}`);
  process.exit(code);
});

// Timeout after 2 minutes
setTimeout(() => {
  console.log('Build timeout reached, killing process...');
  build.kill('SIGTERM');
  process.exit(1);
}, 120000);

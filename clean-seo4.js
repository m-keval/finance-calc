const fs = require('fs');

let lines = fs.readFileSync('src/lib/seo-data.ts', 'utf8').split('\n');

const missing = [
  'lumpsum-calculator',
  'compound-interest-calculator',
  'home-loan-emi-calculator',
  'personal-loan-emi-calculator',
  'car-loan-emi-calculator',
  'loan-interest-calculator',
  'gst-calculator',
  'percentage-calculator',
  'simple-interest-calculator'
];

let inMissingBlock = false;
let newLines = [];

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Check if this line starts a missing block
  let startedMissing = false;
  for (let m of missing) {
    if (line.startsWith(`  '${m}': {`)) {
      inMissingBlock = true;
      startedMissing = true;
      break;
    }
  }
  
  if (inMissingBlock) {
    // If it's the end of the block, we stop being in the missing block on the NEXT line
    if (line === '  },' || line === '  }') {
      inMissingBlock = false;
    }
    continue;
  }
  
  // Also clean up relatedCalculators array strings
  for (let m of missing) {
    line = line.replace(`'${m}', `, '');
    line = line.replace(`, '${m}'`, '');
    line = line.replace(`'${m}'`, '');
  }
  
  newLines.push(line);
}

fs.writeFileSync('src/lib/seo-data.ts', newLines.join('\n'), 'utf8');

const fs = require('fs');

let content = fs.readFileSync('src/lib/seo-data.ts', 'utf8');

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

missing.forEach(m => {
  content = content.replace(new RegExp(`'${m}',?\\s*`, 'g'), '');
  content = content.replace(new RegExp(`,?\\s*'${m}'`, 'g'), '');
  
  // Find index of 'm': {
  const startIndex = content.indexOf(`'${m}': {`);
  if (startIndex !== -1) {
    // Find the next '  },' or '  }'
    const nextComma = content.indexOf('  },', startIndex);
    const nextBracket = content.indexOf('  }', startIndex);
    
    let endIndex = -1;
    if (nextComma !== -1 && (nextBracket === -1 || nextComma < nextBracket)) {
      endIndex = nextComma + 4; // length of '  },'
    } else if (nextBracket !== -1) {
      endIndex = nextBracket + 3; // length of '  }'
    }
    
    if (endIndex !== -1) {
      content = content.substring(0, startIndex) + content.substring(endIndex);
    }
  }
});

fs.writeFileSync('src/lib/seo-data.ts', content, 'utf8');

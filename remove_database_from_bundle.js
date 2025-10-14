import fs from 'fs/promises';

// Read the project file
const projectPath = '/Users/xavi/Apps created by Xavi/untitled folder/MyMeds_UKultra/MyMeds_UKultra.xcodeproj/project.pbxproj';
let content = await fs.readFile(projectPath, 'utf8');

// Remove the mhra_ultra_2.0 from Resources build phase
content = content.replace(
    /47D3F8E92E83A5990026A51E \/\* mhra_ultra_2\.0 in Resources \*\/,?\s*/g,
    ''
);

// Remove the PBXBuildFile entry for mhra_ultra_2.0
content = content.replace(
    /47D3F8E92E83A5990026A51E \/\* mhra_ultra_2\.0 in Resources \*\/ = \{isa = PBXBuildFile; fileRef = 47D3F8E82E83A5990026A51E \/\* mhra_ultra_2\.0 \*\/; \};\s*/g,
    ''
);

// Write the updated project file
await fs.writeFile(projectPath, content);

console.log('✅ Removed mhra_ultra_2.0 from app bundle');
console.log('📱 App will now use on-demand PDF fetching');

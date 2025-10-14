import fs from 'fs/promises';
import path from 'path';

// Configuration
const BASE_DIR = '/Users/xavi/Apps created by Xavi/untitled folder/MyMeds_UKultra/mhra_ultra_2.0';
const JSON_FILE = path.join(BASE_DIR, 'mhra_ultra_2.0.json');

// Load the JSON data
async function loadJsonData() {
    try {
        const data = await fs.readFile(JSON_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error loading JSON data:', error);
        return null;
    }
}

// Create URL mapping from JSON data
function createUrlMapping(jsonData) {
    const urlMap = new Map();
    
    for (const letter of jsonData.letters) {
        for (const substance of letter.substances) {
            for (const subDrug of substance.sub_drugs) {
                for (const document of subDrug.documents) {
                    // Create the filename that would match the existing structure
                    const docName = document.title.replace(/[<>:"/\\|?*]/g, '_').substring(0, 100);
                    const subtitle = document.subtitle.replace(/[<>:"/\\|?*]/g, '_').substring(0, 120);
                    const activeSubstances = document.active_substances.map(s => s.replace(/[<>:"/\\|?*]/g, '_').substring(0, 50)).join('; ');
                    
                    const filename = `${docName} — ${subtitle} — ${activeSubstances}_1.pdf`;
                    const letterDir = letter.letter;
                    const substanceDir = subDrug.label.split(' ')[0].replace(/[<>:"/\\|?*]/g, '_').substring(0, 100);
                    const productDir = subDrug.label.replace(/[<>:"/\\|?*]/g, '_').substring(0, 120);
                    
                    const relativePath = path.join(letterDir, substanceDir, productDir, filename);
                    urlMap.set(relativePath, document.doc_url);
                }
            }
        }
    }
    
    return urlMap;
}

// Convert PDF files to .url files
async function convertPdfToUrlFile(pdfPath, url) {
    try {
        const urlFilePath = pdfPath + '.url';
        
        // Create .url file content
        const urlContent = `[InternetShortcut]
URL=${url}
IDList=
HotKey=0
IconFile=
IconIndex=0`;
        
        await fs.writeFile(urlFilePath, urlContent, 'utf8');
        console.log(`✅ Created: ${path.basename(urlFilePath)}`);
        
        // Remove the original PDF file
        await fs.unlink(pdfPath);
        console.log(`🗑️  Removed: ${path.basename(pdfPath)}`);
        
        return true;
    } catch (error) {
        console.error(`❌ Error converting ${pdfPath}:`, error.message);
        return false;
    }
}

// Process directory recursively
async function processDirectory(dirPath, urlMap, relativePath = '') {
    try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true });
        
        for (const entry of entries) {
            const entryPath = path.join(dirPath, entry.name);
            const entryRelativePath = path.join(relativePath, entry.name);
            
            if (entry.isDirectory()) {
                // Recursively process subdirectories
                await processDirectory(entryPath, urlMap, entryRelativePath);
            } else if (entry.isFile() && entry.name.endsWith('.pdf')) {
                // Check if we have a URL for this PDF
                const url = urlMap.get(entryRelativePath);
                
                if (url) {
                    await convertPdfToUrlFile(entryPath, url);
                } else {
                    console.log(`⚠️  No URL found for: ${entryRelativePath}`);
                }
            }
        }
    } catch (error) {
        console.error(`Error processing directory ${dirPath}:`, error.message);
    }
}

// Main conversion function
async function main() {
    console.log('🚀 Starting conversion to on-demand PDF system...');
    
    // Load JSON data
    console.log('📄 Loading JSON data...');
    const jsonData = await loadJsonData();
    if (!jsonData) {
        console.error('❌ Failed to load JSON data');
        return;
    }
    
    // Create URL mapping
    console.log('🗺️  Creating URL mapping...');
    const urlMap = createUrlMapping(jsonData);
    console.log(`📊 Found ${urlMap.size} URLs to convert`);
    
    // Process the directory structure
    console.log('🔄 Processing directory structure...');
    await processDirectory(BASE_DIR, urlMap);
    
    console.log('✅ Conversion completed!');
    console.log('📁 Your app will now fetch PDFs on-demand from MHRA servers');
    console.log('💾 App size will be dramatically reduced from 29.63 GB to ~50 MB');
}

main().catch(console.error);

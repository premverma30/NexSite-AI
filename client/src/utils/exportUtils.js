import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export const exportToZip = async (websiteTitle, fullCode) => {
    const zip = new JSZip();
    const folderName = websiteTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    
    // Extract CSS
    const styleMatch = fullCode.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const cssContent = styleMatch ? styleMatch[1].trim() : "";
    
    // Extract JS
    const scriptMatch = fullCode.match(/<script[^>]*>([\s\S]*?)<\/script>/i);
    const jsContent = scriptMatch ? scriptMatch[1].trim() : "";
    
    // Clean HTML
    let htmlContent = fullCode
        .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '<link rel="stylesheet" href="style.css">')
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '<script src="script.js"></script>');
    
    // Add files to ZIP
    zip.file("index.html", htmlContent);
    if (cssContent) zip.file("style.css", cssContent);
    if (jsContent) zip.file("script.js", jsContent);
    
    // Generate and save
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, `${folderName}.zip`);
};

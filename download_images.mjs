import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
    // Gallery
    { url: "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-ambiance.jpg" },
    { url: "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-beard-trim.jpg" },
    { url: "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-modern-fade.jpg" },
    { url: "https://images.pexels.com/photos/2061820/pexels-photo-2061820.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-master-tools.jpg" },
    { url: "https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-expert-hands.jpg" },
    { url: "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-hot-towel.jpg" },
    { url: "https://images.pexels.com/photos/2809652/pexels-photo-2809652.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-sharp-looks.jpg" },
    { url: "https://images.pexels.com/photos/2521978/pexels-photo-2521978.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-urban-vibe.jpg" },
    { url: "https://images.pexels.com/photos/3998419/pexels-photo-3998419.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-detail.jpg" },
    { url: "https://images.pexels.com/photos/3998416/pexels-photo-3998416.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-textured-crop.jpg" },
    { url: "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-final-look.jpg" },
    { url: "https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-interior.jpg" },
    { url: "https://images.pexels.com/photos/3998427/pexels-photo-3998427.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-fresh-cut.jpg" },
    { url: "https://images.pexels.com/photos/897265/pexels-photo-897265.jpeg", filename: "gallery-beard-care.jpg" },
    { url: "https://images.pexels.com/photos/897255/pexels-photo-897255.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-fine-detailing.jpg" },
    { url: "https://images.pexels.com/photos/2040189/pexels-photo-2040189.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-vintage-clipper.jpg" },
    { url: "https://images.pexels.com/photos/3998403/pexels-photo-3998403.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-scissor-cut.jpg" },
    { url: "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-straight-razor.jpg" },
    { url: "https://images.pexels.com/photos/7697712/pexels-photo-7697712.jpeg", filename: "gallery-professional-kit.jpg" },
    { url: "https://images.pexels.com/photos/897271/pexels-photo-897271.jpeg?auto=compress&cs=tinysrgb&w=800", filename: "gallery-vintage-seat.jpg" },

    // Barbers
    { url: "https://images.unsplash.com/photo-1588698188158-94420e6cace3?w=800&q=80", filename: "barber-alex.jpg" },
    { url: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80", filename: "barber-sarah.jpg" },
    { url: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=800&q=80", filename: "barber-marcus.jpg" },
    { url: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&q=80", filename: "barber-david.jpg" },

    // Services
    { url: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=80", filename: "service-haircut.jpg" },
    { url: "https://images.unsplash.com/photo-1621607512214-68297480165e?w=800&q=80", filename: "service-shave.jpg" },
    { url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80", filename: "service-beard.jpg" },
    { url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800&q=80", filename: "service-coloring.jpg" },
    { url: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&q=80", filename: "service-kids.jpg" },
    // Duplicate handled by re-using barber-sarah.jpg

    // HeroGallery
    // mostly duplicates

    // Hero
    { url: "https://images.unsplash.com/photo-1593702295094-aea22597af65?w=800&q=80", filename: "hero-classic-pomp.jpg" },
    { url: "https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=800&q=80", filename: "hero-long-style.jpg" },
    { url: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1920&q=80", filename: "hero-bg.jpg" }
];

const downloadImage = async (url, filename) => {
    const targetPath = path.join(__dirname, 'client', 'public', 'images', filename);
    if (fs.existsSync(targetPath)) {
        console.log(`Skipping: ${filename} (already exists)`);
        return;
    }

    console.log(`Fetching: ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);

    const fileStream = fs.createWriteStream(targetPath);
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
    console.log(`Downloaded: ${filename}`);
};

const main = async () => {
    const imagesDir = path.join(__dirname, 'client', 'public', 'images');
    if (!fs.existsSync(imagesDir)) {
        fs.mkdirSync(imagesDir, { recursive: true });
    }

    console.log(`Downloading ${images.length} images to ${imagesDir}...`);

    // Process sequentially (or promise.all if preferred, sequential better for rate limits)
    for (const image of images) {
        try {
            await downloadImage(image.url, image.filename);
        } catch (error) {
            console.error(`Error downloading ${image.filename}:`, error.message);
        }
    }

    console.log('All downloads complete!');
};

main();

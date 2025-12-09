const https = require('https');

const images = [
    "https://images.pexels.com/photos/1319460/pexels-photo-1319460.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3998429/pexels-photo-3998429.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2061820/pexels-photo-2061820.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/897262/pexels-photo-897262.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1570807/pexels-photo-1570807.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2809652/pexels-photo-2809652.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2521978/pexels-photo-2521978.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3998419/pexels-photo-3998419.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2235288/pexels-photo-2235288.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1319459/pexels-photo-1319459.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3998427/pexels-photo-3998427.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1895363/pexels-photo-1895363.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/897255/pexels-photo-897255.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2040189/pexels-photo-2040189.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2521980/pexels-photo-2521980.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3998403/pexels-photo-3998403.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1758845/pexels-photo-1758845.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2269872/pexels-photo-2269872.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1570806/pexels-photo-1570806.jpeg?auto=compress&cs=tinysrgb&w=800"
];

const checkUrl = (url) => {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            resolve({ url, status: res.statusCode });
        }).on('error', (e) => {
            resolve({ url, status: 'error' });
        });
    });
};

const checkAll = async () => {
    const results = await Promise.all(images.map(checkUrl));
    results.forEach(r => {
        if (r.status !== 200) {
            console.log(`BROKEN: ${r.url} (Status: ${r.status})`);
        } else {
            // console.log(`OK: ${r.url}`);
        }
    });
};

checkAll();

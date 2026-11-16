# A Little Fairytale for Mary Joy 🌸

A romantic, multi-section, interactive pink fairytale website crafted with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**—inspired by blush pink aesthetics, enchanted roses, and *Beauty and the Beast*.

## Folder Structure

```text
a-little-fairytale-for-mary-joy/
├── index.html                  # Complete 12-chapter scrolling fairytale experience
├── README.md                   # Customization & hosting guide
└── assets/
    ├── css/
    │   └── style.css           # Responsive pink fairytale design system & animations
    ├── js/
    │   └── main.js             # Storybook cover, falling petals, envelope, rose & audio logic
    ├── images/
    │   ├── hero-castle.svg     # Custom blush-pink fairytale castle illustration
    │   ├── belle-library.svg   # Custom Belle-inspired enchanted library illustration
    │   └── memory-placeholder.svg # Replaceable photo frame in Chapter I
    └── music/
        └── PUT_YOUR_SONG_HERE.txt # Instructions for adding your own MP3 melody
```

## How to Customize Photos & Music

1. **Adding Your Own Photo (Optional):**
   - Place your photo (e.g., `photo.jpg`) inside `assets/images/`.
   - Open `index.html` and replace `src="assets/images/memory-placeholder.svg"` in **Chapter I** (`#beginning`) with `src="assets/images/photo.jpg"`.
2. **Adding Background Music:**
   - Place any `.mp3` song inside `assets/music/` and rename it to `our-melody.mp3`.
   - Even before you add an `.mp3` file, clicking **Melody: Off** in the top-right corner plays a gentle, built-in music-box lullaby.

## How to Share With Mary Joy

- **Instant Local Preview:** Double-click `index.html` to open it in any browser.
- **Free Online Link (Recommended):** Drag and drop the entire `a-little-fairytale-for-mary-joy` folder onto **Netlify Drop** (`app.netlify.com/drop`), **Vercel**, or **GitHub Pages** to get a shareable link you can send straight to her phone or laptop.

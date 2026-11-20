# public/music/

All six playlist tracks are placed here. The player checks
these exact paths and plays them globally across every scene.

| Filename | Track | Artist | Format |
|---|---|---|---|
| `HIVI - Siapkah Kau Tuk Jatuh Cinta Lagi.mp3` | Siapkah Kau 'Tuk Jatuh Cinta Lagi | HIVI! | MP3 |
| `hivi-mata-ke-hati.m4a` | Mata Ke Hati | HIVI! | M4A |
| `08 Tulus - Teman Hidup.mp3` | Teman Hidup | Tulus | MP3 |
| `tulus-jatuh-suka.mp3` | Jatuh Suka | Tulus | MP3 |
| `afgan-panah-asmara.m4a` | Panah Asmara | Afgan | M4A |
| `Afgan - Bukan Cinta Biasa (Official Music Video).flac` | Bukan Cinta Biasa | Afgan | FLAC |

These exact paths are mapped in `src/gameConfig.js` under `localFile`.
If you rename a file, update the matching `localFile` entry.

## Converted files

`tulus-jatuh-suka.mp3` was encoded from `Jatuh Suka - Tulus.flac`
(48 kHz / 24-bit FLAC, 47.4 MB) to 48 kHz / 320 kbps MP3 (8.97 MB),
using ffmpeg 6.1.1:

```
ffmpeg -i "Jatuh Suka - Tulus.flac" \
       -codec:a libmp3lame -b:a 320k -ar 48000 \
       -map_metadata 0 -write_xing 1 "tulus-jatuh-suka.mp3"
```

ID3 tags were carried over: title, artist, album *Manusia*, 2022, track 6.
Verified: `HEAD 200 audio/mpeg`, header `49 44 33` (ID3), duration 00:03:55.

The source `.flac` is no longer in this folder, so `public/music/` and
`dist/music/` are identical - no dead weight in the build.

## Browser support note

- MP3 and M4A: supported by all major browsers, including Safari.
- FLAC: supported by Chrome, Edge, and Firefox, but **not** by Safari.
  `Afgan - Bukan Cinta Biasa (Official Music Video).flac` is still FLAC.
  To support Safari, convert it the same way:

  ```
  ffmpeg -i "Afgan - Bukan Cinta Biasa (Official Music Video).flac" \
         -codec:a libmp3lame -b:a 320k -ar 48000 \
         "afgan-bukan-cinta-biasa.mp3"
  ```

  then change its `localFile` in `src/gameConfig.js` to
  `/music/afgan-bukan-cinta-biasa.mp3`.

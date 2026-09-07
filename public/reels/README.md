# Reels del estudio

Deja aquí los vídeos exportados de Instagram, en .mp4 (H.264, sin audio
o con audio: se reproducen mudos igualmente).

Después, en `app/[locale]/about/page.tsx`, añade la ruta al array `media`:

    const media = [
      { cover: photos.paintedHand, video: '/reels/proceso.mp4' },
      { cover: photos.canvasStack },
      ...
    ]

La tarjeta que tenga `video` pasa sola a reproducirse muda y en bucle
mientras esté en pantalla; la que no lo tenga sigue mostrando la foto.

Recomendado antes de subirlos: 1080px de ancho como máximo y unos
2-4 MB por pieza. Para comprimir con ffmpeg:

    ffmpeg -i original.mp4 -vf "scale=1080:-2" -c:v libx264 -crf 28 \
           -preset slow -an -movflags +faststart proceso.mp4

(-an quita la pista de audio, que no se usa y ocupa)

document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.project-image img'));
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    let currentIndex = 0;

    function showImage(index) {
        if (index < 0) {
            currentIndex = images.length - 1; 
        } else if (index >= images.length) {
            currentIndex = 0;
        } else {
            currentIndex = index;
        }

        lightboxImg.src = images[currentIndex].src;
        lightboxImg.alt = images[currentIndex].alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; 
    }

    images.forEach((img, index) => {
        img.addEventListener('click', () => {
            showImage(index);
        });
    });

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex - 1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showImage(currentIndex + 1); });
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg && e.target !== prevBtn && e.target !== nextBtn) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showImage(currentIndex + 1);
        if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    });
});

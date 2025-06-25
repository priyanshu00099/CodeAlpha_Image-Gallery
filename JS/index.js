const galleryItems = document.querySelectorAll('.gallery-item');
        const lightbox = document.querySelector('.lightbox');
        const lightboxImg = document.querySelector('.lightbox-img');
        const closeBtn = document.querySelector('.close');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        const categories = document.querySelectorAll('.filter');

        let currentIndex = 0;
        let currentImages = [...galleryItems];

        categories.forEach(button => {
            button.addEventListener('click', () => {
                categories.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.dataset.filter;
                currentImages = filter === 'all' 
                    ? [...galleryItems]
                    : [...galleryItems].filter(item => item.dataset.category === filter);

                galleryItems.forEach(item => {
                    item.style.display = filter === 'all' || item.dataset.category === filter 
                        ? 'block' 
                        : 'none';
                });
            });
        });
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = currentImages.indexOf(item);
                showLightbox(item.querySelector('img').src);
            });
        });
        closeBtn.addEventListener('click', hideLightbox);
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);

        function showLightbox(src) {
            lightboxImg.src = src;
            lightbox.classList.add('active');
        }

        function hideLightbox() {
            lightbox.classList.remove('active');
        }

        function showPrevImage() {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            lightboxImg.src = currentImages[currentIndex].querySelector('img').src;
        }

        function showNextImage() {
            currentIndex = (currentIndex + 1) % currentImages.length;
            lightboxImg.src = currentImages[currentIndex].querySelector('img').src;
        }
        
        document.addEventListener('keydown', (e) => {
            if (lightbox.classList.contains('active')) {
                if (e.key === 'ArrowLeft') showPrevImage();
                if (e.key === 'ArrowRight') showNextImage();
                if (e.key === 'Escape') hideLightbox();
            }
        });
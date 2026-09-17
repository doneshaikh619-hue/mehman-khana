(() => {
  const header = document.querySelector('[data-header]');
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#site-navigation');
  const navLinks = document.querySelectorAll('#site-navigation a');

  const reveals = document.querySelectorAll('.reveal');

  const yearNode = document.querySelector('[data-year]');

  const dialog = document.querySelector('[data-dialog]');
  const dialogImage = document.querySelector('[data-dialog-image]');
  const dialogCaption = document.querySelector('[data-dialog-caption]');
  const dialogClose = document.querySelector('[data-dialog-close]');

  /* --------------------------------
     Dynamic Footer Year
  --------------------------------- */
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  /* --------------------------------
     Sticky Header Effect
  --------------------------------- */
  const onScroll = () => {
    if (!header) return;

    header.classList.toggle(
      'scrolled',
      window.scrollY > 24
    );
  };

  window.addEventListener('scroll', onScroll, {
    passive: true
  });

  onScroll();

  /* --------------------------------
     Mobile Navigation
  --------------------------------- */
  const closeNav = () => {
    if (!nav || !navToggle) return;

    nav.classList.remove('open');

    navToggle.setAttribute(
      'aria-expanded',
      'false'
    );

    navToggle.setAttribute(
      'aria-label',
      'Open navigation'
    );
  };

  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');

      navToggle.setAttribute(
        'aria-expanded',
        String(isOpen)
      );

      navToggle.setAttribute(
        'aria-label',
        isOpen
          ? 'Close navigation'
          : 'Open navigation'
      );
    });

    /* Close menu when clicking navigation link */
    navLinks.forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    /* Close menu when clicking outside */
    document.addEventListener('click', (event) => {
      if (
        !nav.contains(event.target) &&
        !navToggle.contains(event.target)
      ) {
        closeNav();
      }
    });
  }

  /* --------------------------------
     Scroll Reveal Animations
  --------------------------------- */
  if (
    'IntersectionObserver' in window &&
    !window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
  ) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              'is-visible'
            );

            observer.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin:
          '0px 0px -35px 0px'
      }
    );

    reveals.forEach((item) => {
      observer.observe(item);
    });
  } else {
    /* Disable animation for reduced motion */
    reveals.forEach((item) => {
      item.classList.add(
        'is-visible'
      );
    });
  }

  /* --------------------------------
     Gallery Lightbox
  --------------------------------- */
  const lightboxItems =
    document.querySelectorAll(
      '[data-lightbox]'
    );

  if (
    dialog &&
    dialogImage &&
    dialogCaption &&
    typeof dialog.showModal === 'function'
  ) {
    lightboxItems.forEach((item) => {
      item.addEventListener(
        'click',
        () => {
          const src =
            item.getAttribute(
              'data-lightbox'
            );

          const caption =
            item.getAttribute(
              'data-caption'
            ) || '';

          if (!src) return;

          dialogImage.src = src;

          dialogImage.alt = caption;

          dialogCaption.textContent =
            caption;

          dialog.showModal();
        }
      );
    });

    /* Close Lightbox */
    const closeDialog = () => {
      if (dialog.open) {
        dialog.close();
      }

      dialogImage.src = '';

      dialogImage.alt = '';
    };

    if (dialogClose) {
      dialogClose.addEventListener(
        'click',
        closeDialog
      );
    }

    /* Close when clicking dialog background */
    dialog.addEventListener(
      'click',
      (event) => {
        if (
          event.target === dialog
        ) {
          closeDialog();
        }
      }
    );

    /* Close with Escape key */
    dialog.addEventListener(
      'cancel',
      closeDialog
    );
  }
})();
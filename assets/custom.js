/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */
const app = {
  giftCard: {
    el: document.querySelector('#gift-card-value'),

    init: function() {
      if (!this.el) return;

      const minPrice = this.el.dataset.min != '' ? Number(this.el.dataset.min) : 25,
        maxPrice = this.el.dataset.min != '' ? Number(this.el.dataset.max) : 100,
        currentPrice = this.el.dataset.value != '' ? Number(this.el.dataset.value) : minPrice;

      this.slider = noUiSlider.create(this.el, {
        start: currentPrice,
        tooltips: true,
        step: 5,
        connect: 'lower',
        range: {
          'min': minPrice,
          'max': maxPrice
        },
        format: {
          to: function (value) {
            return `£${Math.round(value)}`;
          },
          from: function (value) {
            return Number(value.replace('£', ''));
          }
        }
      });

      this.slider.on('change', val => {
        const swatch = document.querySelector(`.product-form__single-selector[value='${val}']`);
        if (swatch) {
          swatch.checked = true;
          swatch.dispatchEvent(new Event('change', { 'bubbles': true }));
        }
      });
    }
  },
  videoBlock: {
    init: function() {
      const videos = document.querySelectorAll('.video-block');

      if (videos) {
        videos.forEach((video_container) => {
          const player = video_container.querySelector('.video-block__player'),
            overlay = video_container.querySelector('.video-block__overlay');

					// Check player source
          if (!player.dataset.src) {
            player.dataset.src = (window.innerWidth < 768) ? player.dataset.srcMobile : player.dataset.srcDesktop;
            player.removeAttribute('data-src-mobile');
            player.removeAttribute('data-src-desktop');
          }

					// Autoplay if possible
          if (player.autoplay) {
            this.load(player);
            player.muted = true;
            player.play();
          }

					// Load video on click & play
          if (overlay) {
            overlay.addEventListener('click', (e) => {
              e.preventDefault();
              this.load(player);
              player.play();
            });
          }

					// Player events
          if (player) {
            player.addEventListener('play', () => {
              overlay && overlay.classList.remove('visible');
            });
          }

          player.addEventListener('loadeddata', () => {
            video_container.classList.remove('loading');
          }, { once: true });
        });
      }
    },

    load: function(player) {
      if (player && player.readyState !== 4) {
        player.src = player.dataset.src;
        player.load();
      }
    },
  },
  init: function() {
    app.giftCard.init();
    app.videoBlock.init();
  }
};
window.app = app;
setTimeout(app.init);
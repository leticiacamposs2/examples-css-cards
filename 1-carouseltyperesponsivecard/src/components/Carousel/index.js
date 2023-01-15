import React, { useState, useEffect } from 'react';
import { contextCard } from '../../utils/data';
import Card from '../../components/Card/index.js';

import './Carousel.scss';

function Carousel({ title, subtitle }) {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const [contextCards, setContextCards] = useState([]);

    useEffect(() => {
        setContextCards(contextCard);

        document.querySelectorAll('.Carousel').forEach(($carousel) => {
            $carousel.scrollLeft = 0;
      
            const $cards = Array.from($carousel.querySelectorAll('.Card'));
            const $pagination = $carousel.nextElementSibling;
            const [$previous, $next] = $pagination.querySelectorAll('.Arrow');
            $pagination.querySelector('.Dot').classList.add('Dot--active');
      
            const $start = document.createElement('div');
            const $end = document.createElement('div');
            $carousel.prepend($start);
            $carousel.append($end);
      
            const observer = new IntersectionObserver((entries) => {
              entries.forEach((entry) => {
                if (entry.target === $start) {
                  if ($previous) {
                    $previous.disabled = entry.isIntersecting;
                  }
                }
                if (entry.target === $end) {
                  if ($next) {
                    $next.disabled = entry.isIntersecting;
                  }
                }
              });
            });
            observer.observe($start);
            observer.observe($end);
      
            const scrollTo = ($card) => {
              let offset = getOffset($card);
              const left = document.dir === 'rtl' ? -offset : offset;
              const behavior = isReducedMotion ? 'auto' : 'smooth';
              $carousel.scrollTo({left, behavior});
            };
      
            const getOffset = ($el) => {
              let offset = $el.offsetLeft;
              if (document.dir === 'rtl') {
                offset = $carousel.offsetWidth - (offset + $el.offsetWidth);
              }
              return offset;
            };
      
            $previous.addEventListener('click', (ev) => {
              ev.preventDefault();
              let $card = $cards[0];
              const scroll = Math.abs($carousel.scrollLeft);
              $cards.forEach(($item) => {
                const offset = getOffset($item);
                if (offset - scroll < -1 && offset > getOffset($card)) {
                  $card = $item;
                }
              });
              scrollTo($card);
            });
      
            $next.addEventListener('click', (ev) => {
              ev.preventDefault();
              let $card = $cards[$cards.length - 1];
              const scroll = Math.abs($carousel.scrollLeft);
              $cards.forEach(($item) => {
                const offset = getOffset($item);
                if (offset - scroll > 1 && offset < getOffset($card)) {
                  $card = $item;
                }
              });
              scrollTo($card);
            });
        
            $pagination.addEventListener('click', (ev) => {
              if (ev.target.classList.contains('Dot')) {
                ev.preventDefault();
                const $card = document.querySelector(new URL(ev.target.href).hash);
                if ($card) scrollTo($card);
              }
            });
      
            // Highlight nearest "Dot" in pagination
            let scrollTimeout;
            $carousel.addEventListener('scroll', () => {
              clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(() => {
                let $dot = $pagination.querySelector('.Dot--active');
                if ($dot) $dot.classList.remove('Dot--active');
                let $active;
                const scroll = Math.abs($carousel.scrollLeft);
                if (scroll <= 0) {
                  $active = $cards[0];
                }
                if (scroll >= $carousel.scrollWidth - $carousel.offsetWidth) {
                  $active = $cards[$cards.length - 1];
                }
                let _card;
                if (!$active) {
                  let oldDiff;
                  $cards.forEach(($card) => {
                    _card = $card[0];
                    const newDiff = Math.abs(scroll - getOffset($card));
                    if (!$active || newDiff < oldDiff) {
                      $active = $card;
                      oldDiff = newDiff;
                    }
                  });
                }
                $dot = $pagination.querySelector(`[href="#${($active ?? _card).id}"]`);
                if ($dot) $dot.classList.add('Dot--active');
              }, 50);
            },
              {passive: true}
            );
      
            // Improve arrow key navigation
            $carousel.addEventListener('keydown', (ev) => {
              if (/^(Arrow)?Left$/.test(ev.key)) {
                ev.preventDefault();
                (document.dir === 'rtl' ? $next : $previous).click();
              } else if (/(Arrow)?Right$/.test(ev.key)) {
                ev.preventDefault();
                (document.dir === 'rtl' ? $previous : $next).click();
              }
            });
      
            // Improve transition when tabbing focus
            let scrollLeft = 0;
            $carousel.addEventListener(
              'blur',
              (ev) => {
                scrollLeft = $carousel.scrollLeft;
              },
              {capture: true}
            );
            $carousel.addEventListener(
              'focus',
              (ev) => {
                $carousel.scrollLeft = scrollLeft;
                const $card = ev.target.closest('.Card');
                if ($card) scrollTo($card);
              },
              {capture: true}
            );
        })

        if (!isReducedMotion && !window.CSS.supports('scroll-behavior: smooth')) {
            import('https://cdn.skypack.dev/smoothscroll-polyfill').then((module) => {
              module.polyfill();
            });
        }

        // Toggle right-to-left for demo
        document.querySelector('#toggle-rtl').addEventListener('change', (ev) => {
            document.dir = ev.target.checked ? 'rtl' : 'ltr';
            document.querySelectorAll('.Carousel').forEach(($carousel) => {
            $carousel.scrollLeft = 0;
            });
        });
  
        // Toggle single slides class for demo
        document.querySelector('#toggle-single').addEventListener('change', (ev) => {
            document.querySelectorAll('.Carousel').forEach(($carousel) => {
            $carousel.classList.toggle('Carousel--single', ev.target.checked);
            });
        });

    }, [isReducedMotion]);

    return (
        <>
            <h1>{title}</h1>
            <section className="Carousel" id="carousel" tabIndex="-1">
                <h2 className="Hidden">{subtitle}</h2>
                {contextCards && contextCards.map(data => (
                  <Card
                      key={data.classId}
                      image={`${data.image.urlPath}/${data.image.photoId}?crop=${data.image.cropType}&cs=${data.image.csType}&fm=${data.image.fmType}&ixid=${data.image.ixId}&ixlib=${data.image.ixLib}&q=${data.image.q}&height=${data.image.height}`}
                      name={data.image.name} 
                      linkHref={data.linkHref}
                      title={data.title}
                      description={data.description}
                      width={data.width}
                      height={data.height}
                      loading={data.loading}
                      className={data.className}
                      classId={data.classId}
                  />
                ))}
            </section>
        </>
    )
}

export default Carousel;
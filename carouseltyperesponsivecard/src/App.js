import {useRef, useEffect} from 'react';
import { imageCard } from './data.js';
import './App.scss';

function App() {
  const { name, photoId, cropType, csType, fmType, ixId, ixLib, q, height, urlPath } = imageCard[0];
  const imgNeblina = `${urlPath}/${photoId}?crop=${cropType}&cs=${csType}&fm=${fmType}&ixid=${ixId}&ixlib=${ixLib}&q=${q}&height=${height}`;
  
  const ref = useRef(null);
  // Respect user perference
  const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
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
    });

    // Optional polyfill for Safari 14
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
    <main ref={ref} className="Main">
      <h1>Mostly CSS Responsive Carousel</h1>
      <section className="Carousel" id="carousel" tabIndex="-1">
        <h2 className="Hidden">Carousel</h2>
        <article className="Card Card--overlay Card--square" id="card-1">
          <div className="Card__media">
            <img src={imgNeblina} className="Card__image" alt={name} style={{ width: '480', height: "480", loading: "lazy" }} />
          </div>
          <div className="Card__main">
            <h2 className="Card__heading">
              <a className="Card__link" href="#">
                Prefer 1/1 aspect ratio
              </a>
            </h2>
          <p>This is a generic card pattern.</p>
          </div>
        </article>
        {/* Card */}
        <article className="Card Card--overlay Card--wide" id="card-2">
            <div className="Card__media">
              <img src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMxMTE5MA&ixlib=rb-1.2.1&q=85&height=480" className="Card__image" alt="montanhas" style={{ width: '720', height: "480", loading: "lazy" }} />
            </div>
            <div className="Card__main">
              <h2 className="Card__heading">
                <a className="Card__link" href="#">
                  Prefer 16/9 aspect ratio
                </a>
              </h2>
              <p>This is a generic card pattern.</p>
            </div>
        </article>
        {/* Card */}
        <article className="Card Card--overlay Card--portrait" id="card-3">
            <div className="Card__media">
              <img src="https://images.unsplash.com/photo-1621131179929-426cfb7ce409?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMxMTAzNw&ixlib=rb-1.2.1&q=85&height=480" className="Card__image" alt="leao marinho" style={{ width: '360', height: "480", loading: "lazy" }} />
            </div>
            <div className="Card__main">
              <h2 className="Card__heading">
                <a className="Card__link" href="#">
                  Prefer 3/4 aspect ratio
                </a>
              </h2>
              <p>This is a generic card pattern.</p>
            </div>
        </article>
        {/* Card */}
        <article className="Card Card--overlay Card--photo" id="card-4">
            <div className="Card__media">
              <img src="https://images.unsplash.com/photo-1622176835604-e644073b0eab?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMxMTA3OQ&ixlib=rb-1.2.1&q=85&height=480" className="Card__image" alt="carro antigo" style={{ width: '708', height: "480", loading: "lazy" }} />
            </div>
            <div className="Card__main">
              <h2 className="Card__heading">
                <a className="Card__link" href="#">
                  Prefer 4/3 aspect ratio
                </a>
              </h2>
              <p>This is a generic card pattern.</p>
            </div>
        </article>
        {/* Card */}
        <article className="Card Card--overlay Card--square" id="card-5">
          <div className="Card__media">
            <img src="https://images.unsplash.com/photo-1622987437805-5c6f7c2609d7?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMxOTA3NA&ixlib=rb-1.2.1&q=85&height=480" className="Card__image" alt="neve" style={{ width: '480', height: "480", loading: "lazy" }} />
          </div>
          <div className="Card__main">
            <h2 className="Card__heading">
              <a className="Card__link" href="#">
                Prefer 1/1 aspect ratio
              </a>
            </h2>
            <p>This is a generic card pattern.</p>
          </div>
        </article>
        {/* Card */}
        <article className="Card Card--overlay Card--wide" id="card-6">
          <div className="Card__media">
            <img src="https://images.unsplash.com/photo-1607935911096-f31f85819be7?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMyNTI1NA&ixlib=rb-1.2.1&q=85&height=480" className="Card__image" alt="ano novo" style={{ width: '720', height: "480", loading: "lazy" }}/>
          </div>
          <div className="Card__main">
            <h2 className="Card__heading">
              <a className="Card__link" href="#">
                Prefer 16/9 aspect ratio
              </a>
            </h2>
            <p>This is a generic card pattern.</p>
          </div>
        </article>
        {/* Card */}
        <article className="Card Card--overlay Card--portrait" id="card-7">
          <div className="Card__media">
            <img src="https://images.unsplash.com/photo-1622595522218-f318265a40f4?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMxOTE1Ng&ixlib=rb-1.2.1&q=85&height=480" className="Card__image" alt="escada" style={{ width: '360', height: "480", loading: "lazy" }} />
          </div>
          <div className="Card__main">
            <h2>
              <a className="Card__link" href="#">
                Prefer 3/4 aspect ratio
              </a>
            </h2>
            <p>This is a generic card pattern.</p>
          </div>
        </article>
        {/* Card */}
        <article className="Card Card--overlay Card--photo" id="card-8">
          <div className="Card__media">
            <img src="https://images.unsplash.com/photo-1621045246196-4c7ce9092d3a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTYyMzMxOTIyOQ&ixlib=rb-1.2.1&q=85&height=480" className="Card__image" alt="camaleao" style={{ width: '708', height: "480", loading: "lazy" }} />
          </div>
          <div className="Card__main">
            <h2>
              <a className="Card__link" href="#">
                Prefer 4/3 aspect ratio
              </a>
            </h2>
            <p>This is a generic card pattern.</p>
          </div>
        </article>
        {/* Card */}
      </section>
      {/* Carousel */}
      
      <nav className="Pagination">
      <h2 className="Hidden">Carousel Navigation</h2>
        <button className="Arrow" type="button" aria-controls="carousel" disabled>
          <svg width="16" height="16" viewBox="0 0 16 16" role="presentation">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
          </svg>
          <span className="Hidden">Previous slide</span>
        </button>
        <button className="Arrow" type="button" aria-controls="carousel" disabled>
          <svg width="16" height="16" viewBox="0 0 16 16" role="presentation">
          <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
          </svg>
          <span className="Hidden">Next slide</span>
        </button>
        <div className="Dots">
          <a href="#card-1" className="Dot" tabIndex="-1"><span className="Hidden">Slide 1</span></a>
          <a href="#card-2" className="Dot" tabIndex="-1"><span className="Hidden">Slide 2</span></a>
          <a href="#card-3" className="Dot" tabIndex="-1"><span className="Hidden">Slide 3</span></a>
          <a href="#card-4" className="Dot" tabIndex="-1"><span className="Hidden">Slide 4</span></a>
          <a href="#card-5" className="Dot" tabIndex="-1"><span className="Hidden">Slide 5</span></a>
          <a href="#card-6" className="Dot" tabIndex="-1"><span className="Hidden">Slide 6</span></a>
          <a href="#card-7" className="Dot" tabIndex="-1"><span className="Hidden">Slide 7</span></a>
          <a href="#card-8" className="Dot" tabIndex="-1"><span className="Hidden">Slide 8</span></a>
        </div>
      </nav>
      {/* Pagination */}

      <h2>Features</h2>
      <ul>
        <li>Progressively enhanced (only previous/next buttons require JavaScript)</li>
        <li>Handles focus state and keyboard navigation</li>
        <li>Uses CSS scroll-snap for transitions and touch control</li>
        <li>Respects reduced motion preference</li>
        <li>Aspect ratios are preferred but max-width overrules</li>
        <li>
          <label>
          <input type="checkbox" id="toggle-rtl" />
          <span>Supports <abbr title="right-to-left">RTL</abbr> styles</span>
          </label>
      </li>
        <li>
          <label>
          <input type="checkbox" id="toggle-single" />
          <span>Single slides</span>
          </label>
      </li>
      </ul>
      <p>Feedback and comments: <a href="https://twitter.com/dbushell" target="_blank">@dbushell</a></p>
        <p>Uses my <a href="https://codepen.io/dbushell/full/MWpzGje" target="_top">“Universal” Card Pattern</a> overlay variation.</p>
        <h2>Known issues</h2>
        <p><b>Safari 14</b> does not support <code>scroll-behavior: smooth;</code> – Solution: polyfill / convince stakeholder the fallback behaviour is acceptable.</p>
        <p><b>Safari 14</b> does not support <code>aspect-ratio</code>.</p>
        <footer>
        <p><small>MIT licensed | Copyright © 2021 <a href="https://dbushell.com" target="_blank">David Bushell</a> | <a href="https://twitter.com/dbushell" target="_blank">@dbushell</a>
            <br />SVG from <a href="https://icons.getbootstrap.com" target="_blank">Bootstrap Icons</a></small></p>
        </footer>
    </main>
  );
}

export default App;

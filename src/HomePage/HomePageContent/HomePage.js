/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useRef, useState } from 'react';
import "./HomePage.css"

const HomePage = () => {
  const textRef = useRef(null); // Create a ref object
  const [navVisible, setNavVisible] = useState(false);

  const openNav = () => {
    setNavVisible(!navVisible);
    if (document.getElementById("myNav").style.width == "100%") {
        document.getElementById("myNav").style.width = "0%";
        document.getElementById("text").style.display = "flex";
        document.getElementById("social-media-links").style.display = "flex";
        document.getElementById("first-class").style.transform = "rotate(0deg)";
        document.getElementById("second-class").style.display = "flex";
        document.getElementById("third-class").style.transform = "rotate(0deg)";
      } else {
        document.getElementById("myNav").style.width = "100%";
        document.getElementById("text").style.display = "none";
        document.getElementById("social-media-links").style.display = "none";
        document.getElementById("first-class").style.transform = "rotate(45deg)";
        document.getElementById("second-class").style.display = "none";
        document.getElementById("third-class").style.transform = "rotate(135deg)";
      }
  };
  // ... rest of your code

  useEffect(() => {
    // ... your existing code
    class TextScramble {
      constructor(el) {
        this.el = el;
        this.chars = "!<>-\\/[]{}—=+*^?#_";
        this.update = this.update.bind(this);
      }
      setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => (this.resolve = resolve));
        this.queue = [];
        for (let i = 0; i < length; i++) {
          const from = oldText[i] || "";
          const to = newText[i] || "";
          const start = Math.floor(Math.random() * 40);
          const end = start + Math.floor(Math.random() * 40);
          this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
      }
      update() {
        let output = "";
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
          let { from, to, start, end, char } = this.queue[i];
          if (this.frame >= end) {
            complete++;
            output += to;
          } else if (this.frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = this.randomChar();
              this.queue[i].char = char;
            }
            output += `<span class="dud">${char}</span>`;
          } else {
            output += from;
          }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
          this.resolve();
        } else {
          this.frameRequest = requestAnimationFrame(this.update);
          this.frame++;
        }
      }
      randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
      }
    }
    
    // ——————————————————————————————————————————————————
    // Example
    // ——————————————————————————————————————————————————
    
    const phrases = [
      "Welcome to Currents,",
      "Empowering innovation through electronic mastery.",
      "Creating circuits, powering connections, shaping the future.",
      "Designing tomorrow's technology, today."
    ];

    const el = textRef.current; // Access the DOM element using the ref
    const fx = new TextScramble(el);

    // ... rest of your code
    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 3000);
      });
      counter = (counter + 1) % phrases.length;
    };
    
    next();
    // Cleanup function
    return () => {
      // Cleanup code if needed
    };

  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  // ... rest of your code

  return (
    <div>
      <div id="myNav" className={`overlay ${navVisible ? 'active' : ''}`}>
        <div className="overlay-content">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href={"#"}>Events</a>
          <a href={"#"}>Workshops</a>
          <a href={"#"}>Tronicals</a>
          <a href={"#"}>Team</a>
          <a href={"#"}>Certificate</a>
          <a href={"#"}>Gallery</a>
        </div>
      </div>
      <div id="navigation-bar">
        <div className={`menubar ${navVisible ? 'active' : ''}`} onClick={openNav}>
          <span id="first-class"></span>
          <span id="second-class"></span>
          <span id="third-class"></span>
        </div>
      </div>
      <div id="text">
        <div>Currents'23</div>
        <div className="text" ref={textRef}></div>
      </div>
      <div id="social-media-links">
            <a href={"https://www.instagram.com/currents_nitt/"} target={"_blank"} rel="noreferrer">
                <img src={"https://i.ibb.co/Cm2SPDq/facebook-logo.png"} alt={"facebook-logo"} border="0" className="social-media" />
            </a>
            <a href={"https://www.instagram.com/currents_nitt/"} target={"_blank"} rel="noreferrer">
                <img src={"https://i.ibb.co/qgKYJtZ/instagram-logo.png"} alt={"instagram-logo"} border="0" className="social-media" />
            </a>
            <a href={"https://www.linkedin.com/company/currents-nitt/"} target={"_blank"} rel="noreferrer">
                <img src={"https://i.ibb.co/Xy8ZT09/linkedin-logo.png"} alt={"linkedin-logo"} border="0" className="social-media" />
            </a>
            <a href={"https://www.linkedin.com/company/currents-nitt/"} target={"_blank"} rel="noreferrer">
                <img src={"https://i.ibb.co/7bVwg4s/twitter-logo.png"} alt={"twitter-logo"} border="0" className="social-media" />
            </a>
      </div>
    </div>
  )
}

export default HomePage;

/*global document*/
document.addEventListener("DOMContentLoaded", () => {
    const startScreen = document.getElementById('start-screen');
    const starsContainer = document.getElementById('stars-container');
    const moon = document.getElementById('moon');
    const message = document.getElementById('message');
    const popSound = document.getElementById('pop-sound');
    
    // Customize your message here
    const apologyMessage = [
      "I'm truly sorry for everything.",
      "You mean the world to me, and I hate that I hurt you.",
      "Can we please talk and make things right?",
      "❤️"
    ];
    
    startScreen.addEventListener('click', () => {
      startScreen.style.display = 'none';
      starsContainer.classList.remove('hidden');
      
      // Play the audio once at the beginning
      popSound.currentTime = 0;
      popSound.play().catch(e => console.log("Sound couldn't play:", e));
      
      // Create all stars within 5 seconds
      const totalStars = 100;
      const duration = 5000; // 5 seconds
      const interval = duration / totalStars; // Time between each star
      
      for (let i = 0; i < totalStars; i++) {
        setTimeout(() => {
          const star = document.createElement('div');
          star.className = 'star';
          star.style.left = `${Math.random() * 100}%`;
          star.style.top = `${Math.random() * 100}%`;
          star.style.width = `${Math.random() * 5 + 3}px`;
          star.style.height = star.style.width;
          starsContainer.appendChild(star);
          
          // Fade in star
          setTimeout(() => {
            star.style.opacity = '1';
          }, 100);
          
          // Show moon after last star
          if (i === totalStars - 1) {
            setTimeout(showMoon, 1000);
          }
        }, i * interval);
      }
    });
    
    function showMoon() {
      moon.classList.remove('hidden');
      moon.style.opacity = '1';
      
      // Grow moon animation
      setTimeout(() => {
        moon.style.width = '150px';
        moon.style.height = '150px';
        moon.textContent = 'Click Me';
        moon.style.display = 'flex';
        moon.style.justifyContent = 'center';
        moon.style.alignItems = 'center';
        moon.style.fontSize = '1.2rem';
        
        moon.onclick = showMessage;
      }, 1000);
    }
    
    function showMessage() {
        moon.style.transition = 'opacity 1.5s ease';
        moon.style.opacity = '0';
        
        setTimeout(() => {
            moon.classList.add('hidden');
            message.classList.remove('hidden');
            
            // Animate message appearance
            setTimeout(() => {
                message.style.transition = 'opacity 2s ease';
                message.style.opacity = '1';
            }, 100);
            
            // Add some stars animation when message appears
            for (let i = 0; i < 10; i++) {
                setTimeout(() => {
                    createShootingStar();
                }, i * 300);
            }
        }, 1500); // Wait for moon to fade out
    }

    function createShootingStar() {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        starsContainer.appendChild(shootingStar);
      
        // Randomize the start position
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
      
        // Animate the shooting star
        shootingStar.style.left = `${startX}%`;
        shootingStar.style.top = `${startY}%`;
      
        setTimeout(() => {
          shootingStar.remove();
        }, 2000); // Shooting star lasts for 2 seconds
      }
      
      // Add shooting stars every 3-5 seconds
      setInterval(() => {
        createShootingStar();
      }, Math.random() * 1000 + 1000);

      const backgroundMusic = document.getElementById('background-music');
      const toggleMusic = document.getElementById('toggle-music');
      
      // Initialize music state
      let musicPlaying = false;
      
      toggleMusic.addEventListener('click', async () => {
          try {
              if (musicPlaying) {
                  backgroundMusic.pause();
                  toggleMusic.textContent = '🔇';
              } else {
                  await backgroundMusic.play();
                  toggleMusic.textContent = '🔊';
              }
              musicPlaying = !musicPlaying;
          } catch (err) {
              console.log("Music playback failed:", err);
              // Fallback for browsers that block autoplay
              toggleMusic.textContent = '❌ (click to enable)';
          }
      });
      
      // Add this to help with mobile browsers
      document.addEventListener('click', async () => {
          try {
              await backgroundMusic.play();
          } catch (err) {
              // This is expected to fail until user interacts
          }
      }, { once: true });

    function starburst(x, y) {
        for (let i = 0; i < 20; i++) {
          const burstStar = document.createElement('div');
          burstStar.className = 'burst-star';
          starsContainer.appendChild(burstStar);
      
          const angle = Math.random() * 360;
          const distance = Math.random() * 100;
      
          burstStar.style.left = `${x}%`;
          burstStar.style.top = `${y}%`;
      
          setTimeout(() => {
            burstStar.style.transform = `translate(${distance * Math.cos(angle)}px, ${distance * Math.sin(angle)}px)`;
            burstStar.style.opacity = '0';
          }, 100);
        }
      }
      
      moon.addEventListener('click', (e) => {
        const rect = moon.getBoundingClientRect();
        const x = (rect.left + rect.right) / 2 / window.innerWidth * 100;
        const y = (rect.top + rect.bottom) / 2 / window.innerHeight * 100;
      
        starburst(x, y);
      });     
      
  });
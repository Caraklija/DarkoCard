document.addEventListener('DOMContentLoaded', function() {
    // Animal data
    const animals = [
        { name: "Lion", emoji: "🦁", color: "#ff9800" },
        { name: "Leopard", emoji: "🐆", color: "#ffb74d" },
        { name: "Llama", emoji: "🦙", color: "#a1887f" },
        { name: "Lobster", emoji: "🦞", color: "#d84315" },
        { name: "Ladybug", emoji: "🐞", color: "#e53935" },
        { name: "Lizard", emoji: "🦎", color: "#7cb342" },
        { name: "Lemur", emoji: "🐒", color: "#6d4c41" },
        { name: "Lynx", emoji: "🐾", color: "#8d6e63" }
    ];

    const emojisContainer = document.getElementById('emojisContainer');
    const animalsList = document.getElementById('animalsList');
    const letterL = document.getElementById('letterL');
    const soundBtn = document.getElementById('soundBtn');

    // Get letter L dimensions and position
    const letterRect = letterL.getBoundingClientRect();
    const letterSize = Math.min(letterRect.width, letterRect.height);
    const paddingDistance = letterSize * 0.6; // Distance from letter border

    // Create floating emojis around the letter L (outside the square)
    animals.forEach((animal, index) => {
        // Create floating emojis
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = animal.emoji;
        emoji.style.animationDelay = `${index * 0.7}s`;
        
        // Position emojis in a circular pattern OUTSIDE the letter square
        const angle = (index / animals.length) * 2 * Math.PI;
        
        // Calculate positions to be outside the letter square
        const centerX = 50; // percentage
        const centerY = 50; // percentage
        
        // Calculate position with padding distance from the letter
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.18; // Smaller radius to keep emojis closer
        
        // Position emojis further from center to be outside the letter
        const distanceMultiplier = 1.8; // Increased to push emojis further out
        const x = centerX + (radius * distanceMultiplier * Math.cos(angle)) / window.innerWidth * 100;
        const y = centerY + (radius * distanceMultiplier * Math.sin(angle)) / window.innerHeight * 100;
        
        emoji.style.left = `${x}%`;
        emoji.style.top = `${y}%`;
        
        // Add unique animation for each emoji
        emoji.style.animationDuration = `${3 + index * 0.5}s`;
        
        emojisContainer.appendChild(emoji);
        
        // Create animal list items
        const animalItem = document.createElement('div');
        animalItem.className = 'animal-item';
        animalItem.innerHTML = `
            <span class="animal-emoji">${animal.emoji}</span>
            <span class="animal-name">${animal.name}</span>
        `;
        animalItem.style.borderLeft = `5px solid ${animal.color}`;
        animalsList.appendChild(animalItem);
    });

    // Add click effect to the letter L
    letterL.addEventListener('click', function() {
        this.style.animation = 'none';
        this.style.transform = 'scale(1.2)';
        this.style.backgroundColor = '#ffcc80';
        
        // Also animate emojis
        const emojis = document.querySelectorAll('.emoji');
        emojis.forEach(emoji => {
            emoji.style.transform = 'scale(1.3)';
            emoji.style.transition = 'transform 0.3s';
        });
        
        setTimeout(() => {
            this.style.animation = 'pulse 2s infinite ease-in-out';
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '';
            
            // Reset emojis
            emojis.forEach(emoji => {
                emoji.style.transform = '';
                emoji.style.transition = '';
            });
        }, 500);
        
        // Play sound on click too
        playLetterSound();
    });

    // Sound button functionality
    soundBtn.addEventListener('click', playLetterSound);
    
    function playLetterSound() {
        // For a real app, you would use an audio file
        // Here we'll use the Web Speech API to pronounce the letter
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance();
            speech.text = "L";
            speech.rate = 0.8;
            speech.pitch = 1.2;
            window.speechSynthesis.speak(speech);
            
            // Visual feedback
            soundBtn.innerHTML = '<i class="fas fa-volume-up"></i> Playing Sound...';
            soundBtn.style.background = 'linear-gradient(to right, #ff9800, #ffb74d)';
            
            // Make emojis bounce when sound plays
            const emojis = document.querySelectorAll('.emoji');
            emojis.forEach(emoji => {
                emoji.style.animation = 'none';
                emoji.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    emoji.style.animation = '';
                    emoji.style.transform = '';
                }, 300);
            });
            
            setTimeout(() => {
                soundBtn.innerHTML = '<i class="fas fa-volume-up"></i> Hear Letter Sound';
                soundBtn.style.background = 'linear-gradient(to right, #43a047, #66bb6a)';
            }, 1000);
        } else {
            alert("Your browser doesn't support text-to-speech. Try Chrome or Edge!");
        }
    }

    // Make emojis move on mouse move (more subtle)
    document.addEventListener('mousemove', function(e) {
        const emojis = document.querySelectorAll('.emoji');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        emojis.forEach((emoji, index) => {
            const speed = 0.3; // Reduced speed for subtle movement
            const x = (mouseX - 0.5) * speed * 50;
            const y = (mouseY - 0.5) * speed * 50;
            
            // Only apply subtle movement
            emoji.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Responsive adjustments on window resize
    window.addEventListener('resize', function() {
        // Reposition emojis on resize to stay outside the letter
        const emojis = document.querySelectorAll('.emoji');
        animals.forEach((animal, index) => {
            const angle = (index / animals.length) * 2 * Math.PI;
            const radius = Math.min(window.innerWidth, window.innerHeight) * 0.18;
            const centerX = 50;
            const centerY = 50;
            
            // Position emojis further from center
            const distanceMultiplier = 1.8;
            const x = centerX + (radius * distanceMultiplier * Math.cos(angle)) / window.innerWidth * 100;
            const y = centerY + (radius * distanceMultiplier * Math.sin(angle)) / window.innerHeight * 100;
            
            if (emojis[index]) {
                emojis[index].style.left = `${x}%`;
                emojis[index].style.top = `${y}%`;
            }
        });
    });

    // Add some random movement to emojis (outside the letter)
    setInterval(() => {
        const emojis = document.querySelectorAll('.emoji');
        emojis.forEach((emoji, index) => {
            const randomX = Math.random() * 25 - 12.5;
            const randomY = Math.random() * 25 - 12.5;
            
            // Move emojis outward from center
            const currentLeft = parseFloat(emoji.style.left || 50);
            const currentTop = parseFloat(emoji.style.top || 50);
            
            // Calculate direction from center
            const dx = currentLeft - 50;
            const dy = currentTop - 50;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Push further out if too close
            if (distance < 15) {
                const angle = Math.atan2(dy, dx);
                const newX = 50 + 20 * Math.cos(angle);
                const newY = 50 + 20 * Math.sin(angle);
                emoji.style.left = `${newX}%`;
                emoji.style.top = `${newY}%`;
            }
            
            emoji.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    }, 4000);
});
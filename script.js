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

    // Create floating emojis around the letter L
    animals.forEach((animal, index) => {
        // Create floating emojis
        const emoji = document.createElement('div');
        emoji.className = 'emoji';
        emoji.textContent = animal.emoji;
        emoji.style.animationDelay = `${index * 0.7}s`;
        
        // Position emojis in a circular pattern
        const angle = (index / animals.length) * 2 * Math.PI;
        const radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;
        const centerX = 50; // percentage
        const centerY = 50; // percentage
        
        const x = centerX + radius * Math.cos(angle) / window.innerWidth * 100;
        const y = centerY + radius * Math.sin(angle) / window.innerHeight * 100;
        
        emoji.style.left = `${x}%`;
        emoji.style.top = `${y}%`;
        
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
        
        setTimeout(() => {
            this.style.animation = 'pulse 2s infinite ease-in-out';
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '';
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
            
            setTimeout(() => {
                soundBtn.innerHTML = '<i class="fas fa-volume-up"></i> Hear Letter Sound';
                soundBtn.style.background = 'linear-gradient(to right, #43a047, #66bb6a)';
            }, 1000);
        } else {
            alert("Your browser doesn't support text-to-speech. Try Chrome or Edge!");
        }
    }

    // Make emojis move on mouse move
    document.addEventListener('mousemove', function(e) {
        const emojis = document.querySelectorAll('.emoji');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        emojis.forEach((emoji, index) => {
            const speed = 0.5;
            const x = (mouseX - 0.5) * speed * 100;
            const y = (mouseY - 0.5) * speed * 100;
            
            // Only apply subtle movement
            emoji.style.transform = `translate(${x}px, ${y}px)`;
        });
    });

    // Responsive adjustments on window resize
    window.addEventListener('resize', function() {
        // Reposition emojis on resize
        const emojis = document.querySelectorAll('.emoji');
        animals.forEach((animal, index) => {
            const angle = (index / animals.length) * 2 * Math.PI;
            const radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;
            const centerX = 50;
            const centerY = 50;
            
            const x = centerX + radius * Math.cos(angle) / window.innerWidth * 100;
            const y = centerY + radius * Math.sin(angle) / window.innerHeight * 100;
            
            if (emojis[index]) {
                emojis[index].style.left = `${x}%`;
                emojis[index].style.top = `${y}%`;
            }
        });
    });

    // Add some random movement to emojis
    setInterval(() => {
        const emojis = document.querySelectorAll('.emoji');
        emojis.forEach(emoji => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            emoji.style.transform = `translate(${randomX}px, ${randomY}px)`;
        });
    }, 3000);
});
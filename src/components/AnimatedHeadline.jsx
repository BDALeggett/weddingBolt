import { useState, useEffect, useRef } from 'react';

const AnimatedHeadline = ({ 
  text = "EARLY BIRD TICKET", 
  className = "" 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isAnimating, setIsAnimating] = useState(true);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  
  // Random character pool (A-Z, 0-9)
  const chars = 'HUSKIES';
  
  // Vibrant gradient colors for flash effect
  const flashColors = [
    'from-grey-400 to-green-500',
    'from-green-400 to-white-500', 
    'from-white-400 to-grey-500'
  ];
  
  const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];
  
  const getRandomFlashColor = () => flashColors[Math.floor(Math.random() * flashColors.length)];
  
  useEffect(() => {
    // Reset animation on component mount/remount
    setDisplayText('');
    setIsAnimating(true);
    startTimeRef.current = null;
    
    const animate = (timestamp) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const elapsed = timestamp - startTimeRef.current;
      const totalDuration = 2200; // 1.5 seconds total
      const progress = Math.min(elapsed / totalDuration, 1);
      
      // Calculate how many characters should be "revealed" based on progress
      const revealedCount = Math.floor(progress * text.length);
      
      let newDisplayText = '';
      
      // Build the display text character by character
      for (let i = 0; i < text.length; i++) {
        if (i < revealedCount) {
          // Character is fully revealed
          newDisplayText += text[i];
        } else if (i === revealedCount && progress < 1) {
          // Current character being scrambled
          newDisplayText += text[i] === ' ' ? ' ' : getRandomChar();
        } else {
          // Future characters show as random scramble
          newDisplayText += text[i] === ' ' ? ' ' : getRandomChar();
        }
      }
      
      setDisplayText(newDisplayText);
      
      // Continue animation until complete
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Animation complete - set final text and stop
        setDisplayText(text);
        setIsAnimating(false);
      }
    };
    
    // Start the animation with a slight delay for visual impact
    const startAnimation = () => {
      animationRef.current = requestAnimationFrame(animate);
    };
    
    const timeoutId = setTimeout(startAnimation, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [text]); // Re-run if text prop changes
  
  // Render each character with potential flash effect
  const renderCharacters = () => {
    return displayText.split('').map((char, index) => {
      const isScrambling = isAnimating && char !== text[index] && char !== ' ';
      const flashColor = getRandomFlashColor();
      
      return (
        <span
          key={index}
          className={`inline-block ${
            isScrambling 
              ? `bg-gradient-to-r ${flashColor} bg-clip-text text-transparent animate-pulse` 
              : ''
          }`}
          style={{
            // Preserve spacing for proper layout
            minWidth: char === ' ' ? '0.25em' : 'auto'
          }}
        >
          {char}
        </span>
      );
    });
  };
  
  return (
    <h1 className={`font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-300 ${className}`}>
      {renderCharacters()}
    </h1>
  );
};

export default AnimatedHeadline;

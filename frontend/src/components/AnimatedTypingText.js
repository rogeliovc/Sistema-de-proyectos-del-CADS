import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';

const AnimatedTypingText = ({ text, speed = 50, variant = 'h2', color = 'inherit', highlightColor = 'secondary.main', highlightText = '' }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  
  const textToType = Array.isArray(text) ? text[loopNum % text.length] : text;
  const typingSpeed = isDeleting ? speed / 2 : speed;

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && currentIndex < textToType.length) {
        setDisplayedText(textToType.substring(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      } else if (isDeleting && currentIndex > 0) {
        setDisplayedText(textToType.substring(0, currentIndex - 1));
        setCurrentIndex(currentIndex - 1);
      } else if (isDeleting && currentIndex === 0) {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      } else if (!isDeleting && currentIndex === textToType.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentIndex, isDeleting, loopNum, textToType, typingSpeed]);

  const renderText = () => {
    if (!highlightText) return displayedText;
    
    const parts = displayedText.split(highlightText);
    return parts.map((part, index) => (
      <React.Fragment key={index}>
        {part}
        {index < parts.length - 1 && (
          <Box component="span" sx={{ color: highlightColor }}>
            {highlightText}
          </Box>
        )}
      </React.Fragment>
    ));
  };

  return (
    <Typography 
      variant={variant} 
      component="h1" 
      sx={{ 
        fontWeight: 'bold',
        color: color,
        '& span': {
          position: 'relative',
          '&::after': {
            content: '"|"',
            position: 'absolute',
            right: -10,
            opacity: 1,
            animation: 'blink 1s step-end infinite',
            '@keyframes blink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 }
            }
          }
        }
      }}
    >
      {renderText()}
    </Typography>
  );
};

export default AnimatedTypingText;

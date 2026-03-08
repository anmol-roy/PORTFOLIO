import React from 'react';

const TypingName = () => {
  const [displayText, setDisplayText] = React.useState('');
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const name = "Anmol Royal";

  React.useEffect(() => {
    if (currentIndex < name.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + name[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150); // Adjust delay here (150ms per character)
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, name]);

  return (
    <span>
      {displayText}
      {currentIndex < name.length && (
        <span className="animate-pulse ml-1">|</span> // Cursor blink effect
      )}
    </span>
  );
};

export default TypingName;
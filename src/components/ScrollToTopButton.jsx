import { useState, useEffect } from 'react';
import '../assets/styles/ScrollToTopButton.css';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 80) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <div>
            <button
                onClick={scrollToTop}
                className={`topbtn ${isVisible ? 'visible' : ''}`}
            >
                UP
            </button>
        </div>
    );
};

export default ScrollToTopButton;

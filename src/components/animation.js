
export const fadeIn = (context) => {
    context.animate([
        { opacity: 0, easing: 'ease-out' },
        { opacity: 1, easing: 'ease-in' }
    ],
    {
        duration: 250,
    })
    context.style.opacity = 1;
}

export const fadeOut = (context) => {
    context.animate([
        { opacity: 1, easing: 'ease-out' },
        { opacity: 0, easing: 'ease-in' }
    ],
    {
        duration: 250,
    })
    context.style.opacity = 0;
}
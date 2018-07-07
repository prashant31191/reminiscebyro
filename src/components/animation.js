

export const fadeIn = (context, { duration } = {}) => {
    return context.animate([
        { opacity: 0, easing: 'ease-out' },
        { opacity: 1, easing: 'ease-in' }
    ],
        {
            duration: duration ? duration : 300,
        })
}

export const fadeOut = (context, { duration } = {}) => {
    return context.animate([
        { opacity: 1, easing: 'ease-out' },
        { opacity: 0, easing: 'ease-in' }
    ],
        {
            duration: duration ? duration : 300,
        })
}

export const slideUp = (context, { duration } = {}) => {
    return context.animate([
        { transform: 'translate3d(0, 0, 0)', easing: 'ease-out' },
        { transform: 'translate3d(0, -100%, 0)', easing: 'ease-in' }
    ],
        {
            duration: duration ? duration : 300,
        })
}
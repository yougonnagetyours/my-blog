const siteMetadata = {
    title: `you gonna get yours`,
    siteUrl: `https://woody-blog.netlify.app/`,
    capitalizeTitleOnHome: true,
    logo: `/images/4x4_1.png`,
    icon: `/images/4x4_1.png`,
    titleImage: `/images/world.jpg`,
    ogImage: `/images/world.jpg`,
    twoColumnWall: true,
    cookiePolicy: true,
    introTag: `TRAVEL BLOG`,
    description: `Expeditions everywhere and nowhere in old but hot Nissan Terrano II.`,
    about:
        "I am Michal, but call me Woody.",
    author: `@_yougonnagetyours`,
    blogItemsPerPage: 10,
    portfolioItemsPerPage: 10,
    darkmode: true,
    switchTheme: false,
    navLinks: [
        {
            name: "HOME",
            url: "/",
        },
        {
            name: "ABOUT ME",
            url: "/about",
        },
        {
            name: "BLOG",
            url: "/blog",
        },
        
        {
            name: "CONTACT",
            url: "/contact",
        },
    ],
    footerLinks: [
        {
            name: "PRIVACY POLICY",
            url: "/privacy-policy",
        },
    ],
    social: [
        {
            name: "Facebook",
            icon: "/images/Facebook.svg",
            url: "https://pl-pl.facebook.com/people/Micha%C5%82-Potoczny/100000361479581",
        },
        {
            name: "Instagram",
            icon: "/images/Instagram.svg",
            url: "https://www.instagram.com/yougonnagetyours/",
        },
        
    ],
    contact: {
        // leave empty ('') or false to hide form
        api_url: '',
        description: ``,
        mail: "michal.potoczny.92@gmail.com",
        phone: "694-773-906",
        address: "",
    },
    disqus: ``
}

const beforeContactFormSubmit = data => {
    // Code 0 - success
    // Code 1 - Name
    // Code 2 - Email
    // Code 3 - Message
    // Code 4 - Other
    const errors = []

    if (data.name.trim().length < 2) {
        errors.push({
            code: 1,
            message: "Enter a name",
        })
    }

    if (!data.email.match(/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/)) {
        errors.push({
            code: 2,
            message: "Enter a valid email address",
        })
    }

    if (data.message.trim().length < 15) {
        errors.push({
            code: 3,
            message: "Enter a message with atleast 15 characters",
        })
    }

    if (errors.length > 0)
        return {
            result: false,
            errors: errors,
        }

    return {
        data: {
            name: data.name,
            email: data.email,
            message: data.message,
        },
        result: true,
    }
}

const contactFormSubmit = async (api, data) => {
    let res: any = await fetch(api, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })

    res = await res.json()

    if (res.success) {
        return {
            result: true,
        }
    }
    return {
        result: false,
        ...res,
    }
}

const defaults = {
    disqus: null,
    twoColumnWall: true,
    darkmode: false,
    switchTheme: true,
    capitalizeTitleOnHome: true,
    cookiePolicy: false
}

Object.keys(defaults).forEach(item => {
    if (siteMetadata[item] === undefined) {
        siteMetadata[item] = defaults[item]
    }
})

export { siteMetadata, beforeContactFormSubmit, contactFormSubmit }

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
    name: "Admin Panel- Campus Navigation System",
    description: "Make beautiful websites regardless of your design experience.",
    navItems: [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Buildings",
            href: "/buildings",
        },
        {
            label: "Docs",
            href: "/docs",
        },
        {
            label: "Pricing",
            href: "/pricing",
        },
        {
            label: "Blog",
            href: "/blog",
        },
        {
            label: "About",
            href: "/about",
        }
    ]
};

export interface NavigationCategory {
  title: string;
  items: NavigationItem[];
}

export interface NavigationItem {
  title: string;
  href: string;
  order?: number;
}

export const navigation: NavigationCategory[] = [
  {
    title: 'components.footer.categories.product',
    items: [
      {
        title: 'pages.features.title',
        href: '#',
        order: 1,
      },
      {
        title: 'pages.solution.title',
        href: '#',
        order: 2,
      },
      {
        title: 'pages.customers.title',
        href: '#',
        order: 3,
      },
      {
        title: 'pages.pricing.title',
        href: '#',
        order: 4,
      },
    ],
  },
  {
    title: 'components.footer.categories.help',
    items: [
      {
        title: 'pages.help.title',
        href: '#',
      },
      {
        title: 'pages.support.title',
        href: '#',
      },
      {
        title: 'pages.faq.title',
        href: '#',
      },
      {
        title: 'pages.contact.title',
        href: '#',
      },
    ],
  },
  {
    title: 'components.footer.categories.company',
    items: [
      {
        title: 'pages.about.title',
        href: '#',
      },
      {
        title: 'pages.careers.title',
        href: '#',
      },
      {
        title: 'pages.blog.title',
        href: '#',
      },
      {
        title: 'pages.press.title',
        href: '#',
      },
    ],
  },
  {
    title: 'components.footer.categories.legal',
    items: [
      {
        title: 'pages.licence.title',
        href: '#',
      },
      {
        title: 'pages.privacy.title',
        href: '#',
      },
      {
        title: 'pages.cookies.title',
        href: '#',
      },
      {
        title: 'pages.security.title',
        href: '#',
      },
    ],
  },
];

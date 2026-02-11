/**
 * SEO metadata per route. Used by SEO.jsx for route-aware title, description, canonical, OG, Twitter.
 * Add or edit entries when adding new routes (see App.jsx).
 */
export const BASE_URL = 'https://elinorbahiti.ca';

export const routeMetadata = {
  '/': {
    title: 'Elinor Bahiti | Registered Condominium Manager',
    description:
      'Elinor Bahiti, a licensed condominium manager in Toronto, specializes in ethical condo management, financial analysis, technical building systems, and administrative excellence. Trustworthy management services for Toronto condo corporations.',
  },
  '/credentials': {
    title: 'Credentials | Elinor Bahiti',
    description:
      'Professional credentials, certifications, and qualifications for Elinor Bahiti, RCM. Condominium management, ethics, financials, and building systems.',
  },
  '/services': {
    title: 'Services | Elinor Bahiti',
    description:
      'Condominium management services offered by Elinor Bahiti in Toronto. Property management, financial oversight, and administrative excellence for condo corporations.',
  },
  '/contact': {
    title: 'Contact | Elinor Bahiti',
    description:
      'Get in touch with Elinor Bahiti for condominium management inquiries, hiring, or general questions. Toronto-based RCM.',
  },
};

/** Default metadata when route is not in routeMetadata (fallback to home). */
export const defaultMetadata = routeMetadata['/'];

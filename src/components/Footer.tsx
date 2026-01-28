import React from 'react';

export function Footer() {
  const sections = [
    {
      title: 'Our Services',
      links: ['Multi Media', 'Digital Marketing services', '2D / 3D Animations', 'App / Web Development'],
      type: 'text'
    },
    {
      title: 'Our Address',
      links: ['LAUNCHPAD HQ', '6th Floor, DHFLVC, Silicon Towers, Kondapur, Hyderabad-500032.'],
      type: 'text'
    },
    {
      title: 'Follow Us',
      socialLinks: [
        { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61574561078561', icon: 'facebook' },
        { name: 'Twitter', url: 'https://twitter.com', icon: 'twitter' },
        { name: 'Instagram', url: 'https://www.instagram.com/bristletech.ai/', icon: 'instagram' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/company/bristle-tech/posts/?feedView=all', icon: 'linkedin' }
      ],
      type: 'social'
    }
  ];

  // Social media icon components
  const SocialIcon = ({ icon }: { icon: string }) => {
    const iconClass = "w-6 h-6";

    switch (icon) {
      case 'facebook':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case 'twitter':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.017 0C8.396 0 7.932.013 6.715.058 5.507.103 4.677.277 3.954.525 3.199.787 2.543 1.175 1.893 1.825.926 2.792.521 3.934.058 6.715.013 7.932 0 8.396 0 12.017c0 3.624.013 4.09.058 5.307.045 1.218.219 2.048.467 2.771.262.755.65 1.411 1.3 2.061.65.65 1.306 1.038 2.061 1.3.723.248 1.553.422 2.771.467C7.932 23.987 8.396 24 12.017 24s4.085-.013 5.302-.058c1.218-.045 2.048-.219 2.771-.467.755-.262 1.411-.65 2.061-1.3.65-.65 1.038-1.306 1.3-2.061.248-.723.422-1.553.467-2.771.045-1.217.058-1.678.058-5.302s-.013-4.085-.058-5.302c-.045-1.218-.219-2.048-.467-2.771a5.428 5.428 0 00-1.3-2.061 5.428 5.428 0 00-2.061-1.3c-.723-.248-1.553-.422-2.771-.467C16.102.013 15.641 0 12.017 0zM12.017 2.13c3.586 0 4.009.016 5.42.061 1.308.059 2.018.271 2.491.451.627.244 1.074.536 1.544 1.006s.762.917 1.006 1.544c.18.473.392 1.183.451 2.491.045 1.411.061 1.834.061 5.42s-.016 4.009-.061 5.42c-.059 1.308-.271 2.018-.451 2.491-.244.627-.536 1.074-1.006 1.544s-.917.762-1.544 1.006c-.473.18-1.183.392-2.491.451-1.411.045-1.834.061-5.42.061s-4.009-.016-5.42-.061c-1.308-.059-2.018-.271-2.491-.451a4.152 4.152 0 01-1.544-1.006 4.152 4.152 0 01-1.006-1.544c-.18-.473-.392-1.183-.451-2.491C2.146 16.026 2.13 15.603 2.13 12.017s.016-4.009.061-5.42c.059-1.308.271-2.018.451-2.491.244-.627.536-1.074 1.006-1.544s.917-.762 1.544-1.006c.473-.18 1.183-.392 2.491-.451 1.411-.045 1.834-.061 5.42-.061z" />
            <path d="M12.017 5.838a6.179 6.179 0 100 12.358 6.179 6.179 0 000-12.358zM12.017 16a3.821 3.821 0 110-7.642 3.821 3.821 0 010 7.642zM19.846 5.595a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z" />
          </svg>
        );
      case 'linkedin':
        return (
          <svg className={iconClass} viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer
      style={{
        background: 'linear-gradient(to bottom, var(--lp-bg-solid), #0F172A)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="grid md:grid-cols-4 gap-8 md:gap-10 mb-8 md:mb-10">
          <div>
            {/* Logo - ONLY gradient text */}
            <h3 className="text-2xl font-bold lp-text-gradient mb-4">Launchpad</h3>
            <p className="text-slate-400 text-sm">
              Two paths. One beginning. Your journey from Zero to One starts here. Innovating the future with cutting-edge technology solutions.
            </p>
          </div>

          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="mb-4 font-semibold text-white">{section.title}</h4>
              {section.type === 'social' ? (
                <div className="flex gap-4">
                  {section.socialLinks && section.socialLinks.map((link, linkIndex) => (
                    <a
                      key={linkIndex}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                      aria-label={link.name}
                    >
                      <SocialIcon icon={link.icon} />
                    </a>
                  ))}
                </div>
              ) : (
                <ul className="space-y-2">
                  {section.links && section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {section.title === 'Our Address' ? (
                        <span className="text-slate-400 text-sm">
                          {link}
                        </span>
                      ) : (
                        <a
                          href="#"
                          className="text-slate-400 hover:text-white transition-colors text-sm"
                        >
                          {link}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <p className="text-slate-500 text-sm">
            © 2025 Launchpad. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

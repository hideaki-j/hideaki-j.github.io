document.addEventListener('DOMContentLoaded', () => {
    initContent();
    initSmoothScrolling();
    initScrollSpy();
    initScrollAnimations();
});

function initContent() {
    const content = window.siteContent;
    if (!content) {
        return;
    }

    renderProfile(content.profile);
    renderNavigation(content.navigation);
    renderFooter(content.footerHTML);

    const pageKey = document.body.dataset.page;
    const pageContent = content.pages?.[pageKey];

    if (!pageKey || !pageContent) {
        return;
    }

    if (pageKey === 'index' && pageContent.biography) {
        renderBiography(pageContent.biography);
    }

    if (pageKey === 'experience' && pageContent.timeline) {
        renderTimeline('experience', pageContent.timeline);
    }

    if (pageKey === 'education' && pageContent.timeline) {
        renderTimeline('education', pageContent.timeline);
    }

    if (pageKey === 'achievements') {
        renderAchievements(pageContent);
    }

    if (pageKey === 'talks') {
        renderTalks(pageContent);
    }

    if (pageKey === 'volunteer') {
        renderVolunteer(pageContent);
    }

    if (pageKey === 'awards') {
        renderAwards(pageContent);
    }

    if (pageKey === 'publications') {
        renderPublications(pageContent);
    }

    if (pageKey === 'others') {
        renderOthers(pageContent);
    }
}

function renderProfile(profile) {
    const container = document.getElementById('profile-section');
    if (!container || !profile) {
        return;
    }

    const socialLinksHTML = (profile.socialLinks || []).map(link => (
        `<a href="${link.href}" target="_blank" title="${link.title}"><i class="${link.icon}"></i></a>`
    )).join('');

    const image = profile.image || {};

    container.innerHTML = `
        <div class="profile-image">
            <img src="${image.src || ''}" alt="${image.alt || ''}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="profile-placeholder">
                <i class="${image.placeholderIcon || 'fas fa-user'}"></i>
            </div>
        </div>
        <h1>${profile.name || ''}</h1>
        <p class="tagline">${profile.tagline || ''}</p>
        <div class="social-links">
            ${socialLinksHTML}
        </div>
    `;
}

function renderNavigation(navigation = []) {
    const container = document.getElementById('sidebar-nav');
    if (!container) {
        return;
    }

    const currentPage = document.body.dataset.page;
    container.innerHTML = navigation.map(link => {
        const isActive = link.page === currentPage ? ' active' : '';
        return `
            <a href="${link.href}" class="nav-link${isActive}">
                <i class="${link.icon}"></i> ${link.label}
            </a>
        `;
    }).join('');
}

function renderFooter(footerHTML) {
    const footer = document.getElementById('footer-text');
    if (footer && footerHTML) {
        footer.innerHTML = footerHTML;
    }
}

function renderBiography(biography) {
    const container = document.getElementById('bio-card');
    if (!container) {
        return;
    }

    const paragraphs = (biography.paragraphsHTML || []).join('\n');
    container.innerHTML = `
        <h2>${biography.titleHTML || ''}</h2>
        ${paragraphs}
    `;
}

function renderTimeline(prefix, timeline) {
    const titleEl = document.getElementById(`${prefix}-title`);
    const container = document.getElementById(`${prefix}-timeline`);

    if (titleEl && timeline.titleHTML) {
        titleEl.innerHTML = timeline.titleHTML;
    }

    if (!container) {
        return;
    }

    const iconLibrary = window.siteIcons || {};

    container.innerHTML = (timeline.items || []).map(item => {
        const iconRef = item.iconKey || item.icon;
        const iconConfig = typeof iconRef === 'string' ? iconLibrary[iconRef] : undefined;

        let iconHTML = '';

        if (iconConfig && iconConfig.src) {
            const defaultScale = typeof iconConfig.scale === 'number' ? iconConfig.scale : 100;
            const rawScale = typeof item.iconScale === 'number' ? item.iconScale : defaultScale;
            const clampedScale = Math.max(0, Math.min(rawScale, 100));
            const scaleRatio = clampedScale / 100;
            const scaleAttr = scaleRatio !== 1 ? ` style="--icon-image-scale: ${scaleRatio};"` : '';
            const altText = iconConfig.alt || item.heading || '';

            iconHTML = `
                <div class="timeline-icon-inner"${scaleAttr}>
                    <img src="${iconConfig.src}" alt="${altText}">
                </div>
            `;
        } else if (typeof iconRef === 'string' && iconRef.includes('.')) {
            const rawScale = typeof item.iconScale === 'number' ? item.iconScale : 100;
            const clampedScale = Math.max(0, Math.min(rawScale, 100));
            const scaleRatio = clampedScale / 100;
            const scaleAttr = scaleRatio !== 1 ? ` style="--icon-image-scale: ${scaleRatio};"` : '';
            const altText = item.heading || '';

            iconHTML = `
                <div class="timeline-icon-inner"${scaleAttr}>
                    <img src="${iconRef}" alt="${altText}">
                </div>
            `;
        } else {
            iconHTML = iconRef || '';
        }

        return `
            <div class="card timeline-card">
                <div class="timeline-icon">${iconHTML}</div>
                <h3>${item.heading || ''}</h3>
                <p class="role">${item.role || ''}</p>
                <p class="date">${item.date || ''}</p>
                ${item.bodyHTML || ''}
            </div>
        `;
    }).join('');
}

function renderAchievements(achievements) {
    const titleEl = document.getElementById('achievements-title');
    const grid = document.getElementById('achievements-grid');
    const ctaContainer = document.getElementById('achievements-cta');

    if (titleEl && achievements.titleHTML) {
        titleEl.innerHTML = achievements.titleHTML;
    }

    if (grid) {
        grid.innerHTML = (achievements.cards || []).map(card => `
            <div class="card achievement-card">
                <div class="achievement-icon">
                    <i class="${card.iconClass || ''}"></i>
                </div>
                <h3>${card.title || ''}</h3>
                <p class="achievement-number">${card.number || ''}</p>
                <p class="achievement-desc">${card.descriptionHTML || ''}</p>
            </div>
        `).join('');
    }

    if (ctaContainer && achievements.cta) {
        const { href, iconClass, label } = achievements.cta;
        ctaContainer.innerHTML = `
            <a href="${href || '#'}" target="_blank" class="cta-button">
                <i class="${iconClass || ''}"></i> ${label || ''}
            </a>
        `;
    }
}

function renderTalks(talks) {
    const titleEl = document.getElementById('talks-title');
    const container = document.getElementById('talks-timeline');

    if (titleEl && talks.titleHTML) {
        titleEl.innerHTML = talks.titleHTML;
    }

    if (!container || !talks.timeline) {
        return;
    }

    const iconLibrary = window.siteIcons || {};

    container.innerHTML = (talks.timeline.items || []).map(item => {
        const iconRef = item.iconKey || item.icon;
        const iconConfig = typeof iconRef === 'string' ? iconLibrary[iconRef] : undefined;

        let iconHTML = '';
        const bodyHTML = item.bodyHTML || '';
        const textHTML = `<p class="single-line-text">${bodyHTML}</p>`;

        if (iconConfig && iconConfig.src) {
            const defaultScale = typeof iconConfig.scale === 'number' ? iconConfig.scale : 100;
            const rawScale = typeof item.iconScale === 'number' ? item.iconScale : defaultScale;
            const clampedScale = Math.max(0, Math.min(rawScale, 100));
            const scaleRatio = clampedScale / 100;
            const scaleAttr = scaleRatio !== 1 ? ` style="--icon-image-scale: ${scaleRatio};"` : '';
            const altText = iconConfig.alt || '';

            iconHTML = `
                <div class="timeline-icon">
                    <div class="timeline-icon-inner"${scaleAttr}>
                        <img src="${iconConfig.src}" alt="${altText}">
                    </div>
                </div>
            `;
        }

        if (iconHTML) {
            return `
                <div class="card timeline-card single-line-card">
                    ${iconHTML}
                    ${textHTML}
                </div>
            `;
        } else {
            return `
                <div class="card timeline-card talk-item">
                    <p>${item.bodyHTML || ''}</p>
                </div>
            `;
        }
    }).join('');
}

function renderVolunteer(volunteer) {
    const titleEl = document.getElementById('volunteer-title');
    const container = document.getElementById('volunteer-timeline');

    if (titleEl && volunteer.titleHTML) {
        titleEl.innerHTML = volunteer.titleHTML;
    }

    if (!container || !volunteer.timeline) {
        return;
    }

    const iconLibrary = window.siteIcons || {};

    container.innerHTML = (volunteer.timeline.items || []).map(item => {
        const iconRef = item.iconKey || item.icon;
        const iconConfig = typeof iconRef === 'string' ? iconLibrary[iconRef] : undefined;

        let iconHTML = '';
        const bodyHTML = item.bodyHTML || '';
        const textHTML = `<p class="single-line-text">${bodyHTML}</p>`;

        if (iconConfig && iconConfig.src) {
            const defaultScale = typeof iconConfig.scale === 'number' ? iconConfig.scale : 100;
            const rawScale = typeof item.iconScale === 'number' ? item.iconScale : defaultScale;
            const clampedScale = Math.max(0, Math.min(rawScale, 100));
            const scaleRatio = clampedScale / 100;
            const scaleAttr = scaleRatio !== 1 ? ` style="--icon-image-scale: ${scaleRatio};"` : '';
            const altText = iconConfig.alt || '';

            iconHTML = `
                <div class="timeline-icon">
                    <div class="timeline-icon-inner"${scaleAttr}>
                        <img src="${iconConfig.src}" alt="${altText}">
                    </div>
                </div>
            `;
        }

        if (iconHTML) {
            return `
                <div class="card timeline-card single-line-card">
                    ${iconHTML}
                    ${textHTML}
                </div>
            `;
        } else {
            return `
                <div class="card timeline-card talk-item">
                    <p>${item.bodyHTML || ''}</p>
                </div>
            `;
        }
    }).join('');
}

function renderAwards(awards) {
    const titleEl = document.getElementById('awards-title');
    const introEl = document.getElementById('awards-intro');
    const container = document.getElementById('awards-timeline');

    if (titleEl && awards.titleHTML) {
        titleEl.innerHTML = awards.titleHTML;
    }

    if (introEl && awards.intro) {
        introEl.innerHTML = awards.intro;
    }

    if (!container || !awards.timeline) {
        return;
    }

    const iconLibrary = window.siteIcons || {};

    container.innerHTML = (awards.timeline.items || []).map(item => {
        const iconRef = item.iconKey || item.icon;
        const iconConfig = typeof iconRef === 'string' ? iconLibrary[iconRef] : undefined;

        let iconHTML = '';
        const bodyHTML = item.bodyHTML || '';
        const textHTML = `<p class="single-line-text">${bodyHTML}</p>`;

        if (iconConfig && iconConfig.src) {
            const defaultScale = typeof iconConfig.scale === 'number' ? iconConfig.scale : 100;
            const rawScale = typeof item.iconScale === 'number' ? item.iconScale : defaultScale;
            const clampedScale = Math.max(0, Math.min(rawScale, 100));
            const scaleRatio = clampedScale / 100;
            const scaleAttr = scaleRatio !== 1 ? ` style="--icon-image-scale: ${scaleRatio};"` : '';
            const altText = iconConfig.alt || '';

            iconHTML = `
                <div class="timeline-icon">
                    <div class="timeline-icon-inner"${scaleAttr}>
                        <img src="${iconConfig.src}" alt="${altText}">
                    </div>
                </div>
            `;
        }

        if (iconHTML) {
            return `
                <div class="card timeline-card single-line-card">
                    ${iconHTML}
                    ${textHTML}
                </div>
            `;
        } else {
            return `
                <div class="card timeline-card talk-item">
                    <p>${item.bodyHTML || ''}</p>
                </div>
            `;
        }
    }).join('');
}

function renderPublications(publications) {
    const titleEl = document.getElementById('publications-title');
    const introEl = document.getElementById('publications-intro');

    if (titleEl && publications.titleHTML) {
        titleEl.innerHTML = publications.titleHTML;
    }

    if (introEl && publications.intro) {
        introEl.innerHTML = publications.intro;
    }
}

function renderOthers(others) {
    const titleEl = document.getElementById('others-title');
    const container = document.getElementById('others-content');

    if (titleEl && others.titleHTML) {
        titleEl.innerHTML = others.titleHTML;
    }

    if (!container) {
        return;
    }

    container.innerHTML = (others.sections || []).map(section => {
        let contentHTML = '';
        
        // If section has bodyHTML (like Professional Development)
        if (section.bodyHTML) {
            contentHTML = section.bodyHTML;
        }
        
        // If section has items (like Teaching, Certificates, etc.)
        if (section.items && section.items.length > 0) {
            contentHTML += '<ul>' + section.items.map(item => {
                let itemHTML = '<li>';
                
                if (item.role) {
                    itemHTML += `<strong>${item.role}</strong>`;
                }
                
                if (item.date) {
                    itemHTML += ` <span class="date">(${item.date})</span>`;
                }
                
                if (item.description) {
                    itemHTML += ` - ${item.description}`;
                }
                
                if (item.bodyHTML) {
                    itemHTML += item.bodyHTML;
                }
                
                itemHTML += '</li>';
                return itemHTML;
            }).join('') + '</ul>';
        }
        
        // If section has subsections (like Data Analysis and Marketing under Professional Development)
        if (section.subsections && section.subsections.length > 0) {
            contentHTML += section.subsections.map(subsection => {
                const subScale = subsection.iconScale !== undefined ? subsection.iconScale : 100;
                const subScaleStyle = subScale !== 100 ? `transform: scale(${subScale / 100}); display: inline-block; transform-origin: center;` : '';
                const subIconHTML = subScaleStyle ? `<span style="${subScaleStyle}">${subsection.icon || ''}</span>` : (subsection.icon || '');
                
                let subHTML = `<h4 style="margin-top: 20px; margin-bottom: 10px;">${subIconHTML} ${subsection.heading || ''}</h4>`;
                
                if (subsection.items && subsection.items.length > 0) {
                    subHTML += '<ul>' + subsection.items.map(item => {
                        let itemHTML = '<li>';
                        
                        if (item.role) {
                            itemHTML += `<strong>${item.role}</strong>`;
                        }
                        
                        if (item.description) {
                            itemHTML += ` - ${item.description}`;
                        }
                        
                        itemHTML += '</li>';
                        return itemHTML;
                    }).join('') + '</ul>';
                }
                
                return subHTML;
            }).join('');
        }
        
        const sectionScale = section.iconScale !== undefined ? section.iconScale : 100;
        const sectionScaleStyle = sectionScale !== 100 ? `transform: scale(${sectionScale / 100}); display: inline-block; transform-origin: center;` : '';
        const sectionIconHTML = sectionScaleStyle ? `<span style="${sectionScaleStyle}">${section.icon || ''}</span>` : (section.icon || '');
        
        return `
            <div class="card timeline-card">
                <div class="timeline-icon">${sectionIconHTML}</div>
                <h3>${section.heading || ''}</h3>
                ${contentHTML}
            </div>
        `;
    }).join('');
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initScrollSpy() {
    const sections = Array.from(document.querySelectorAll('.section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.sidebar-nav .nav-link[href^="#"]'));

    if (!sections.length || !navLinks.length) {
        return;
    }

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href').slice(1) === current);
        });
    });
}

function initScrollAnimations() {
    const elements = document.querySelectorAll('.timeline-card, .skill-card, .education-card, .achievement-card');

    if (!elements.length) {
        return;
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

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
        // Render achievements on the home page
        if (content.pages?.achievements) {
            renderAchievements(content.pages.achievements);
        }
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

    const socialLinksHTML = (profile.socialLinks || []).map(link => {
        const isExternal = !link.href.includes('hideaki-j.github.io');
        const target = isExternal ? ' target="_blank"' : '';
        return `<a href="${link.href}"${target} title="${link.title}"><i class="${link.icon}"></i></a>`;
    }).join('');

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

    const schedule = typeof requestAnimationFrame === 'function'
        ? requestAnimationFrame
        : (cb => setTimeout(cb, 0));

    schedule(() => {
        const activeLink = container.querySelector('.nav-link.active');
        if (!activeLink) {
            return;
        }

        if (typeof activeLink.scrollIntoView === 'function') {
            activeLink.scrollIntoView({
                behavior: 'auto',
                block: 'nearest',
                inline: 'center'
            });
        } else {
            const containerWidth = container.clientWidth;
            if (containerWidth <= 0) {
                return;
            }
            const target =
                activeLink.offsetLeft - (containerWidth - activeLink.offsetWidth) / 2;
            const maxScroll = Math.max(0, container.scrollWidth - containerWidth);
            container.scrollLeft = Math.max(0, Math.min(target, maxScroll));
        }
    });
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
        grid.innerHTML = (achievements.cards || []).map(card => {
            let numberHTML;
            if (card.second_number) {
                numberHTML = `<p class="achievement-number">${card.number || ''} <span class="number-divider">|</span> ${card.second_number}</p>`;
            } else {
                numberHTML = `<p class="achievement-number">${card.number || ''}</p>`;
            }
            
            const content = `
                <div class="achievement-icon">
                    <i class="${card.iconClass || ''}"></i>
                </div>
                <h3>${card.title || ''}</h3>
                ${numberHTML}
                <p class="achievement-desc">${card.descriptionHTML || ''}</p>
            `;
            
            if (card.href) {
                const isExternal = (card.href.startsWith('http://') || card.href.startsWith('https://')) && !card.href.includes('hideaki-j.github.io');
                const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
                return `<a href="${card.href}"${target} class="card achievement-card achievement-card-link">${content}</a>`;
            } else {
                return `<div class="card achievement-card">${content}</div>`;
            }
        }).join('');
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

function renderPublications(pageContent) {
    const titleEl = document.getElementById('publications-title');
    const introEl = document.getElementById('publications-intro');

    if (titleEl && pageContent.titleHTML) {
        titleEl.innerHTML = pageContent.titleHTML;
    }

    if (introEl && pageContent.intro) {
        introEl.innerHTML = pageContent.intro;
    }

    renderScholarProfileSection(pageContent.scholarProfile);
}

function renderScholarProfileSection(scholarData) {
    const root = document.getElementById('scholar-profile-root');
    if (!root) {
        return;
    }

    const profile = scholarData?.profile || window.PROFILE;
    const publications = Array.isArray(scholarData?.publications)
        ? scholarData.publications
        : (Array.isArray(window.PUBLICATIONS) ? window.PUBLICATIONS : []);

    if (!profile) {
        console.warn('Scholar profile data missing: expected local scholar data or window.PROFILE object');
        root.style.display = 'none';
        return;
    }

    renderScholarPublicationsList(publications);
    renderScholarStats(profile);
    renderScholarCoauthors(profile);

    requestAnimationFrame(() => {
        drawScholarCitationGraph(profile);
        attachScholarChartResize(profile);
    });
}

function renderScholarPublicationsList(publications) {
    const container = document.getElementById('scholar-publications-list');
    if (!container) {
        return;
    }

    if (!publications.length) {
        container.classList.add('scholar-publications-empty');
        container.textContent = 'No publications available.';
        return;
    }

    container.classList.remove('scholar-publications-empty');

    const total = publications.length;
    const visibleCap = 5; // show top 5 only

    if (total <= visibleCap) {
        container.innerHTML = publications.map(publication => buildPublicationRow(publication)).join('');
        return;
    }

    const leading = publications.slice(0, visibleCap);
    const hidden = publications.slice(visibleCap);
    const hiddenCount = hidden.length;

    let html = leading.map(publication => buildPublicationRow(publication)).join('');
    html += '<div class="scholar-ellipsis-row" data-ellipsis="true">&hellip;</div>';
    html += hidden.map(publication => buildHiddenPublicationRow(publication)).join('');
    html += `<div class="scholar-toggle-row"><button type="button" class="scholar-toggle-button" data-state="collapsed">Show more ${hiddenCount} ${formatScholarPaperCount(hiddenCount)}</button></div>`;

    container.innerHTML = html;

    const hiddenRows = Array.from(container.querySelectorAll('.scholar-paper-row-hidden'));
    hiddenRows.forEach(row => {
        row.style.display = 'none';
    });

    const ellipsisRow = container.querySelector('.scholar-ellipsis-row');
    const toggleButton = container.querySelector('.scholar-toggle-button');

    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const expanded = toggleButton.dataset.state === 'expanded';

            if (expanded) {
                hiddenRows.forEach(row => {
                    row.style.display = 'none';
                });
                if (ellipsisRow) {
                    ellipsisRow.style.display = '';
                }
                toggleButton.dataset.state = 'collapsed';
                toggleButton.textContent = `Show more ${hiddenCount} ${formatScholarPaperCount(hiddenCount)}`;
            } else {
                hiddenRows.forEach(row => {
                    row.style.display = '';
                });
                if (ellipsisRow) {
                    ellipsisRow.style.display = 'none';
                }
                toggleButton.dataset.state = 'expanded';
                toggleButton.textContent = `Hide ${hiddenCount} ${formatScholarPaperCount(hiddenCount)}`;
            }
        });
    }
}

function buildPublicationRow(publication) {
    const title = publication.url
        ? `<a class="scholar-paper-title" href="${publication.url}" target="_blank" rel="noopener noreferrer">${publication.title}</a>`
        : `<span class="scholar-paper-title">${publication.title}</span>`;

    const authors = `<div class="scholar-paper-authors">${publication.authors || ''}</div>`;
    const venue = `<div class="scholar-paper-venue">${publication.venue || ''}</div>`;
    const badges = buildPublicationBadges(publication);

    const citedBy = publication.cited_by === undefined || publication.cited_by === null
        ? ''
        : publication.citations_url
            ? `<a href="${publication.citations_url}" target="_blank" rel="noopener noreferrer">${publication.cited_by}</a>`
            : `<span>${publication.cited_by}</span>`;

    const year = publication.year ? publication.year : '';

    return `
        <div class="scholar-paper-row">
            <div class="scholar-paper-content">
                ${title}
                ${authors}
                ${venue}
                ${badges}
            </div>
            <div class="scholar-paper-cited">${citedBy}</div>
            <div class="scholar-paper-year">${year}</div>
        </div>
    `;
}

function buildPublicationBadges(publication) {
    const segments = [];

    const authorsText = (publication.authors || '').trim();
    const isFirstAuthor = authorsText.startsWith('H Joko') ||
        authorsText.startsWith('H JOKO') ||
        authorsText.startsWith('城光英彰');

    if (isFirstAuthor) {
        segments.push('<span class="scholar-badge scholar-badge-1st"><strong>✍️ First Author</strong></span>');
    }

    if (publication.ranking) {
        const emoji = publication.ranking === 'A*' ? '🌟' : '⭐';
        segments.push(`<span class="scholar-badge scholar-badge-ranking"><strong>${emoji} ${publication.ranking} Conference</strong></span>`);
    }

    if (publication.type === 'patent') {
        segments.push('<span class="scholar-badge scholar-badge-patent"><strong>💡 Patent</strong></span>');
    }

    if (publication.type === 'journal') {
        segments.push('<span class="scholar-badge scholar-badge-journal"><strong>📖 Journal</strong></span>');
    }

    if (publication.downloads) {
        const text = `⬇️ ${publication.downloads} Downloads`;
        if (publication.downloadsUrl) {
            segments.push(`
                <a class="scholar-badge scholar-badge-download" href="${publication.downloadsUrl}" target="_blank" rel="noopener noreferrer"><strong>${text}</strong></a>
            `);
        } else {
            segments.push(`<span class="scholar-badge scholar-badge-download"><strong>${text}</strong></span>`);
        }
    }

    if (publication.downloads_top_percent) {
        segments.push(`
            <a class="scholar-badge scholar-badge-top-download" href="https://hideaki-j.github.io/conference-statistics/" target="_blank" rel="noopener noreferrer"><strong>🔥 ${publication.downloads_top_percent}</strong></a>
        `);
    }

    if (publication.award) {
        segments.push(`<span class="scholar-badge scholar-badge-award"><strong>${publication.award}</strong></span>`);
    }

    if (!segments.length) {
        return '';
    }

    return `<div class="scholar-badges">${segments.join('')}</div>`;
}

function buildHiddenPublicationRow(publication) {
    const rowHTML = buildPublicationRow(publication);
    return rowHTML.replace('class="scholar-paper-row"', 'class="scholar-paper-row scholar-paper-row-hidden"');
}

function renderScholarStats(profile) {
    const citations = profile.citations || {};
    const all = citations.all || {};

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) {
            el.textContent = value !== undefined && value !== null && value !== '' ? value : '—';
        }
    };

    setText('scholar-citations-all', all.citations);
}

function renderScholarCoauthors(profile) {
    const listEl = document.getElementById('scholar-coauthors-list');
    if (!listEl) {
        return;
    }

    const coauthors = Array.isArray(profile.coauthors) ? profile.coauthors : [];
    if (!coauthors.length) {
        listEl.innerHTML = '<div class="scholar-paper-venue">No co-authors available.</div>';
        return;
    }

    listEl.innerHTML = coauthors.map(coauthor => {
        const image = resolveScholarAsset(coauthor.image);
        const style = image ? ` style="background-image: url('${image}');"` : '';
        return `
            <a class="scholar-coauthor-item" href="${coauthor.scholarUrl || '#'}" target="_blank" rel="noopener noreferrer">
                <div class="scholar-coauthor-avatar"${style}></div>
                <div class="scholar-coauthor-info">
                    <div class="scholar-coauthor-name">${coauthor.name || ''}</div>
                    <div class="scholar-coauthor-affiliation">${coauthor.affiliation || ''}</div>
                </div>
            </a>
        `;
    }).join('');
}

function drawScholarCitationGraph(profile) {
    const canvas = document.getElementById('scholar-citations-chart');
    if (!canvas || !profile?.citations?.byYear) {
        return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        return;
    }

    const dpr = window.devicePixelRatio || 1;
    const { width: cssWidth, height: cssHeight } = canvas.getBoundingClientRect();

    canvas.width = cssWidth * dpr;
    canvas.height = cssHeight * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, cssWidth, cssHeight);

    const years = profile.citations.byYear.years || [];
    const counts = profile.citations.byYear.counts || [];

    if (!years.length || !counts.length) {
        return;
    }

    const padding = { top: 12, right: 32, bottom: 26, left: 12 };
    const innerWidth = cssWidth - padding.left - padding.right;
    const innerHeight = cssHeight - padding.top - padding.bottom;
    const maxCount = Math.max(...counts, 1);
    const barWidth = innerWidth / counts.length;

    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;

    const gridSteps = 3;
    for (let i = 0; i <= gridSteps; i += 1) {
        const y = padding.top + (innerHeight / gridSteps) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(padding.left + innerWidth, y);
        ctx.stroke();
    }

    ctx.fillStyle = '#6c91f1';

    counts.forEach((count, index) => {
        const height = (count / maxCount) * innerHeight;
        const x = padding.left + index * barWidth + barWidth * 0.1;
        const y = padding.top + innerHeight - height;
        const width = barWidth * 0.8;
        ctx.fillRect(x, y, width, height);
    });

    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.font = '11px "Inter", "Helvetica Neue", Arial, sans-serif';
    ctx.textAlign = 'center';

    years.forEach((year, index) => {
        const x = padding.left + index * barWidth + barWidth / 2;
        const y = cssHeight - 6;
        ctx.fillText(year, x, y);
    });

    ctx.textAlign = 'right';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    const tickValues = [0, Math.round(maxCount / 2), maxCount];
    tickValues.forEach(value => {
        const y = padding.top + innerHeight - (value / maxCount) * innerHeight;
        ctx.fillText(String(value), cssWidth - 6, y + 4);
    });
}

function attachScholarChartResize(profile) {
    if (window.__scholarChartResizeBound) {
        window.__scholarChartProfile = profile;
        return;
    }

    window.__scholarChartResizeBound = true;
    window.__scholarChartProfile = profile;

    window.addEventListener('resize', () => {
        if (window.__scholarChartProfile) {
            drawScholarCitationGraph(window.__scholarChartProfile);
        }
    });
}

// Normalize asset paths so the scholar profile works within the main site structure.
function resolveScholarAsset(path) {
    if (!path) {
        return '';
    }

    if (/^(https?:|data:|\/)/i.test(path)) {
        return path;
    }

    return `scholar-profile/${path}`;
}

function formatScholarPaperCount(count) {
    return count === 1 ? 'article' : 'articles';
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

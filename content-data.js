window.siteContent = {
    profile: {
        name: 'Hideaki Joko',
        tagline: 'IR and NLP researcher',
        image: {
            src: 'images/profile.jpg',
            alt: 'Hideaki Joko',
            placeholderIcon: 'fas fa-user'
        },
        socialLinks: [
            { href: 'https://github.com/hideaki-j', icon: 'fab fa-github', title: 'GitHub' },
            { href: 'https://www.linkedin.com/in/hide7531b1143/', icon: 'fab fa-linkedin', title: 'LinkedIn' },
            { href: 'https://x.com/hideaki_joko', icon: 'fab fa-twitter', title: 'X (Twitter)' }
        ]
    },
    navigation: [
        { href: 'index.html', icon: 'fas fa-home', label: 'Home', page: 'index' },
        { href: 'experience.html', icon: 'fas fa-briefcase', label: 'Experience', page: 'experience' },
        { href: 'education.html', icon: 'fas fa-graduation-cap', label: 'Education', page: 'education' },
        { href: 'publications.html', icon: 'fas fa-file-alt', label: 'Publications', page: 'publications' },
        { href: 'talks.html', icon: 'fas fa-microphone', label: 'Talks', page: 'talks' },
        { href: 'volunteer.html', icon: 'fas fa-hands-helping', label: 'Volunteering', page: 'volunteer' },
        { href: 'awards.html', icon: 'fas fa-trophy', label: 'Awards', page: 'awards' },
        { href: 'others.html', icon: 'fas fa-ellipsis-h', label: 'Others', page: 'others' }
    ],
    footerHTML: '',
    pages: {
        index: {
            biography: {
                titleHTML: '<i class="fas fa-user"></i> Biography',
                paragraphsHTML: [
                    '<p>Hideaki Joko is a researcher and engineer specializing in information retrieval (IR) and NLP, <span class="highlight-yellow">passionate about translating academic research into real-world impact</span>, with a strong background in both academia and industry with 10 years of experience combined.</p>',
                    '<p><b>Research</b>: He has published 10+ first-author papers including top venues such as SIGIR and CIKM, and received 7 awards and 3 patents on IR/NLP research and development. He has delivered 10+ talks at internationally renowned institutes, and his first-authored works have been used by <span class="highlight-yellow">300+ researchers across 120+ institutions worldwide</span>, including notable organizations such as Google DeepMind and Stanford.</p>',
                    '<p><b>Experience</b>: He is currently an <span class="highlight-yellow">Applied Scientist at Thomson Reuters Labs</span>, where he applies research in IR/NLP/LLM to develop legal research products which support about half of all lawyers in North America. Before, he was a Visiting Scholar at University of Waterloo, PhD candidate at Radboud University, and a Research Engineer at Mitsubishi Electric.</p>',
                ]
            }
        },
        experience: {
            timeline: {
                titleHTML: '<i class="fas fa-briefcase"></i> Experience',
                items: [
                    {
                        iconKey: 'thomsonReuters',
                        heading: 'Thomson Reuters, Canada',
                        role: 'Applied Scientist',
                        date: 'Oct 2025 - Present (Permanent)',
                        bodyHTML: '<p>Research and development at Thomson Reuters Labs, focusing on legal NLP and IR.</p>'
                    },
                    {
                        iconKey: 'waterloo',
                        heading: 'University of Waterloo, Canada',
                        role: 'Visiting Scholar',
                        date: 'May 2025 - Oct 2025',
                        bodyHTML: '<p>Evaluation of LLMs in real-world conversations, working with Charles Clarke.</p>'
                    },
                    {
                        iconKey: 'radboud',
                        heading: 'Radboud University, Netherlands',
                        role: 'PhD Researcher',
                        date: 'Sep 2020 - Sep 2025',
                        bodyHTML: '<ul><li>Developed a conversational entity linking dataset/method, published at SIGIR \'21 and CIKM \'22, achieving 1000+ downloads and used by 40+ research groups worldwide.</li><li>Collaborated with the IAI group (University of Stavanger, Norway) to develop an evaluation platform and dataset for conversational systems, resulting in a publication at WSDM \'25.</li><li>Research topics include: large language models, automatic prompt optimization, entity linking, conversational systems, large-scale conversation dataset creation, automatic evaluation.</li></ul>'
                    },
                    {
                        iconKey: 'glasgow',
                        heading: 'Radboud-Glasgow Collaboration Project, UK',
                        role: 'Radboud-Glasgow Collaboration Project - Researcher',
                        date: 'Oct 2022 - Jan 2024 (Remote)',
                        bodyHTML: '<ul><li>Led the collaboration project on LLM-augmented conversational search with GRILL Lab (University of Glasgow/Edinburgh), led by Jeff Dalton, a leader in conversational search.</li><li>Had a full-time responsibility for proposing/developing/implementing the method, gathering a large-scale dataset, and successfully publishing at the top-tier SIGIR 2024 conference as the first author.</li><li>The paper achieved top 6% downloads among all SIGIR 2024 accepted papers (October 2025), highlighting the strong impact of the collaboration\'s outcome.</li></ul>'
                    },
                    {
                        iconKey: 'signalAI',
                        heading: 'Signal AI, UK',
                        role: 'Visiting Researcher',
                        date: 'Jun 2022 - Oct 2022',
                        bodyHTML: '<ul><li>Signal AI is a London-based, fastest-growing startup specializing in risk intelligence through advanced NLP and IR technology, serving 700+ clients, such as Deloitte and Google.</li><li>Developed a Transformer-based sentiment analysis method involving model development, data collection, and evaluation, which enabled successful deployment in their product.</li></ul>'
                    },
                    {
                        iconKey: 'mitsubishi',
                        heading: 'Mitsubishi Electric, Japan',
                        role: 'Research Engineer',
                        date: 'Apr 2016 - Aug 2020 (Permanent)',
                        bodyHTML: '<ul><li>Researched and developed multiple IR/NLP systems (search, FAQ, error detection) to optimize business and factory processes, resulting in 9 publications, 3 patents, and 4 project awards.</li><li>Led cross-company multi-year collaboration and developed text-based system error diagnosis algorithm and software, reducing operational costs by ~30%.</li><li>Led a cross-functional R&D project and developed search software to optimize the design process in the factory, resulting in the R&D Center President\'s Award.</li></ul>'
                    }
                ]
            }
        },
        education: {
            timeline: {
                titleHTML: '<i class="fas fa-graduation-cap"></i> Education',
                items: [
                    {
                        iconKey: 'radboud',
                        heading: 'Radboud University, Netherlands',
                        role: 'PhD, Data Science',
                        date: 'Sep 2020 - Sep 2025',
                        bodyHTML: '<p>Working on NLP, LLMs, and IR, supervised by Faegheh Hasibi and Arjen de Vries.</p>'
                    },
                    {
                        iconKey: 'utokyo',
                        heading: 'University of Tokyo, Japan',
                        role: 'MSc, Natural Language Processing',
                        date: 'Mar 2016',
                        bodyHTML: '<ul><li>Earned a research master\'s from the Computing Systems Group, Multidisciplinary Science Department, through research in NLP.</li><li>Thesis on synonym detection using skip-gram models, later published in the Journal of Natural Language Processing.</li></ul>'
                    },
                    {
                        iconKey: 'waseda',
                        heading: 'Waseda University, Japan',
                        role: 'BEng, Applied Mathematics',
                        date: 'Mar 2014',
                        bodyHTML: ''
                    }
                ]
            }
        },
        achievements: {
            titleHTML: '<i class="fas fa-star"></i> Achievements',
            cards: [
                {
                    iconClass: 'fas fa-briefcase',
                    title: 'Experience',
                    number: '10+',
                    descriptionHTML: '10+ years of strong NLP and IR hands-on experience in academia and industry combined.',
                    href: 'experience.html'
                },
                {
                    iconClass: 'fas fa-file-alt',
                    title: 'Publications',
                    number: '10+',
                    second_number: '120+',
                    descriptionHTML: 'Published 10+ first-author papers including A+ venues like SIGIR/CIKM, with his work used by researchers from 120+ institutions worldwide.',
                    href: 'publications.html'
                },
                {
                    iconClass: 'fas fa-lightbulb',
                    title: 'Patents',
                    number: '3',
                    descriptionHTML: 'Awarded patents about IR and NLP methods\' application in industry.',
                    href: 'publications.html'
                },
                {
                    iconClass: 'fas fa-trophy',
                    title: 'Awards',
                    number: '7',
                    descriptionHTML: 'Earned awards including 4 project awards and 3 academic awards and fundings.',
                    href: 'awards.html'
                },
                {
                    iconClass: 'fas fa-hands-helping',
                    title: 'Volunteers',
                    number: '7+',
                    descriptionHTML: 'Service roles including Session Chair at SIGIR \'25, Program Committee for WWW \'25 and SIGIR \'25.',
                    href: 'volunteer.html'
                },
                {
                    iconClass: 'fas fa-microphone',
                    title: 'Talks',
                    number: '10+',
                    descriptionHTML: 'Delivered talks at internationally renowned institutes, including SIGIR Tokyo (2024), University of Toronto (2025), and University of British Columbia (2025).',
                    href: 'talks.html'
                }
            ],
            cta: {
                href: 'https://hideaki-j.github.io/scholar-profile/',
                iconClass: 'fas fa-external-link-alt',
                label: 'View Full List of Achievements'
            }
        },
        others: {
            titleHTML: '<i class="fas fa-ellipsis-h"></i> Others',
            sections: [
                {
                    icon: '🧑‍🏫',
                    iconScale: 100,
                    heading: 'Teaching',
                    items: [
                        {
                            role: 'Information Retrieval MSc Thesis Project at Radboud University',
                            date: '2022',
                            description: 'Daily Supervisor'
                        },
                        {
                            role: 'Information Retrieval Course at Radboud University',
                            date: '2021',
                            description: 'Teaching Assistant'
                        }
                    ]
                },
                {
                    icon: '📚',
                    iconScale: 100,
                    heading: 'Professional Development',
                    bodyHTML: '<p>Other than research, his interest is in solving business challenges using his expertise in NLP and IR. He has 200+ hours of data analysis, marketing, and project management education from several institutes including Wharton Online and Mitsubishi Electric.</p>',
                    subsections: [
                        {
                            icon: '📊',
                            iconScale: 100,
                            heading: 'Data Analysis Course Certificates',
                            items: [
                                {
                                    role: 'A Crash Course in Causality: Inferring Causal Effects from Observational Data',
                                    description: 'University of Pennsylvania on Coursera'
                                },
                                {
                                    role: 'Bayesian Statistics: From Concept to Data Analysis',
                                    description: 'University of California on Coursera'
                                }
                            ]
                        },
                        {
                            icon: '👔',
                            iconScale: 100,
                            heading: 'Marketing Course Certificates',
                            items: [
                                {
                                    role: 'Entrepreneurship 1: Developing the Opportunity',
                                    description: 'Wharton Online'
                                },
                                {
                                    role: 'Financial Markets',
                                    description: 'Yale University on Coursera'
                                },
                                {
                                    role: 'Introduction to Marketing',
                                    description: 'Wharton Online'
                                }
                            ]
                        }
                    ]
                },
                {
                    icon: '💯',
                    iconScale: 100,
                    heading: 'Test Score',
                    items: [
                        {
                            role: 'Japanese Higher Civil Service Examination - Engineering Category',
                            bodyHTML: '<p>Successfully passed the highly selective Japanese governmental examination and interview for high-level administrative positions, with a pass rate of about 6% in total, demonstrating advanced knowledge of mathematics and engineering. Although honored by the opportunity, he ultimately chose to pursue his career as an industry researcher.</p>'
                        }
                    ]
                }
            ]
        },
        talks: {
            titleHTML: '<i class="fas fa-microphone"></i> Talks/Presentations',
            timeline: {
                items: [
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>SIGIR Workshop</strong> on LLM4Eval - Automatic Evaluation of Conversational Systems, 2025.'
                    },
                    {
                        iconKey: 'uoft',
                        bodyHTML: '<strong>University of Toronto</strong>, Prof. Bagheri\'s Lab - Automatic Evaluation of Conversational Systems, 2025.'
                    },
                    {
                        iconKey: 'ubc',
                        bodyHTML: '<strong>University of British Columbia</strong>, NLP Lab - Automatic Evaluation of Conversational Systems, 2025.'
                    },
                    {
                        iconKey: 'radboud',
                        bodyHTML: '<strong>Radboud University</strong>, Guest Lecture - Dataset Construction and Evaluation of Conversational Information Seeking Systems, 2025.'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>SIGIR Tokyo</strong> - LLM-Augmented Dialogue Construction, 2024. (Invited)'
                    },
                    {
                        iconKey: 'dir',
                        bodyHTML: '<strong>DIR</strong> (Dutch-Belgian Information Retrieval Workshop) - Conversational Entity Linking: Problem Definition and Datasets, 2023.'
                    },
                    {
                        iconKey: 'gt',
                        bodyHTML: '<strong>Georgia Tech</strong> ACM Student Chapter, Distinguished Speaker Series - Entity Linking for Personalization, 2023. (Invited)'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>CIKM Workshop</strong> on Mixed-Initiative Conversational Systems (MICROS) - Entity Linking for Personalization, 2022. (Invited)'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>SIGIR Workshop</strong> on Search-Oriented Conversational AI (SCAI) - Entity Linking in Conversations, 2022.'
                    },
                    {
                        iconKey: 'dir',
                        bodyHTML: '<strong>DIR</strong> (Dutch-Belgian Information Retrieval Workshop) - Entity Linking in Conversations, 2022.'
                    }
                ]
            }
        },
        volunteer: {
            titleHTML: '<i class="fas fa-hands-helping"></i> Volunteering',
            timeline: {
                items: [
                    {
                        bodyHTML: '<strong>ACM SIGIR Conference</strong> Session Chair (Industry Track), 2025.'
                    },
                    {
                        bodyHTML: '<strong>ACM SIGIR Conference</strong> Program Committee, 2025.'
                    },
                    {
                        bodyHTML: '<strong>ACM The Web Conference</strong> Program Committee, 2024.'
                    },
                    {
                        bodyHTML: '<strong>ACM CIKM</strong> Reviewer, 2024.'
                    },
                    {
                        bodyHTML: '<strong>ACM SIGIR</strong> Reviewer, 2024.'
                    },
                    {
                        bodyHTML: '<strong>ACM Conversational User Interface (CUI) Conference</strong> Volunteer, 2023.'
                    },
                    {
                        bodyHTML: '<strong>ACM SIGIR Conference</strong> Volunteer, 2022.'
                    }
                ]
            }
        },
        volunteer: {
            titleHTML: '<i class="fas fa-hands-helping"></i> Volunteering',
            timeline: {
                items: [
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>ACM SIGIR Conference</strong> Session Chair (Industry Track), 2025.'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>ACM SIGIR Conference</strong> Program Committee, 2025.'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>ACM The Web Conference</strong> Program Committee, 2024.'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>ACM CIKM</strong> Reviewer, 2024.'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>ACM SIGIR</strong> Reviewer, 2024.'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>ACM Conversational User Interface (CUI) Conference</strong> Volunteer, 2023.'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>ACM SIGIR Conference</strong> Volunteer, 2022.'
                    }
                ]
            }
        },
        awards: {
            titleHTML: '<i class="fas fa-trophy"></i> Awards',
            intro: '<p>Received seven awards and grants including:</p>',
            timeline: {
                items: [
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>CIKM National Science Foundation Travel Grant</strong> covering the cost of attending CIKM up to $1000, 2022.'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>SIGIR Student Travel Grant</strong> covering the SIGIR 2021 conference registration fee, 2021.'
                    },
                    {
                        iconKey: 'jsai',
                        bodyHTML: '<strong>Incentive Research Award</strong> from the JSAI Workshop on Interactive Information Access and Visual Mining for his research on intention understanding utilizing multi-task transfer learning, 2019.'
                    },
                    {
                        iconKey: 'mitsubishi',
                        bodyHTML: '<strong>Mitsubishi Electric R&D Center President Award</strong> for making a mechanical device design process efficient by developing an IR algorithm and software, 2019.'
                    }
                ]
            }
        },
        publications: {
            titleHTML: '<i class="fas fa-file-alt"></i> Publications',
            intro: ''
        }
    }
};

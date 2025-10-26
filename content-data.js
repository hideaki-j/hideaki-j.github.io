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
            { href: 'https://x.com/hideaki_joko', icon: 'fab fa-twitter', title: 'X (Twitter)' },
            { href: 'publications.html', icon: 'fas fa-graduation-cap', title: 'Publications' }
        ]
    },
    navigation: [
        { href: 'index.html', icon: 'fas fa-home', label: 'Home', page: 'index' },
        { href: 'experience.html', icon: 'fas fa-briefcase', label: 'Experience', page: 'experience' },
        { href: 'education.html', icon: 'fas fa-school', label: 'Education', page: 'education' },
        { href: 'publications.html', icon: 'fas fa-graduation-cap', label: 'Publications', page: 'publications' },
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
                        date: 'Oct 2025 - Present',
                        dateNote: 'Permanent',
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
                        role: 'Project Researcher',
                        date: 'Oct 2022 - Jan 2024',
                        dateNote: 'Remote',
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
                        date: 'Apr 2016 - Aug 2020',
                        dateNote: 'Permanent',
                        bodyHTML: '<ul><li>Researched and developed multiple IR/NLP systems (search, FAQ, error detection) to optimize business and factory processes, resulting in 9 publications, 3 patents, and 4 project awards.</li><li>Led cross-company multi-year collaboration and developed text-based system error diagnosis algorithm and software, reducing operational costs by ~30%.</li><li>Led a cross-functional R&D project and developed search software to optimize the design process in the factory, resulting in the R&D Center President\'s Award.</li></ul>'
                    }
                ]
            }
        },
        education: {
            timeline: {
                titleHTML: '<i class="fas fa-school"></i> Education',
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
                    number: '8',
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
                    bodyHTML: '<p>His passion has been in <span class="highlight-yellow">solving business challenges using his expertise in NLP and IR</span>. He has 200+ hours of data analysis, marketing, and project management education from several institutes including Wharton Online and Mitsubishi Electric.</p>',
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
                            bodyHTML: '<p>Successfully passed the highly selective Japanese governmental examination and interview for <span class="highlight-yellow">high-level administrative positions, with a pass rate of ~6% in total</span>, demonstrating advanced knowledge of mathematics and engineering. Although honored by the opportunity, he ultimately chose to pursue his career as an industry researcher.</p>'
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
                        iconKey: 'uoft',
                        bodyHTML: '<strong>University of Toronto</strong>, Prof. Bagheri\'s Lab - Automatic Evaluation of Conversational Systems, 2025.'
                    },
                    {
                        iconKey: 'ubc',
                        bodyHTML: '<strong>University of British Columbia</strong>, NLP Lab - Automatic Evaluation of Conversational Systems, 2025.'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>SIGIR Workshop</strong> on LLM4Eval - Automatic Evaluation of Conversational Systems, 2025.'
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
                        iconKey: 'acm',
                        bodyHTML: '<strong>ACM WSDM Conference</strong> Program Committee, 2025.'
                    },
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
                        bodyHTML: '<strong>ACM CIKM Conference</strong> Reviewer, 2024.'
                    },
                    {
                        iconKey: 'acm',
                        bodyHTML: '<strong>ACM SIGIR Conference</strong> Reviewer, 2024.'
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
                        iconKey: 'nfs',
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
            titleHTML: '<i class="fas fa-graduation-cap"></i> Scholar Profile',
            intro: '',
            scholarProfile: {
                profile: {
                    name: "Hideaki Joko",
                    affiliation: "Applied Scientist at Thomson Reuters Labs",
                    email: "ru.nl",
                    homepage: "https://hideaki-j.github.io/",
                    profileImage: "univ_figs/thumbnail.jpg",
                    researchAreas: [
                        {
                            name: "Information Retrieval",
                            link: "https://scholar.google.com/citations?view_op=search_authors&hl=en&authuser=1&mauthors=label:information_retrieval"
                        },
                        {
                            name: "Natural Language Processing",
                            link: "https://scholar.google.com/citations?view_op=search_authors&hl=en&authuser=1&mauthors=label:natural_language_processing"
                        }
                    ],
                    socialLinks: {
                        linkedin: "https://www.linkedin.com/in/hide7531b1143/",
                        github: "https://github.com/hideaki-j",
                        twitter: "https://x.com/hideaki_joko"
                    },
                    citations: {
                        firstAuthor: {
                            citations: 97
                        },
                        all: {
                            citations: 101,
                            hIndex: 4,
                            i10Index: 3
                        },
                        since2020: {
                            citations: 99,
                            hIndex: 4,
                            i10Index: 3
                        },
                        byYear: {
                            years: ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"],
                            counts: [2, 0, 1, 1, 13, 19, 22, 38],
                            firstAuthor: [2, 0, 1, 1, 13, 19, 22, 38],
                            all: [2, 0, 1, 1, 13, 19, 22, 42]
                        }
                    },
                    coauthors: [
                        {
                            name: "Faegheh Hasibi",
                            affiliation: "🇳🇱 Radboud University",
                            scholarUrl: "https://scholar.google.com/citations?hl=en&user=RqrnTNAAAAAJ",
                            image: "univ_figs/radboud.jpg"
                        },
                        {
                            name: "Arjen P. de Vries",
                            affiliation: "🇳🇱 Radboud University",
                            scholarUrl: "https://scholar.google.com/citations?hl=en&user=iH9TVHQAAAAJ",
                            image: "univ_figs/radboud.jpg"
                        },
                        {
                            name: "Krisztian Balog",
                            affiliation: "🇳🇴 UiS & DeepMind",
                            scholarUrl: "https://scholar.google.com/citations?hl=en&user=1z918TYAAAAJ",
                            image: "univ_figs/stavanger.png"
                        },
                        {
                            name: "Andrew Ramsay",
                            affiliation: "🇬🇧 University of Glasgow",
                            scholarUrl: "https://scholar.google.com/citations?hl=en&user=DVLiNn8AAAAJ",
                            image: "univ_figs/glasgow.png"
                        },
                        {
                            name: "Shubham Chatterjee",
                            affiliation: "🇺🇸 Missouri S&T",
                            scholarUrl: "https://scholar.google.com/citations?hl=en&user=DdgpMIQAAAAJ",
                            image: "univ_figs/missouri.png"
                        },
                        {
                            name: "Jeff Dalton",
                            affiliation: "🇬🇧 University of Edinburgh",
                            scholarUrl: "https://scholar.google.com/citations?hl=en&user=mgwLi-EAAAAJ",
                            image: "univ_figs/edinburgh.png"
                        },
                        {
                            name: "Nolwenn Bernard",
                            affiliation: "🇩🇪 TH Köln",
                            scholarUrl: "https://scholar.google.com/citations?hl=en&user=zgvRPFoAAAAJ",
                            image: "univ_figs/th_koln.png"
                        },
                        {
                            name: "Emma J. Gerritse",
                            affiliation: "🇳🇱 Radboud University",
                            scholarUrl: "https://scholar.google.com/citations?hl=en&user=WvFwI6MAAAAJ",
                            image: "univ_figs/radboud.jpg"
                        },
                        {
                            name: "Shakiba Amirshahi",
                            affiliation: "🇨🇦 University of Waterloo",
                            scholarUrl: "https://scholar.google.com/citations?hl=en&user=0ks-DQQAAAAJ",
                            image: "univ_figs/waterloo.png"
                        },
                        {
                            name: "Charles L. A. Clarke",
                            affiliation: "🇨🇦 University of Waterloo",
                            scholarUrl: "https://scholar.google.com/citations?hl=en&user=TkVleDIAAAAJ",
                            image: "univ_figs/waterloo.png"
                        }
                    ]
                },
                publications: [
                    {
                        title: "Doing personal laps: Llm-augmented dialogue construction for personalized multi-session conversational search",
                        authors: "H Joko, S Chatterjee, A Ramsay, AP De Vries, J Dalton, F Hasibi",
                        venue: "SIGIR '24",
                        cited_by: 41,
                        year: 2024,
                        ranking: "A*",
                        url: "https://arxiv.org/abs/2405.03480",
                        citations_url: "https://scholar.google.com/scholar?cites=2349539739266859572&as_sdt=2005&sciodt=0,5&hl=en",
                        downloads_top_percent: "Top 6% Downloads in SIGIR 2024",
                        downloadsUrl: "https://dl.acm.org/doi/10.1145/3626772.3657815"
                    },
                    {
                        title: "Conversational entity linking: problem definition and datasets",
                        authors: "H Joko, F Hasibi, K Balog, AP de Vries",
                        venue: "SIGIR '21",
                        cited_by: 31,
                        year: 2021,
                        ranking: "A*",
                        url: "https://arxiv.org/abs/2105.04903",
                        citations_url: "https://scholar.google.com/scholar?oi=bibs&hl=en&authuser=1&cites=6019146726436238425",
                        downloadsUrl: "https://dl.acm.org/doi/abs/10.1145/3404835.3463258"
                    },
                    {
                        title: "Personal entity, concept, and named entity linking in conversations",
                        authors: "H Joko, F Hasibi",
                        venue: "CIKM '22",
                        cited_by: 14,
                        year: 2022,
                        ranking: "A",
                        url: "https://arxiv.org/abs/2206.07836",
                        citations_url: "https://scholar.google.com/scholar?oi=bibs&hl=en&authuser=1&cites=7872023178425784537"
                    },
                    {
                        title: "CRS Arena: Crowdsourced Benchmarking of Conversational Recommender Systems",
                        authors: "N Bernard, H Joko, F Hasibi, K Balog",
                        venue: "WSDM '25",
                        cited_by: 4,
                        year: 2025,
                        ranking: "A",
                        url: "https://dl.acm.org/doi/abs/10.1145/3701551.3704120",
                        citations_url: "https://scholar.google.com/scholar?oi=bibs&hl=en&authuser=1&cites=7343923940986836477"
                    },
                    {
                        title: "Language Processing Device, Language Processing System and Language Processing Method",
                        authors: "H Joko",
                        venue: "US Patent",
                        cited_by: 3,
                        year: 2019,
                        type: "patent",
                        url: "https://patents.google.com/patent/US20210192139A1/en",
                        citations_url: "https://scholar.google.com/scholar?oi=bibs&hl=en&authuser=1&cites=3295116525722928383",
                    },
                    {
                        title: "Learning Word Embeddings Using Spatial Information",
                        authors: "H Joko, R Oka, H Uchide, H Itsui, T Otsuka",
                        venue: "IEEE SMC '19",
                        cited_by: 2,
                        year: 2019
                    },
                    {
                        title: "FACE: A Fine-grained Reference Free Evaluator for Conversational Recommender Systems",
                        authors: "H Joko, F Hasibi",
                        venue: "arXiv preprint",
                        cited_by: 1,
                        year: 2025
                    },
                    {
                        title: "Radboud University at TREC CAsT 2021",
                        authors: "H Joko, EJ Gerritse, F Hasibi, AP de Vries",
                        venue: "NIST Special Publication",
                        cited_by: 1,
                        year: 2022
                    },
                    {
                        title: "Intention Understanding in Small Training Data Sets by Using Transfer Learning",
                        authors: "H Joko, Y Koji, H Ucihde, T Otsuka",
                        venue: "2018 Eleventh International Conference on Mobile Computing and Ubiquitous …",
                        cited_by: 1,
                        year: 2018
                    },
                    {
                        title: "転移学習による小規模教師データを用いた意図理解",
                        authors: "H Joko, H Uchide, Y Koji, T Otsuka",
                        venue: "IEICE Conferences Archives",
                        cited_by: 1,
                        year: 2018
                    },
                    {
                        title: "文脈限定 Skip-gram による同義語獲得",
                        authors: "H Joko, Y Matsuda, K Yamaguchi",
                        venue: "Journal of Natural Language Processing",
                        cited_by: 1,
                        year: 2017,
                        type: "journal"
                    },
                    {
                        title: "同義語判定問題を用いた語義ベクトルの評価の検討—Skip-gram モデルで獲得した語義ベクトルを例として—",
                        authors: "H Joko, Y Matsuda, K Yamaguchi",
                        venue: "The Japanese Society for Artificial Intelligence SIG-AM Workshop",
                        cited_by: 1,
                        year: 2015
                    },
                    {
                        title: "WildClaims: Information Access Conversations in the Wild (Chat)",
                        authors: "H Joko, S Amirshahi, CLA Clarke, F Hasibi",
                        venue: "arXiv preprint",
                        cited_by: 0,
                        year: 2025
                    },
                    {
                        title: "Information processing device and information processing method for judging the semantic relationship between words and sentences",
                        authors: "H Joko, T Otsuka",
                        venue: "US Patent",
                        cited_by: 0,
                        year: 2023,
                        type: "patent"
                    },
                    {
                        title: "Information processing device, program, and information processing method",
                        authors: "H Joko",
                        venue: "WO Patent",
                        cited_by: 0,
                        year: 2021,
                        type: "patent"
                    },
                    {
                        title: "分散表現に基づく意味関係認識における負例作成方式の比較",
                        authors: "H Uchide, H Joko, R Oka, H Itsui, S Taguchi",
                        venue: "IEICE Conferences Archives",
                        cited_by: 0,
                        year: 2020
                    },
                    {
                        title: "Accelerating Contextualized Representation based Document Retrieval Using Approximate Nearest Neighbor Search",
                        authors: "H Joko, R Oka, H Uchide, H Itsui, S Taguchi",
                        venue: "IEICE Transactions on Information and Systems",
                        cited_by: 0,
                        year: 2020,
                        type: "journal"
                    },
                    {
                        title: "空間座標情報を用いた単語の分散表現獲得",
                        authors: "H Joko, R Oka, H Uchide, H Itsui, T Otsuka",
                        venue: "The Japanese Society for Artificial Intelligence SIG-AM Workshop",
                        cited_by: 0,
                        year: 2019
                    },
                    {
                        title: "文字情報を考慮した分散表現による単語間の意味関係分類",
                        authors: "H Uchide, H Joko, T Otsuka",
                        venue: "IEICE Conferences Archives",
                        cited_by: 0,
                        year: 2018
                    },
                    {
                        title: "マルチタスク転移学習による 小規模教師データを用いた意図理解",
                        authors: "H Joko, H Uchide, Y Koji, T Otsuka",
                        venue: "🏆 The Japanese Society for Artificial Intelligence SIG-AM Workshop",
                        cited_by: 0,
                        year: 2018,
                        award: "🏆 Research Incentive Award (top 10%)"
                    },
                ]
            }
        }
    }
};

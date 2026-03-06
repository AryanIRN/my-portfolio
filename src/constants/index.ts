export const NAV_LINKS = [
  { name: "Over mij", href: "#about" },
  { name: "Opleiding", href: "#education" },
  { name: "Certificaten", href: "#credentials" },
  { name: "Projecten", href: "#work" },
  { name: "Contact", href: "#contact" },
];

export const PROJECTS = [
  {
    title: "SQL Encryptie Architectuur",
    description: "Onderzoek en ontwerp van databaseniveau-encryptie (TDE, Column-Level Encryption, Always Encrypted) en de integratie met Extensible Key Management (EKM).",
    tech: ["MS SQL Server", "Cryptography", "EKM"],
    link: "#",
    image: "https://www.techzine.nl/wp-content/uploads/2022/09/1768.sql_logo.jpg",
  },
  {
    title: "De Ransomware-Detectie Paradox",
    description: "Analyse van de technologische clash ('The Blind Spot') tussen data-entropie veroorzaakt door encryptie en Machine Learning anomalie-detectie in back-ups.",
    tech: ["Enterprise Backup", "Shannon Entropy", "Machine Learning"],
    link: "#",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2670&auto=format&fit=crop",
  },
  {
    title: "Enterprise Log Routing & SIEM",
    description: "Ontwikkeling van een observability pipeline. MS SQL Server audit-logs worden via een log router gefilterd: kritieke events gaan naar een centraal SIEM, terwijl ruwe data kostenefficiënt in S3 Storage wordt gearchiveerd.",
    tech: ["Log Routing", "SIEM", "S3 Storage", "Data Pipeline"],
    link: "#",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop", // Data dashboard / pipeline image
  },
  {
    title: "Confidential Computing & Enclaves",
    description: "Lab-onderzoek naar het gebruik van Virtualization-based Security (VBS) en Secure Enclaves om 'Data in Use' te beschermen tegen system administrators.",
    tech: ["Zero Trust", "Secure Enclaves", "VBS"],
    link: "#",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop",
  },
];

export const CERTIFICATIONS = [
  {
    name: "DP-300: Azure Database Administrator",
    phase: "Fase 1: De Landing",
    date: "2026",
    status: "GEPLAND",
  },
  {
    name: "AZ-500: Azure Security Engineer",
    phase: "Fase 1: De Landing",
    date: "2026",
    status: "GEPLAND",
  },
  {
    name: "CompTIA Security+ (SY0-701)",
    phase: "Fase 1: De Landing",
    date: "Begin 2027",
    status: "GEPLAND",
  },
  {
    name: "CompTIA CySA+ (Cybersecurity Analyst)",
    phase: "Fase 2: De Specialist",
    date: "Eind 2027 / 2028",
    status: "GEPLAND",
  },
  {
    name: "CISSP (Associate status)",
    phase: "Fase 3: De 'Money Maker'",
    date: "2029",
    status: "GEPLAND",
  },
  {
    name: "SABSA & Azure/AWS Security Architect",
    phase: "Fase 4: De Architect Transitie",
    date: "2030 – 2031",
    status: "GEPLAND",
  },
  {
    name: "Senior Security Architect",
    phase: "Fase 5: The End Game",
    date: "2032+",
    status: "DOEL",
  }
];

export const EDUCATION = [
  {
    institution: "Hogeschool van Arnhem en Nijmegen (HAN)",
    degree: "HBO-ICT",
    specialization: "Infrastructure & Security Management",
    period: "Bezig met afstuderen",
    description: "Brede ICT-opleiding met focus op het ontwerpen, beveiligen en beheren van complexe infrastructuren. De rode draad was de overlap tussen techniek (TDS) en business/security (DMSS).",
    courses: [
      {
        name: "Cloud, DevOps & Security",
        details: "Opzetten van veilige Cloud (IaaS/PaaS/SaaS) omgevingen, geautomatiseerd met Python (DevOps). Praktijkervaring met Docker en Kubernetes op Linux-omgevingen."
      },
      {
        name: "Enterprise Infrastructuur & Netwerken",
        details: "Ontwerpen en beveiligen van robuuste en redundante netwerken, waarbij falen van een enkele component niet leidt tot uitval (High Availability)."
      },
      {
        name: "Technical Research & Auditing",
        details: "Uitvoeren van penetratietesten en security audits op netwerken en systemen. Leren kwetsbaarheden te prioriteren (Risk Management) en adviseren aan management via formele rapportages."
      },
      {
        name: "Security by Design & SecDevOps",
        details: "Samenwerking tussen Ontwikkel, Beheer en Security afdelingen. Bepalen van IT-strategie, uitschrijven van baselines en risicobeheer op basis van bedrijfsprocessen."
      }
    ],
    tech: ["Docker", "Kubernetes", "Python", "PowerShell", "Linux", "HTML/CSS", "Java", "PHP"]
  }
];

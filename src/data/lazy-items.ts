export interface LazyItem {
  id: number
  name: string
  slug: string
  category: 'clothing' | 'entry' | 'living' | 'kitchen' | 'bathroom'
  priceRange: { min: number; max: number }
  priceTier: 'budget' | 'moderate' | 'premium'
  tagline: string
  description: string
  whyItWorks: string
  effortScore: number // 1-5, lower = easier
  essential: boolean
  alternatives?: string[]
  icon: string
}

export const lazyItems: LazyItem[] = [
  // === ESSENTIAL ===
  {
    id: 1,
    name: "Patère de porte",
    slug: "porte-over-door-hooks",
    category: "clothing",
    priceRange: { min: 10, max: 20 },
    priceTier: "budget",
    tagline: "Stockage instantané, zéro perçage",
    description: "Se fixe sur n'importe quelle porte. Peignoir, jeans, sacs - tout ce qui traîne au sol trouve sa place en une seconde.",
    whyItWorks: "Élimine la friction « ouvrir placard → trouver cintre → accrocher ». Un geste, c'est fini.",
    effortScore: 1,
    essential: true,
    alternatives: ["Crochets 3M Command", "Tige de tension dans l'encadrement de porte"],
    icon: "hanger"
  },
  {
    id: 2,
    name: "Bacs de rangement ouverts",
    slug: "open-fabric-bins",
    category: "clothing",
    priceRange: { min: 5, max: 10 },
    priceTier: "budget",
    tagline: "Pas de pliage, juste lancer",
    description: "Bacs en tissu sans couvercle. Un pour les chaussettes, un pour les sous-vêtements. Tu lances, tu fermes, c'est rangé.",
    whyItWorks: "Le couvercle est une barrière mentale. Sans couvercle = zéro friction pour les jours sans énergie.",
    effortScore: 2,
    essential: true,
    alternatives: ["Cartons de déménagement découpés", "Paniers en osier"],
    icon: "package"
  },
  {
    id: 3,
    name: "Portant à vêtements",
    slug: "clothing-rack",
    category: "clothing",
    priceRange: { min: 20, max: 40 },
    priceTier: "moderate",
    tagline: "Remplace le placard sombre",
    description: "Une simple barre sur roulettes ou fixe. Tout est visible, tout est accessible. Pas de portes à ouvrir.",
    whyItWorks: "La visibilité totale élimine le « hors de vue, hors de l'esprit » pour les esprits occupés.",
    effortScore: 2,
    essential: true,
    alternatives: ["Barre de tension entre deux murs", "Cintreuse fixée au mur"],
    icon: "shirt"
  },
  {
    id: 4,
    name: "Crochets adhésifs robustes",
    slug: "adhesive-hooks",
    category: "entry",
    priceRange: { min: 8, max: 15 },
    priceTier: "budget",
    tagline: "Colle-les là où tu lâches naturellement",
    description: "Style Command 3M (gros modèles). Pour les clés, casquette, sac à l'entrée exactement là où tu arrives.",
    whyItWorks: "Place le stockage au point exact de décision. Idéal quand tu es trop fatigué pour des détours.",
    effortScore: 1,
    essential: true,
    alternatives: ["Porte-manteau mural", "Patère à fixer"],
    icon: "hook"
  },
  {
    id: 5,
    name: "Paniers à linge ouverts (x2)",
    slug: "open-laundry-hampers",
    category: "clothing",
    priceRange: { min: 10, max: 20 },
    priceTier: "budget",
    tagline: "Un pour sale, un pour « pas sûr »",
    description: "Deux paniers SANS couvercle. Le système binaire qui sauve les vêtements du tas au sol.",
    whyItWorks: "Le couvercle ajoute une étape. Sans couvercle = tu lances et tu continues, même à zéro énergie.",
    effortScore: 1,
    essential: true,
    alternatives: ["Sac de rangement en tissu", "Corbeille simple"],
    icon: "laundry"
  },
  {
    id: 6,
    name: "Bol ou plateau d'entrée",
    slug: "entry-bowl",
    category: "entry",
    priceRange: { min: 0, max: 8 },
    priceTier: "budget",
    tagline: "Empêche les clés de disparaître",
    description: "N'importe quel bol ou plateau près de la porte. Tout ce qui est dans tes poches y atterrit.",
    whyItWorks: "Point de dépôt unique. Tes clés sont toujours au même endroit, même les jours de brouillard mental.",
    effortScore: 1,
    essential: true,
    alternatives: ["Petite assiette", "Boîtier recyclé", "Niche murale"],
    icon: "key"
  },

  // === ADDITIONS (RESEARCH-BACKED) ===
  {
    id: 7,
    name: "Plateau tournant (Lazy Susan)",
    slug: "lazy-susan",
    category: "kitchen",
    priceRange: { min: 12, max: 25 },
    priceTier: "budget",
    tagline: "Plus besoin de fouiller",
    description: "Plateau rotatif pour salle de bain ou cuisine. Épices, produits de beauté, condiments - un tour et c'est trouvé.",
    whyItWorks: "Réduit la friction de fouiller. Essentiel pour les jours à faible motivation.",
    effortScore: 2,
    essential: false,
    alternatives: ["Plateau de service simple", "Bocaux visibles sur étagère"],
    icon: "rotate-cw"
  },
  {
    id: 8,
    name: "Trieur vertical à papiers",
    slug: "vertical-file-sorter",
    category: "living",
    priceRange: { min: 10, max: 20 },
    priceTier: "budget",
    tagline: "Empêche les piles de courrier",
    description: "Trieur vertical pour courrier, factures, documents. Chaque catégorie a sa case. Plus de piles qui s'effondrent.",
    whyItWorks: "Le courrier horizontal devient une pile impossible. Le vertical reste gérable quand tu es submergé.",
    effortScore: 2,
    essential: false,
    alternatives: ["Boîtes à chaussures verticales", "Trousse de bureau debout"],
    icon: "file"
  },
  {
    id: 9,
    name: "Tiroirs empilables transparents",
    slug: "clear-stackable-drawers",
    category: "living",
    priceRange: { min: 15, max: 30 },
    priceTier: "moderate",
    tagline: "Tu vois ce qu'il y a dedans",
    description: "Tiroirs en plastique transparent qui s'empilent. Idéal pour câbles, chargeurs, petits objets qui traînent.",
    whyItWorks: "La transparence élimine le mystère. Tu sais exactement où sont tes affaires sans ouvrir.",
    effortScore: 2,
    essential: false,
    alternatives: ["Bocaux en verre", "Sacoches suspendues"],
    icon: "box"
  },
  {
    id: 10,
    name: "Chariot sur roulettes",
    slug: "rolling-cart",
    category: "living",
    priceRange: { min: 25, max: 50 },
    priceTier: "moderate",
    tagline: "Stockage mobile pour zones à fort trafic",
    description: "Petit chariot à 3 niveaux. Le déplace vers là où tu en as besoin. Entrée, salon, chambre - il s'adapte.",
    whyItWorks: "Le stockage vient à toi, pas l'inverse. Parfait quand tu es trop fatigué pour te déplacer.",
    effortScore: 2,
    essential: false,
    alternatives: [" dessous de table avec rangement", "Étagère sur roulettes"],
    icon: "cart"
  },
  {
    id: 11,
    name: "Organisateur d'armoire",
    slug: "over-cabinet-organizer",
    category: "kitchen",
    priceRange: { min: 15, max: 30 },
    priceTier: "moderate",
    tagline: "Espace mort transformé en stockage",
    description: "Se fixe sur la porte d'armoire ou s'accroche à l'intérieur. Sacs poubelles, produits, torchons - l'espace caché devient utile.",
    whyItWorks: "Utilise l'espace qui existe déjà. Pas besoin de meuble supplémentaire à gérer.",
    effortScore: 2,
    essential: false,
    alternatives: ["Crochets derrière la porte", "Tige de tension avec crochets"],
    icon: "cabinet"
  },
  {
    id: 12,
    name: "Tige de tension",
    slug: "tension-rod",
    category: "bathroom",
    priceRange: { min: 8, max: 18 },
    priceTier: "budget",
    tagline: "Installation en 30 secondes",
    description: "Tige télescopique qui se bloque par tension. Suspends ce que tu veux sans un seul outil.",
    whyItWorks: "Zéro perçage, zéro outil. Tu installes, tu utilises. Barrière éliminée pour les jours difficiles.",
    effortScore: 2,
    essential: false,
    alternatives: ["Crochets adhésifs", "Porte-manteau mural"],
    icon: "minimize-2"
  }
]

export const itemsByCategory = {
  clothing: lazyItems.filter(item => item.category === 'clothing'),
  entry: lazyItems.filter(item => item.category === 'entry'),
  living: lazyItems.filter(item => item.category === 'living'),
  kitchen: lazyItems.filter(item => item.category === 'kitchen'),
  bathroom: lazyItems.filter(item => item.category === 'bathroom'),
}

export const essentialItems = lazyItems.filter(item => item.essential)
export const niceToHaveItems = lazyItems.filter(item => !item.essential)

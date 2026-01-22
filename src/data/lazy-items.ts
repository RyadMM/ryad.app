export interface LazyItem {
  id: number
  name: string
  category: 'vetements' | 'vrac'
  price: string
  desc: string
  why: string
  icon: string
}

export const lazyItems: LazyItem[] = [
  {
    id: 1,
    name: "Patère de porte (Over-door)",
    category: "vetements",
    price: "10$ - 15$",
    desc: "Zéro trou, zéro outil. Tu l'accroches sur la porte de la chambre ou de la salle de bain.",
    why: "Transforme un espace mort en rangement immédiat pour peignoir/jeans.",
    icon: "🚪"
  },
  {
    id: 2,
    name: "Bacs en tissu (SKUBB/DRONA)",
    category: "vetements",
    price: "5$ - 8$",
    desc: "Bacs carrés simples. Prends-en 4 : Chaussettes, Boxers, T-shirts maison, Sport.",
    why: "Élimine le besoin de plier. Tu tries, tu lances, tu oublies.",
    icon: "📦"
  },
  {
    id: 3,
    name: "Portant à vêtements (Rack)",
    category: "vetements",
    price: "20$ - 30$",
    desc: "Simple barre sur roulettes ou fixe. Plus c'est simple, mieux c'est.",
    why: "Remplace le placard sombre. Tout est visible, donc tu sais ce que tu as.",
    icon: "👗"
  },
  {
    id: 4,
    name: "Crochets adhésifs robustes",
    category: "vrac",
    price: "8$ (paquet)",
    desc: "Style Command 3M (les gros modèles). Pour l'entrée (clés, casquette).",
    why: "Tu peux les coller EXACTEMENT là où tu lâches tes affaires naturellement.",
    icon: "🪝"
  },
  {
    id: 5,
    name: "Panier à linge (x2)",
    category: "vetements",
    price: "10$ ch.",
    desc: "Deux paniers ouverts (pas de couvercle!). Un pour le sale, un pour le 'pas sûr'.",
    why: "Le couvercle est une barrière mentale. Enlève-le.",
    icon: "🧺"
  },
  {
    id: 6,
    name: "Vide-poche entrée",
    category: "vrac",
    price: "0$ - 5$",
    desc: "N'importe quel bol ou petit plateau. Sur le meuble le plus proche de la porte.",
    why: "Empêche les clés de se téléporter dans le néant.",
    icon: "🔑"
  }
]

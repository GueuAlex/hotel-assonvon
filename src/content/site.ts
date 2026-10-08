// Contenu du site : toutes les donnees de l'hotel, separees de la presentation.
// Les elements marques "a confirmer" dans brief/infos.md doivent etre valides avec l'hotel.

export const hotel = {
  nom: "Hôtel Assonvon",
  nomCourt: "Assonvon",
  categorie: "Complexe hôtelier ★★★",
  etoiles: 3,
  depuis: 1984,
  quartier: "Yopougon",
  ville: "Abidjan",
  accroche: "L'immortel.",
  description:
    "Complexe hôtelier 3 étoiles à Yopougon depuis 1984 : 110 chambres, piscine, restaurant, bar et salles de cérémonie de 100 à 350 places.",
} as const;

export const contact = {
  telephoneAffiche: "07 48 10 34 84",
  telephoneLien: "tel:+2250748103484",
  adresse: ["Rue O111, Yopougon Assonvon", "21 BP 2072 Abidjan 21", "Côte d'Ivoire"],
  gps: { lat: 5.332804, lng: -4.06771, affiche: "5°19'58\" N · 4°04'04\" O" },
  itineraire: "https://www.google.com/maps/search/?api=1&query=5.332804%2C-4.06771",
  facebook: "https://www.facebook.com/p/HOTEL-Assonvon-Yopougon-100088266557671/",
} as const;

export const navigation = [
  { label: "Héritage", href: "#heritage" },
  { label: "L'hôtel", href: "#galerie" },
  { label: "Séjours", href: "#sejours" },
  { label: "Salles", href: "#salles" },
  { label: "Contact", href: "#contact" },
] as const;

export const hero = {
  kicker: `Hôtel ★★★ · ${hotel.quartier} · Depuis ${hotel.depuis}`,
  titre: ["Asson", "von"],
  sousTitre:
    "L'immortel. Quatre décennies d'hospitalité, d'art ivoirien et de grandes fêtes au cœur de Yopougon.",
  ctaPrincipal: "Réserver",
  ctaSecondaire: "Organiser un événement",
  oeuvre: {
    src: "/images/masque-sculpte.jpg",
    largeur: 720,
    hauteur: 960,
    alt: "Grand masque sculpté en bois exposé dans le hall de l'hôtel Assonvon",
    cartel: "Masque sculpté · exposé dans le hall",
  },
} as const;

export const ruban = ["Séjours", "Mariages", "Baptêmes", "Conférences", "Piscine", "Restaurant", "Bar"] as const;

export const heritage = {
  eyebrow: "Héritage",
  texte:
    "Depuis 1984, Assonvon reçoit Abidjan. Parmi les premiers édifices touristiques de la ville, la maison a vu passer quatre décennies de voyageurs, de mariés et de familles,",
  accent: "entre marbre rose et art ivoirien.",
  chiffres: [
    { valeur: 1984, label: "Année d'ouverture" },
    { valeur: 110, label: "Chambres" },
    { valeur: 4, label: "Salles de cérémonie" },
    { valeur: 350, label: "Invités dans la grande salle" },
  ],
} as const;

export const galerie = {
  eyebrow: "L'hôtel",
  titre: "Visite de nuit",
  intro: "Quatre pièces de la maison, à découvrir comme dans une galerie.",
  oeuvres: [
    {
      numero: "01",
      titre: "Le hall",
      legende: "Marbre rose, laiton et velours",
      src: "/images/hall-marbre.jpg",
      largeur: 720,
      hauteur: 540,
      alt: "Hall de l'hôtel Assonvon, sol et colonnes en marbre rose, cordons de velours rouge",
    },
    {
      numero: "02",
      titre: "Le masque",
      legende: "Sculpture sur bois exposée dans le hall",
      src: "/images/masque-sculpte.jpg",
      largeur: 720,
      hauteur: 960,
      alt: "Grand masque ivoirien sculpté en bois sombre",
    },
    {
      numero: "03",
      titre: "Le patio",
      legende: "Galerie couverte et bassins de mosaïque",
      src: "/images/patio-bassins.jpg",
      largeur: 720,
      hauteur: 540,
      alt: "Galerie couverte longeant les bassins en mosaïque bleue du patio",
    },
    {
      numero: "04",
      titre: "Le jardin",
      legende: "Crotons, cordylines et eau",
      src: "/images/patio-jardin.jpg",
      largeur: 720,
      hauteur: 540,
      alt: "Plantes tropicales et bassin en mosaïque bleue au cœur du patio",
    },
  ],
} as const;

export const espaces = {
  eyebrow: "Sur place",
  liste: [
    { nom: "Piscine", texte: "Un bassin pour se rafraîchir au cœur de Yopougon, le rendez-vous des week-ends ensoleillés." },
    { nom: "Restaurant", texte: "Une table pour les résidents comme pour les invités de vos réceptions." },
    { nom: "Bar", texte: "Pour prolonger la soirée, au calme, dans un cadre chargé d'histoire." },
  ],
} as const;

export const sejours = {
  eyebrow: "Séjours",
  titre: ["110 chambres,", "dès 20 000 FCFA"],
  texte: "Des chambres dotées d'équipements modernes, à quelques pas de la piscine, du restaurant et du bar.",
  // Noms et unites des categories a confirmer avec l'hotel
  tarifs: [
    { categorie: "I", prix: "20 000" },
    { categorie: "II", prix: "25 000" },
    { categorie: "III", prix: "30 000" },
    { categorie: "IV", prix: "40 000" },
  ],
  devise: "FCFA",
  cta: "Réserver auprès de la réception",
} as const;

export const salles = {
  eyebrow: "Salles de cérémonie",
  titre: ["Quatre salles,", "vos grands jours"],
  texte: "Mariages, baptêmes, réunions et conférences : des salles de 100 à 350 places, avec restaurant et bar sur place.",
  usages: ["Mariages", "Baptêmes", "Réunions", "Conférences"],
  liste: [
    { places: 350, nom: "Salle IV" },
    { places: 200, nom: "Salle III" },
    { places: 150, nom: "Salle II" },
    { places: 100, nom: "Salle I" },
  ],
  image: { src: "/images/hall-marbre.jpg", largeur: 720, hauteur: 540 },
  cta: "Organiser un événement",
} as const;

export const bientot = {
  eyebrow: "En construction",
  titre: ["Piscine olympique", "& salle de cinéma"],
  texte: "Deux nouveaux espaces pour écrire la suite de l'histoire d'Assonvon.",
} as const;

export const signature = "Proposition de site réalisée par Digifaz";

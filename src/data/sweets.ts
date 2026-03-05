export interface Sweet {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export const categories: Record<string, string> = {
  brigadeiros_tradicionais: "Brigadeiros Tradicionais",
  brigadeiros_luxo: "Brigadeiros Luxo",
  doces_finos_luxo: "Doces Finos - Luxo",
  trufas_bombons: "Trufas e Bombons",
  doces_finos_decorativos: "Doces Finos Decorativos",
  copinhos: "Copinhos",
  lembrancas: "Lembranças",
  pascoa: "Páscoa",
};

import { getImageUrl } from "@/utils/imageCache";
import { v5 as uuidv5 } from "uuid";

const SWEETS_NAMESPACE = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";

const sweetsRaw: Omit<Sweet, "id">[] = [
  {
    name: "Beijinho",
    price: 3.0,
    category: "brigadeiros_tradicionais",
    image: getImageUrl("/images/sweets/beijinho.jpg"),
  },
  {
    name: "Brigadeiro",
    price: 3.2,
    category: "brigadeiros_tradicionais",
    image: getImageUrl("/images/sweets/brigadeiro.jpeg"),
  },
  {
    name: "Brigadeiro de Morango",
    price: 3.5,
    category: "brigadeiros_tradicionais",
    image: getImageUrl("/images/sweets/brigadeiro-morango.jpeg"),
  },
  { name: "Brigadeiro de Café", price: 3.2, category: "brigadeiros_tradicionais" },
  {
    name: "Cajuzinho",
    price: 3.0,
    category: "brigadeiros_tradicionais",
  },
  {
    name: "Casadinho",
    price: 3.0,
    category: "brigadeiros_tradicionais",
    // image: "/images/sweets/casadinho.jpeg",
  },
  {
    name: "Brigadeiro de Churros",
    price: 3.0,
    category: "brigadeiros_tradicionais",
    image: getImageUrl("/images/sweets/brigadeiro-churros.jpg"),
  },
  {
    name: "Coco queimado",
    price: 3.0,
    category: "brigadeiros_tradicionais",
    // image: "/images/sweets/coco-queimado.jpeg",
  },
  {
    name: "Flor de Beijinho",
    price: 3.5,
    category: "brigadeiros_tradicionais",
    image: getImageUrl("/images/sweets/flor-beijinho.jpeg"),
  },
  {
    name: "Flor napolitana",
    price: 3.5,
    category: "brigadeiros_tradicionais",
    image: getImageUrl("/images/sweets/flor-napolitana.jpeg"),
  },
  { name: "Brigadeiro de Ninho", price: 3.0, category: "brigadeiros_tradicionais" },

  {
    name: "Brigadeiro Belga",
    price: 4.2,
    category: "brigadeiros_luxo",
    image: getImageUrl("/images/sweets/brigadeiro-belga.jpg"),
  },
  {
    name: "Belga Amargo",
    price: 4.2,
    category: "brigadeiros_luxo",
  },
  {
    name: "Brigadeiro Trufado",
    price: 4.2,
    category: "brigadeiros_luxo",
    image: getImageUrl("/images/sweets/brigadeiro-trufado.jpeg"),
  },
  {
    name: "Brigadeiro Brulee",
    price: 3.5,
    category: "brigadeiros_luxo",
    image: getImageUrl("/images/sweets/brigadeiro-brulee.jpg"),
  },
  {
    name: "Brigadeiro Ferrero",
    price: 4.2,
    category: "brigadeiros_luxo",
    image: getImageUrl("/images/sweets/brigadeiro-ferrero.jpg"),
  },
  {
    name: "Brigadeiro Kinder Bueno",
    price: 4.2,
    category: "brigadeiros_luxo",
  },
  {
    name: "Limão Siciliano e Coco",
    price: 3.5,
    category: "brigadeiros_luxo",
    image: getImageUrl("/images/sweets/limao-siciliano-coco.jpeg"),
  },
  {
    name: "Ninho com Nutella",
    price: 4.2,
    category: "brigadeiros_luxo",
    image: getImageUrl("/images/sweets/ninho-nutella.jpeg"),
  },
  {
    name: "Olho de Sogra",
    price: 3.5,
    category: "brigadeiros_luxo",
    image: getImageUrl("/images/sweets/olho-sogra.jpg"),
  },
  {
    name: "Brigadeiro de Pistache",
    price: 4.5,
    category: "brigadeiros_luxo",
    image: getImageUrl("/images/sweets/brigadeiro-pistache.jpeg"),
  },
  {
    name: "Romeu e Julieta",
    price: 4.2,
    category: "brigadeiros_luxo",
    image: getImageUrl("/images/sweets/romeu-julieta.jpg"),
  },

  {
    name: "Bombom crocante dourado",
    price: 4.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/bombom-dourado.jpeg"),
  },
  {
    name: "Bombom de Cereja",
    price: 4.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/bombom-cereja.jpeg"),
  },
  {
    name: "Bombom de Coco",
    price: 4.2,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/bombom-coco.jpeg"),
  },
  {
    name: "Diamante de Ovomaltine",
    price: 4.8,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/diamante-ovomaltine.jpeg"),
  },
  {
    name: "Bombom de Morango",
    price: 6.8,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/bombom-morango.jpg"),
  },
  {
    name: "Morango aberto",
    price: 6.8,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/morango-aberto.jpg"),
  },
  {
    name: "Bombom de Nozes",
    price: 5.2,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/bombom-nozes.jpeg"),
  },
  { 
    name: "Bombom de Uva", 
    price: 4.5, 
    category: "doces_finos_luxo", 
    image: getImageUrl("/images/sweets/bombom-uva.jpg") 
  },
  {
    name: "Uva c/ sucrilhos",
    price: 4.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/uva-sucrilhos.jpg"),
  },
  {
    name: "Uva s/ chocolate",
    price: 4.3,
    category: "doces_finos_luxo",
  },
  {
    name: "Caramelo salgado c/ pistache crocante",
    price: 5.0,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/caramelo-salgado.jpg"),
  },
  {
    name: "Coxinha de Morango",
    price: 6.8,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/coxinha-morango.jpg"),
  },
  {
    name: "Abacaxi perolado",
    price: 4.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/abacaxi-perolado.jpg"),
  },
  {
    name: "Camafeu de nozes",
    price: 4.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/camafeu-nozes.jpg"),
  },
  {
    name: "Cone de Melão",
    price: 5.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/cone-melao.jpg"),
  },
  {
    name: "Damasco Recheado",
    price: 4.8,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/damasco-recheado.jpg"),
  },
  {
    name: "Delícia do Pará",
    price: 4.8,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/delicia-para.jpg"),
  },
  {
    name: "Enlace de Nozes",
    price: 5.0,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/enlace-nozes.jpeg"),
  },
  {
    name: "Explosão de caramelo",
    price: 6.5,
    category: "doces_finos_luxo",
    // image: "/images/sweets/explosao-caramelo.jpeg",
  },
  {
    name: "Explosão de Nutella c/ cookies",
    price: 6.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/explosao-nutella-cookies.jpg"),
  },
  { name: "Ferrero", price: 6.5, category: "doces_finos_luxo", image: getImageUrl("/images/sweets/ferrero-luxo.jpg") },
  {
    name: "Figo recheado",
    price: 4.8,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/figo-recheado.jpg"),
  },
  {
    name: "Fudge de amêndoas",
    price: 5.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/fudge-amendoas.jpeg"),
  },
  {
    name: "Fudge de pistache e nozes",
    price: 5.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/fudge-pistache.jpeg"),
  },
  {
    name: "Moedinha de limão siciliano",
    price: 5.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/moedinha-limão.jpg"),
  },
  {
    name: "Ninho de Fios de Ovos",
    price: 6.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/ninho-fios-ovos.jpg"),
  },
  {
    name: "Olho de sogra Caramelizado",
    price: 4.2,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/olho-sogra-caramelizado.jpg"),
  },
  {
    name: "Ouriço de Coco",
    price: 3.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/ouriço-coco.jpeg"),
  },
  { 
    name: "Raffaello", 
    price: 6.5, 
    category: "doces_finos_luxo", 
    image: getImageUrl("/images/sweets/raffaello.jpeg") },
  { 
    name: "Sushi de Damasco",
    price: 6.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/sushi-damasco.jpg"),
  },
  {
    name: "Trouxinha de Coco",
    price: 4.5,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/trouxinha-coco.jpg"),
  },

  { name: "Trufa de Café", price: 4.2, category: "trufas_bombons" },
  {
    name: "Trufa de Maracujá de Coração",
    price: 4.2,
    category: "trufas_bombons",
    image: getImageUrl("/images/sweets/trufa-maracuja.jpeg"),
  },
  {
    name: "Trufa de Pistache",
    price: 5.5,
    category: "trufas_bombons",
  },
  { name: "Trufa Mista", price: 4.5, category: "trufas_bombons", image: getImageUrl("/images/sweets/trufa-mista.jpg") },
  {
    name: "Trufa de Limão",
    price: 4.5,
    category: "trufas_bombons",
  },
  {
    name: "Trufa Tradicional",
    price: 4.2,
    category: "trufas_bombons",
    image: getImageUrl("/images/sweets/trufa-tradicional.jpg"),
  },

  {
    name: "Cestinha de Flores e Frutas",
    price: 5.5,
    category: "doces_finos_decorativos",
    image: getImageUrl("/images/sweets/cestinha-flores-frutas.jpeg"),
  },
  {
    name: "Colher de Brigadeiro Belga",
    price: 5.5,
    category: "doces_finos_decorativos",
    image: getImageUrl("/images/sweets/colher-brigadeiro.jpg"),
  },
  {
    name: "Maçazinha Caramelizada",
    price: 4.5,
    category: "doces_finos_decorativos",
    image: getImageUrl("/images/sweets/macazinha.jpg"),
  },
  {
    name: "Mini Xícara Trufada",
    price: 5.5,
    category: "doces_finos_decorativos",
    // image: "/images/sweets/mini-xicara-trufada.jpeg",
  },
  {
    name: "Torre de Amarena",
    price: 5.5,
    category: "doces_finos_decorativos",
    image: getImageUrl("/images/sweets/torre-amarena.jpg"),
  },
  {
    name: "Tortinha Banoffe",
    price: 4.5,
    category: "doces_finos_decorativos",
    image: getImageUrl("/images/sweets/tortinha-banoffe.jpg"),
  },
  {
    name: "Tortinha de Limão",
    price: 4.5,
    category: "doces_finos_decorativos",
  },
  {
    name: "Torre de Pistache com Uva",
    price: 5.5,
    category: "doces_finos_decorativos",
    image: getImageUrl("/images/sweets/torre-pistache-uva.jpg"),
  },

  {
    name: "Caixinha de Pistache",
    price: 4.8,
    category: "copinhos",
    // image: "/images/sweets/caixinha-pistache.jpeg",
  },
  {
    name: "Copinho com Nutella e Morango",
    price: 5.2,
    category: "copinhos",
    image: getImageUrl("/images/sweets/copinho-morango.jpg"),
  },
  {
    name: "Copinho de Nutella com Cereja",
    price: 4.8,
    category: "copinhos",
    image: getImageUrl("/images/sweets/copinho-nutella.jpg"),
  },
  {
    name: "Copinho de Physalis",
    price: 4.8,
    category: "copinhos",
    image: getImageUrl("/images/sweets/copinho-physalis.jpg"),
  },
  {
    name: "Copinho Trufado de Mirtilo",
    price: 5.5,
    category: "copinhos",
    image: getImageUrl("/images/sweets/copinho-mirtilo.jpg"),
  },
  {
    name: "Pirâmide Trufado Crocante",
    price: 5.0,
    category: "doces_finos_luxo",
    image: getImageUrl("/images/sweets/piramide-trufada-crocante.jpg"),
  },
  {
    name: "Pirulito de Ninho",
    price: 5.0,
    category: "doces_finos_decorativos",
    image: getImageUrl("/images/sweets/pirulito-ninho.jpg"),
  },
  { name: "Alfajor", price: 7.5, category: "lembrancas" },
  { name: "Bem Casado", price: 7.5, category: "lembrancas", image: getImageUrl("/images/sweets/bem-casado.jpeg") },
  { name: "Cake Pop", price: 12.0, category: "lembrancas" },
  { name: "Pão de Mel", price: 7.5, category: "lembrancas" },
  { name: "Puxa de Nuts", price: 5.5, category: "copinhos" },
  { name: "Ovo de Colher Dois Amores", price: 120.0, category: "pascoa", image: getImageUrl("/images/sweets/ovo-pascoa-dois-amores.jpg") },
  { name: "Casca Recheada Trufada Maracujá", price: 80.0, category: "pascoa", image: getImageUrl("/images/sweets/casca-recheada-trufa-maracujá.jpg") },
  { name: "Casca Recheada Caramelo Salgado e Pistache", price: 80.0, category: "pascoa", image: getImageUrl("/images/sweets/casca-recheada-caramelo-salgado.jpg") },
  { name: "Casca Recheada Cookies e Nutella", price: 80.0, category: "pascoa", image: getImageUrl("/images/sweets/casca-recheada-cookies.jpg") },
  { name: "Casca Recheada Brigadeiríssimo", price: 80.0, category: "pascoa", image: getImageUrl("/images/sweets/casca-recheada-brigadeiro.jpg") },
  { name: "Ovo de Colher de Brigadeiro", price: 120.0, category: "pascoa", image: getImageUrl("/images/sweets/ovo-colher-brigadeiro.jpg") },
  { name: "Ovo de Colher de Ninho", price: 120.0, category: "pascoa", image: getImageUrl("/images/sweets/ovo-colher-ninho.jpg") },
  { name: "Ovo de Colher de Pistache", price: 150.0, category: "pascoa", image: getImageUrl("/images/sweets/ovo-colher-pistache.jpg") },
  { name: "Ovo de Colher de Explosão de Nutella", price: 150.0, category: "pascoa", image: getImageUrl("/images/sweets/ovo-colher-explosao-nutella.jpg") },
  { name: "Ovo de Colher de Ferrero", price: 150.0, category: "pascoa", image: getImageUrl("/images/sweets/ovo-colher-ferrero.jpg") },
  { name: "Ovo de Colher de Coco", price: 120.0, category: "pascoa", image: getImageUrl("/images/sweets/ovo-colher-coco.jpg") },
];

export const sweets: Sweet[] = sweetsRaw.map((s, i) => ({
  ...s,
  id: uuidv5(`${s.name}|${s.category}|${i}`, SWEETS_NAMESPACE),
}));

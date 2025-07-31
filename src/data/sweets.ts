export interface Sweet {
  id: string;
  name: string;
  price: number;
  category: string;
}

export const categories: Record<string, string> = {
  brigadeiros_tradicionais: "Brigadeiros Tradicionais",
  brigadeiros_luxo: "Brigadeiros Luxo",
  doces_finos_luxo: "Doces Finos - Luxo",
  trufas_bombons: "Trufas e Bombons",
  doces_finos_decorativos: "Doces Finos Decorativos",
  copinhos: "Copinhos",
  lembrancas: "Lembranças",
};

export const sweets: Sweet[] = [
  // Brigadeiros Tradicionais
  { id: "1", name: "Beijinho", price: 3.0, category: "brigadeiros_tradicionais" },
  { id: "2", name: "Brigadeiro", price: 3.2, category: "brigadeiros_tradicionais" },
  { id: "3", name: "Bicho de pé", price: 3.5, category: "brigadeiros_tradicionais" },
  { id: "4", name: "Café", price: 3.2, category: "brigadeiros_tradicionais" },
  { id: "5", name: "Cajuzinho", price: 3.0, category: "brigadeiros_tradicionais" },
  { id: "6", name: "Casadinho", price: 3.0, category: "brigadeiros_tradicionais" },
  { id: "7", name: "Churros", price: 3.0, category: "brigadeiros_tradicionais" },
  { id: "8", name: "Coco queimado", price: 3.0, category: "brigadeiros_tradicionais" },
  { id: "9", name: "Flor de Beijinho", price: 3.5, category: "brigadeiros_tradicionais" },
  { id: "10", name: "Flor napolitana", price: 3.5, category: "brigadeiros_tradicionais" },
  { id: "11", name: "Ninho", price: 3.0, category: "brigadeiros_tradicionais" },

  // Brigadeiros Luxo
  { id: "12", name: "Belga", price: 4.2, category: "brigadeiros_luxo" },
  { id: "13", name: "Belga Amargo", price: 4.2, category: "brigadeiros_luxo" },
  { id: "14", name: "Brigadeiro Trufado", price: 4.2, category: "brigadeiros_luxo" },
  { id: "15", name: "Brulee", price: 3.5, category: "brigadeiros_luxo" },
  { id: "16", name: "Ferrero", price: 4.2, category: "brigadeiros_luxo" },
  { id: "17", name: "Kinder Bueno", price: 4.2, category: "brigadeiros_luxo" },
  { id: "18", name: "Limão Siciliano e Coco", price: 3.5, category: "brigadeiros_luxo" },
  { id: "19", name: "Ninho com Nutella", price: 4.2, category: "brigadeiros_luxo" },
  { id: "20", name: "Olho de Sogra", price: 3.5, category: "brigadeiros_luxo" },
  { id: "21", name: "Bombom de Pistache", price: 4.5, category: "brigadeiros_luxo" },
  { id: "22", name: "Romeu e Julieta", price: 4.2, category: "brigadeiros_luxo" },

  // Doces Finos - Luxo
  { id: "23", name: "Brigadeiro crocante dourado", price: 4.5, category: "doces_finos_luxo" },
  { id: "24", name: "Bombom de Cereja", price: 4.5, category: "doces_finos_luxo" },
  { id: "25", name: "Bombom de Coco", price: 4.2, category: "doces_finos_luxo" },
  { id: "26", name: "Diamante de Ovomaltine", price: 4.8, category: "doces_finos_luxo" },
  { id: "27", name: "Bombom de Morango", price: 6.8, category: "doces_finos_luxo" },
  { id: "28", name: "Morango aberto", price: 6.8, category: "doces_finos_luxo" },
  { id: "29", name: "Bombom de Nozes", price: 5.2, category: "doces_finos_luxo" },
  { id: "30", name: "Bombom Uva", price: 4.5, category: "doces_finos_luxo" },
  { id: "31", name: "Uva c/ sucrilhos", price: 4.5, category: "doces_finos_luxo" },
  { id: "32", name: "Uva s/ chocolate", price: 4.3, category: "doces_finos_luxo" },
  { id: "33", name: "Caramelo salgado c/ pistache crocante", price: 5.0, category: "doces_finos_luxo" },
  { id: "34", name: "Coxinha de Morango", price: 6.8, category: "doces_finos_luxo" },
  { id: "59", name: "Abacaxi perolado", price: 4.5, category: "doces_finos_luxo" },
  { id: "60", name: "Camafeu de nozes", price: 4.5, category: "doces_finos_luxo" },
  { id: "61", name: "Cone de Melão", price: 5.5, category: "doces_finos_luxo" },
  { id: "62", name: "Damasco Recheado", price: 4.8, category: "doces_finos_luxo" },
  { id: "63", name: "Delícia do Pará", price: 4.8, category: "doces_finos_luxo" },
  { id: "64", name: "Enlace de Nozes", price: 5.0, category: "doces_finos_luxo" },
  { id: "65", name: "Explosão de caramelo", price: 6.5, category: "doces_finos_luxo" },
  { id: "66", name: "Explosão de Nutella c/ cookies", price: 6.5, category: "doces_finos_luxo" },
  { id: "67", name: "Ferrero", price: 6.5, category: "doces_finos_luxo" },
  { id: "68", name: "Figo recheado", price: 4.8, category: "doces_finos_luxo" },
  { id: "69", name: "Fudge de amêndoas", price: 5.5, category: "doces_finos_luxo" },
  { id: "70", name: "Fudge de pistache e nozes", price: 5.5, category: "doces_finos_luxo" },
  { id: "71", name: "Moedinha de limão siciliano", price: 5.5, category: "doces_finos_luxo" },
  { id: "72", name: "Ninho de Fios de Ovos", price: 6.5, category: "doces_finos_luxo" },
  { id: "73", name: "Olho de sogra Caramelizado", price: 4.2, category: "doces_finos_luxo" },
  { id: "74", name: "Ouriço de Coco", price: 3.5, category: "doces_finos_luxo" },
  { id: "75", name: "Raffaello", price: 6.5, category: "doces_finos_luxo" },
  { id: "76", name: "Sushi de Damasco", price: 6.5, category: "doces_finos_luxo" },
  { id: "77", name: "Trouxinha de Coco", price: 4.5, category: "doces_finos_luxo" },

  // Trufas e Bombons
  { id: "35", name: "Trufa de Café", price: 4.2, category: "trufas_bombons" },
  { id: "36", name: "Trufa de Maracujá de Coração", price: 4.2, category: "trufas_bombons" },
  { id: "37", name: "Trufa de Pistache", price: 5.5, category: "trufas_bombons" },
  { id: "38", name: "Trufa Mista", price: 4.5, category: "trufas_bombons" },
  { id: "39", name: "Trufa de Limão", price: 4.5, category: "trufas_bombons" },
  { id: "40", name: "Trufa Tradicional", price: 4.2, category: "trufas_bombons" },

  // Doces Finos Decorativos
  { id: "41", name: "Cestinha de Flores e Frutas", price: 5.5, category: "doces_finos_decorativos" },
  { id: "42", name: "Colher de Brigadeiro Belga", price: 5.5, category: "doces_finos_decorativos" },
  { id: "43", name: "Maçazinha Caramelizada", price: 4.5, category: "doces_finos_decorativos" },
  { id: "44", name: "Mini Xícara Trufada", price: 5.5, category: "doces_finos_decorativos" },
  { id: "45", name: "Torre de Amarena", price: 5.5, category: "doces_finos_decorativos" },
  { id: "46", name: "Tortinha Banoffe", price: 4.5, category: "doces_finos_decorativos" },
  { id: "47", name: "Tortinha de Limão", price: 4.5, category: "doces_finos_decorativos" },
  { id: "48", name: "Torre de Pistache com Uva", price: 5.5, category: "doces_finos_decorativos" },

  // Copinhos
  { id: "49", name: "Caixinha de Pistache", price: 4.8, category: "copinhos" },
  { id: "50", name: "Copinho com Nutella e Morango", price: 5.2, category: "copinhos" },
  { id: "51", name: "Copinho de Nutella com Cereja", price: 4.8, category: "copinhos" },
  { id: "52", name: "Copinho de Physalis", price: 4.8, category: "copinhos" },
  { id: "53", name: "Copinho Trufado de Mirtilo", price: 5.5, category: "copinhos" },
  { id: "54", name: "Copinho Puxa de Nozes", price: 5.2, category: "copinhos" },
  { id: "78", name: "Puxa de Nuts", price: 5.5, category: "copinhos" },

  // Lembranças
  { id: "55", name: "Alfajor", price: 7.5, category: "lembrancas" },
  { id: "56", name: "Bem Casado", price: 7.5, category: "lembrancas" },
  { id: "57", name: "Cake Pop", price: 12.0, category: "lembrancas" },
  { id: "58", name: "Pão de Mel", price: 7.5, category: "lembrancas" },
];

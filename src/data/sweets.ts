export interface Sweet {
  id: string;
  name: string;
  price: number;
  category: string;
}

export const categories: Record<string, string> = {
  brigadeiros: "Brigadeiros & Trufas",
  tradicionais: "Doces Tradicionais",
  bolos: "Bolos & Cupcakes",
  tortas: "Tortas & Sobremesas",
};

export const sweets: Sweet[] = [
  // Brigadeiros & Trufas
  {
    id: "1",
    name: "Brigadeiro",
    price: 3.5,
    category: "brigadeiros",
  },
  {
    id: "2",
    name: "Beijinho",
    price: 3.5,
    category: "brigadeiros",
  },
  {
    id: "3",
    name: "Casadinho",
    price: 4.0,
    category: "brigadeiros",
  },
  {
    id: "4",
    name: "Trufa de Chocolate",
    price: 5.0,
    category: "brigadeiros",
  },
  {
    id: "5",
    name: "Trufa de Morango",
    price: 5.5,
    category: "brigadeiros",
  },
  {
    id: "6",
    name: "Trufa de Maracujá",
    price: 5.5,
    category: "brigadeiros",
  },
  {
    id: "7",
    name: "Brigadeiro Gourmet",
    price: 4.5,
    category: "brigadeiros",
  },

  // Doces Tradicionais
  {
    id: "8",
    name: "Olho de Sogra",
    price: 4.5,
    category: "tradicionais",
  },
  {
    id: "9",
    name: "Bem Casado",
    price: 6.0,
    category: "tradicionais",
  },
  {
    id: "10",
    name: "Cajuzinho",
    price: 3.8,
    category: "tradicionais",
  },
  {
    id: "11",
    name: "Quindim",
    price: 7.0,
    category: "tradicionais",
  },
  {
    id: "12",
    name: "Cocada",
    price: 4.2,
    category: "tradicionais",
  },
  {
    id: "13",
    name: "Doce de Leite",
    price: 4.8,
    category: "tradicionais",
  },
  {
    id: "14",
    name: "Paçoca",
    price: 3.2,
    category: "tradicionais",
  },
  {
    id: "15",
    name: "Pé de Moleque",
    price: 3.8,
    category: "tradicionais",
  },

  // Bolos & Cupcakes
  {
    id: "16",
    name: "Brownie",
    price: 8.5,
    category: "bolos",
  },
  {
    id: "17",
    name: "Cupcake de Chocolate",
    price: 9.0,
    category: "bolos",
  },
  {
    id: "18",
    name: "Cupcake de Baunilha",
    price: 8.5,
    category: "bolos",
  },
  {
    id: "19",
    name: "Cupcake Red Velvet",
    price: 10.0,
    category: "bolos",
  },
  {
    id: "20",
    name: "Mini Bolo de Cenoura",
    price: 7.5,
    category: "bolos",
  },
  {
    id: "21",
    name: "Mini Bolo de Chocolate",
    price: 8.0,
    category: "bolos",
  },

  // Tortas & Sobremesas
  {
    id: "22",
    name: "Torta de Limão",
    price: 12.0,
    category: "tortas",
  },
  {
    id: "23",
    name: "Torta de Chocolate",
    price: 14.0,
    category: "tortas",
  },
  {
    id: "24",
    name: "Mousse de Maracujá",
    price: 8.5,
    category: "tortas",
  },
  {
    id: "25",
    name: "Pudim",
    price: 9.0,
    category: "tortas",
  },
  {
    id: "26",
    name: "Tiramisu",
    price: 15.0,
    category: "tortas",
  },
  {
    id: "27",
    name: "Pavê de Chocolate",
    price: 11.5,
    category: "tortas",
  },
];

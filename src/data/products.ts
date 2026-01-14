export interface Product {
    id: number;
    name: string;
    price: string;
    category: string;
    description: string;
    icon: string;
}

export const products: Product[] = [
    // Cat Tech
    {
        id: 1,
        name: "Cyber-Collar v4",
        price: "1.5 ETH",
        category: "Cat Tech",
        description: "Built-in GPS, biometrics, and a holographic nameplate.",
        icon: "💎"
    },
    {
        id: 2,
        name: "Quantum Laser Pointer",
        price: "0.8 ETH",
        category: "Cat Tech",
        description: "Generates non-predictable patterns for elite exercise.",
        icon: "🔦"
    },
    {
        id: 3,
        name: "Hydro-Nip Station",
        price: "2.2 ETH",
        category: "Cat Tech",
        description: "Automated hydration with organic catnip infusion.",
        icon: "⛲"
    },
    // Human Gear
    {
        id: 4,
        name: "Meow-Canceling Headphones",
        price: "0.5 ETH",
        category: "Human Gear",
        description: "Filters out hungry meows while letting purrs through.",
        icon: "🎧"
    },
    {
        id: 5,
        name: "Holographic Cat Wand",
        price: "1.2 ETH",
        category: "Human Gear",
        description: "Project a feather anywhere in the room via app.",
        icon: "🪄"
    },
    // Smart Home
    {
        id: 6,
        name: "Auto-Scoop 3000",
        price: "4.0 ETH",
        category: "Smart Home",
        description: "Nuclear-powered waste disposal unit. Zero odor.",
        icon: "🚽"
    },
    {
        id: 7,
        name: "Levitating Cat Bed",
        price: "3.5 ETH",
        category: "Smart Home",
        description: "Anti-gravity comfort for the ultimate nap.",
        icon: "🛏️"
    }
];

export const categories = ["All", ...new Set(products.map(p => p.category))];

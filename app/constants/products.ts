export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    color: string;
}

export const categories = [
    "Semua",
    "Premium Silk",
    "Cotton Voile",
    "Chiffon",
    "Jersey",
    "Pashmina",
] as const;

export const colors = [
    { name: "Cream", hex: "#F5E6CA" },
    { name: "Olive", hex: "#6B7F3B" },
    { name: "Black", hex: "#1a1a1a" },
    { name: "Pink", hex: "#D4A0A0" },
    { name: "Brown", hex: "#8B6F47" },
    { name: "Grey", hex: "#808080" },
] as const;

export const products: Product[] = [
    {
        id: "1",
        name: "Medina Silk - Sand Beige",
        price: 189000,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA8TEk6sJg4hW6ZuCzNxoDQ-GuBIpZwKC_YpsF64sud-KrsMGeKkwz4eBnNcO04V1KelzvS1-WceJ42GtoLVgYfAHCSiVojX8q4I4buDsPQtQ14iXmsuRQYMMUeo2x_bmkoMYzS3rCS4NsUr3ZFZntwddKlDh0MCXGAq69cQqsyCNUJ3gOz9TpL0Sq_qcrvcvc8a-SIKRt3QVQEzFByuqryabeHzq--xDvhpceGpDIQlVUYy3c7zWH1aU7d6aRFsLs_uutGzOPpceo",
        category: "Premium Silk",
        color: "Cream",
    },
    {
        id: "2",
        name: "Anatolia Cotton - Olive",
        price: 145000,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuC8BC5ENrWeerV9EQpnnbaTxquSEr5ftMt9mc1fctCnbOJaZ8JfyITfHyC7DLUKeMqLa9N3sNsZVeaDY4T5AO0O4CRgeHXfkdjZ9_78ymb24c831oZ-_kutmFHq3JVZoRzOzxrT65xF4azo72Q8Xb2JqsDz0b3772k0mEoRkrUxlsMCJuv4AB8jWVw6mTOF5_HtP-_QlPvfEUUnGTp6TfOkbRXhE-zCy7yACFxeWnkjDjCZ6siGJCF5f9LIvKxLsQw-AXPpikaicpY",
        category: "Cotton Voile",
        color: "Olive",
    },
    {
        id: "3",
        name: "Istanbul Night - Black",
        price: 225000,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDOhovW7tT4YGhZ2-KLa5IgHRxRsBh4d9C4oGkxHQtB4qKXGWsvYmvPBxJQVtOmd2GEnoOcMrgt1_z67mew5MueIBZ5vufjUE46IN1Mcdi2fY4C89KdZp5cTdNqRxhwfmOwQD4VM6wC1P_b5PrMzrgQc06YHrjHZ162FR3yDuYlpxPIEWaYciYBeUQR5-mQc9SPQJSZJOsOI_Ii194a-EVddtle_6P_kxXGMYMrTQybBD7xM4J4xSiLLDW1yA6gXuurtmRt5v9Six8",
        category: "Premium Silk",
        color: "Black",
    },
    {
        id: "4",
        name: "Rose Quartz Pleated",
        price: 165000,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCHaPRRxEbh2T263cDLb7Cm2pV9H8-R-3BrAerslY5B3sSgBt1z0Sxpoq97gw7olS8UbdG_oebYH_qVDndoVdCLuny6mnCyOnu8xiL4H7VUFoYLdq7nl1z0FlOUxBbvQDdS_TfVyO9BppTtm0LXO0VNlJbDel43dzL_fzcv-lT9931M6LtDPSrG_41ox41OjTeH-v6GdiXnn4qW1UB4CegK0LbQXrvym6mtfL1cTIfgHQcvnNzaqGor3zAbLzBjxeSO8VubLIH2yvk",
        category: "Chiffon",
        color: "Pink",
    },
    {
        id: "5",
        name: "Terra Cotta Basic",
        price: 135000,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuD-wP9sPE9Ro9ZhXgowLqKmiV7CG7fAXDZe6orDRlKMRI7mRTgnq6y3tr9iGFznryrftaOCJv1RHqOMFdy9gZyvvWnH5ujYMehnbqYVYpki4zZ5phNs5A4DzndsenTiRnnfrvwOBk2tTqXnwuPPCcp87lUA29W8fUqO6rEhpFHXgnHTkYMIWXwm0YyNTtgk4AxP5QzMAIeVUsSByiSILQMaa4yNTIvABEsBtZJN0vP6uxqYeZS9hPvzWHKsk-mPPLGkGcNxby6Xw5U",
        category: "Jersey",
        color: "Brown",
    },
    {
        id: "6",
        name: "Bosphorus Breeze - Floral",
        price: 210000,
        image:
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDXg8KbYbIP_hgskJyRjygXi7ARFjPr_EMwiiNTlSxWcqSU7RgpGtLnY2OidnBJEcNRGj9uaEqsiVKoEFVQUU2zx7NPOt6adZXME-P1cfU3iOdYd2-O70iqhmSsPyCMuouUSHchvcIOIeIHMTi89vPmithiPalJDH_RnnhldJmSZ80tthY5H6VxI_VFbxUXQvlsSgTx0i4l6WdQn2VvILS25nejbUAyZL64Vm2MeFTSBlt7DmvaNTQ4FjR9SO3ckVZDZOy_GZttQT0",
        category: "Pashmina",
        color: "Cream",
    },
];

export function formatRupiah(price: number): string {
    return `Rp ${price.toLocaleString("id-ID")}`;
}

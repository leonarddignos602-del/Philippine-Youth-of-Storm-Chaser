 const team = {
  regional_leader: [
    {
      name: "Marco Polo Ibañez",
      region: "Luzon",
      occupation: "Weather Specialist & Storm Chaser at DOST PAGASA",
      area: "NCR",
    },
    {
      name: "Charles Xavier Galdones",
      region: "Visayas",
      area: "Central Visayas",
    },
    { name: "LJ Deluvio", region: "Mindanao", area: "Caraga" },
  ],
  other_member: [
    {
      luzon: [
        {
          name: "Alistair Clark Sanglitan",
          area: "Calabarzon",
        },
        { 
          name: "Claine John Dizon", 
          area: "Cagayan Valley"
        },
        { 
          name: "David Jhun Carpiso",
          area: "Calabarzon"
        },
        {
          name: "Enrique Christian Bustamante",
          area: "Calabarzon",
        },
        {
          name: "Keon Consigna",
          area: "NCR",
        },
        {
          name: "Leonard Dignos",
          area: "Calabarzon"
        }
      ],
    },
    {
      visayas: [
        {
          name: "Dibbon Luis Carin",
          area: "Central Visayas"
        },
        {
          name: "Gavin Zeus Pepito",
          area: "Central Visayas"
        },
        {
          name: "Jim Emmanuel Formentera",
          area: "Central Visayas"
        },
        {
          name: "Ken Jearim Nepomuceno",
          area: "Central Visayas",
        },
        {
          name: "Kent Lloyd Heredia",
          area: "Central Visayas"
        }
      ],
    },
    {
      mindanao: [
        {
          name: "Aaron Gonzales",
          area: "Zamboanga Peninsula"
        },
        {
          name: "Elton Jade",
          area: "Zamboanga Peninsula"
        },
        {
          name: "Gabriel Galupo",
          area: "Davao Region",
        },
        {
          name: "Gemrick Saraniogon",
          area: "Zamboanga Peninsula"
        },
        {
          name: "Jacob Adlao",
          area: "Zamboanga Peninsula"
        },
        {
          name: "Jansen Langit",
          area: "Caraga"
        },
        {
          name: "Jireh Adlao",
          area: "Zamboanga Peninsula"
        },
        {
          name: "JM Sar",
          area: "Zamboanga Peninsula"
        },
        {
          name: "Jolex Langit",
          area: "Caraga"
        },
        {
          name: "Kreza Mercader",
          area: "Zamboanga Peninsula"
        },
        {
          name: "Liveby Mondejar",
          area: "Davao Region"
        },
        {
          name: "Mac Henry Española",
          area: "Caraga"
        },
        {
          name: "Patrick Griffin Pepito",
          area: "Zamboanga Peninsula"
        },
        {
          name: "Ryden Soriso",
          area: "Caraga"
        },
        {
          name: "Vince Caga",
          area: "Caraga"
        },
        {
          name: "Zaq Villanueva",
          area: "Caraga"
        },
      ],
    },
  ],
};

let teammateName = [
  ...team.regional_leader.map(l => l.name),
];
const region = ["luzon", "visayas", "mindanao"];
team.other_member.forEach((t,i) => t[region[i]].forEach(m => teammateName = [...teammateName, m.name]));

export {teammateName, team};
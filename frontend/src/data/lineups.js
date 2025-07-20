// Helper function to get background color based on position
const getBgColor = (position) => {
  switch (position) {
    case "Goalkeeper":
      return "bg-green-300";
    case "Defender":
      return "bg-blue-300";
    case "Midfielder":
      return "bg-yellow-300";
    case "Forward":
      return "bg-red-300";
    default:
      return "bg-gray-400";
  }
};

export const lineUps = [
  {
    teamId: 1,
    team: "Team A",
    coach: "Hansi Flick",
    players: [
      {
        name: "Joan Garcia",
        position: "Goalkeeper",
        number: 1,
      },
      {
        name: "Jules Kounde",
        position: "Defender",
        number: 2,
      },
      {
        name: "Pau Cubarsi",
        position: "Defender",
        number: 3,
      },
      {
        name: "Inigo Martinez",
        position: "Defender",
        number: 4,
      },
      {
        name: "Alex Balde",
        position: "Defender",
        number: 5,
      },
      {
        name: "Frenkie De Jong",
        position: "Midfielder",
        number: 6,
      },
      {
        name: "Pedri",
        position: "Midfielder",
        number: 7,
      },
      {
        name: "Raphinha",
        position: "Midfielder",
        number: 8,
      },
      {
        name: "Lamine Yamal",
        position: "Forward",
        number: 9,
      },
      {
        name: "Nico Williams",
        position: "Forward",
        number: 10,
      },
      {
        name: "R. Lewandowski",
        position: "Forward",
        number: 11,
      },
      {
        name: "W. Szczesny",
        position: "Goalkeeper",
        number: 12,
      },
      {
        name: "Eric Garcia",
        position: "Defender",
        number: 13,
      },
      {
        name: "Ronald Araujo",
        position: "Defender",
        number: 14,
      },
      {
        name: "Fermin Lopez",
        position: "Midfielder",
        number: 15,
      },
      {
        name: "Marc Cassado",
        position: "Midfielder",
        number: 16,
      },
      {
        name: "Ferran Torres",
        position: "Forward",
        number: 17,
      },
    ],
  },
  {
    teamId: 2,
    team: "Team B",
    coach: "Pep Guardiola",
    players: [
      {
        name: "Ederson Moares",
        position: "Goalkeeper",
        number: 1,
      },
      {
        name: "Matheus Nunes",
        position: "Defender",
        number: 2,
      },
      {
        name: "Ruben Dias",
        position: "Defender",
        number: 3,
      },
      {
        name: "Josko Gvardiol",
        position: "Defender",
        number: 4,
      },
      {
        name: "Rayan Ait-Nouri",
        position: "Defender",
        number: 5,
      },
      {
        name: "Ilkay Gundogan",
        position: "Midfielder",
        number: 6,
      },
      {
        name: "Bernardo Silva",
        position: "Midfielder",
        number: 7,
      },
      {
        name: "Tijani Reijnders",
        position: "Midfielder",
        number: 8,
      },
      {
        name: "Rayan Cherki",
        position: "Forward",
        number: 9,
      },
      {
        name: "Jeremy Doku",
        position: "Forward",
        number: 10,
      },
      {
        name: "Erling Haaland",
        position: "Forward",
        number: 11,
      },
      {
        name: "Stefan Ortega",
        position: "Goalkeeper",
        number: 12,
      },
      {
        name: "Nathan Ake",
        position: "Defender",
        number: 13,
      },
      {
        name: "Rodri",
        position: "Midfielder",
        number: 14,
      },
      {
        name: "Phil Foden",
        position: "Midfielder",
        number: 15,
      },
      {
        name: "Omar Mamoush",
        position: "Forward",
        number: 16,
      },
      {
        name: "Savinho",
        position: "Forward",
        number: 17,
      },
    ],
  },
];

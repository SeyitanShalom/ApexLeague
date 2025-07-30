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

export const lineups = [
  {
    matchId: 3,
    team: "Team A",
    coach: "Hansi Flick",
    players: [
      { name: "Joan Garcia", position: "Goalkeeper", number: 1 },
      { name: "Jules Kounde", position: "Defender", number: 2 },
      { name: "Pau Cubarsi", position: "Defender", number: 3 },
      { name: "Inigo Martinez", position: "Defender", number: 4 },
      { name: "Alex Balde", position: "Defender", number: 5 },
      { name: "Frenkie De Jong", position: "Midfielder", number: 6 },
      { name: "Pedri", position: "Midfielder", number: 7 },
      { name: "Raphinha", position: "Midfielder", number: 8 },
      { name: "Lamine Yamal", position: "Forward", number: 9 },
      { name: "Nico Williams", position: "Forward", number: 10 },
      { name: "R. Lewandowski", position: "Forward", number: 11 },

      { name: "W. Szczesny", position: "Goalkeeper", number: 12 },
      { name: "Eric Garcia", position: "Defender", number: 13 },
      { name: "Ronald Araujo", position: "Defender", number: 14 },
      { name: "Fermin Lopez", position: "Midfielder", number: 15 },
      { name: "Marc Cassado", position: "Midfielder", number: 16 },
      { name: "Ferran Torres", position: "Forward", number: 17 },
    ],
  },
  {
    matchId: 3,
    team: "Team B",
    coach: "Pep Guardiola",
    players: [
      { name: "Ederson Moares", position: "Goalkeeper", number: 1 },
      { name: "Matheus Nunes", position: "Defender", number: 2 },
      { name: "Ruben Dias", position: "Defender", number: 3 },
      { name: "Josko Gvardiol", position: "Defender", number: 4 },
      { name: "Rayan Ait-Nouri", position: "Defender", number: 5 },
      { name: "Ilkay Gundogan", position: "Midfielder", number: 6 },
      { name: "Bernardo Silva", position: "Midfielder", number: 7 },
      { name: "Tijani Reijnders", position: "Midfielder", number: 8 },
      { name: "Rayan Cherki", position: "Forward", number: 9 },
      { name: "Jeremy Doku", position: "Forward", number: 10 },
      { name: "Erling Haaland", position: "Forward", number: 11 },

      { name: "Stefan Ortega", position: "Goalkeeper", number: 12 },
      { name: "Nathan Ake", position: "Defender", number: 13 },
      { name: "Rodri", position: "Midfielder", number: 14 },
      { name: "Phil Foden", position: "Midfielder", number: 15 },
      { name: "Omar Mamoush", position: "Forward", number: 16 },
      { name: "Savinho", position: "Forward", number: 17 },
    ],
  },

  {
    matchId: 4,
    team: "Team G",
    coach: "Luis Enrique",
    players: [
      { name: "Donnarumma", position: "Goalkeeper", number: 1 },
      { name: "Achraf Hakimi", position: "Defender", number: 2 },
      { name: "Marquinhos", position: "Defender", number: 3 },
      { name: "Sergio Ramos", position: "Defender", number: 4 },
      { name: "Nuno Mendes", position: "Defender", number: 5 },
      { name: "Vitinha", position: "Midfielder", number: 6 },
      { name: "Fabian Ruiz", position: "Midfielder", number: 7 },
      { name: "Marco Verratti", position: "Midfielder", number: 8 },
      { name: "Ousmane Dembele", position: "Forward", number: 9 },
      { name: "Kylian Mbappe", position: "Forward", number: 10 },
      { name: "Gonçalo Ramos", position: "Forward", number: 11 },

      { name: "Keylor Navas", position: "Goalkeeper", number: 12 },
      { name: "Danilo Pereira", position: "Defender", number: 13 },
      { name: "Milan Skriniar", position: "Defender", number: 14 },
      { name: "Carlos Soler", position: "Midfielder", number: 15 },
      { name: "Lee Kang-In", position: "Midfielder", number: 16 },
      { name: "Hugo Ekitike", position: "Forward", number: 17 },
    ],
  },
  {
    matchId: 4,
    team: "Team H",
    coach: "Diego Simeone",
    players: [
      { name: "Jan Oblak", position: "Goalkeeper", number: 1 },
      { name: "Nahuel Molina", position: "Defender", number: 2 },
      { name: "Jose Gimenez", position: "Defender", number: 3 },
      { name: "Axel Witsel", position: "Defender", number: 4 },
      { name: "Reinildo Mandava", position: "Defender", number: 5 },
      { name: "Koke", position: "Midfielder", number: 6 },
      { name: "Rodrigo De Paul", position: "Midfielder", number: 7 },
      { name: "Saul Niguez", position: "Midfielder", number: 8 },
      { name: "Antoine Griezmann", position: "Forward", number: 9 },
      { name: "Memphis Depay", position: "Forward", number: 10 },
      { name: "Angel Correa", position: "Forward", number: 11 },

      { name: "Ivo Grbic", position: "Goalkeeper", number: 12 },
      { name: "Mario Hermoso", position: "Defender", number: 13 },
      { name: "Caglar Soyuncu", position: "Defender", number: 14 },
      { name: "Pablo Barrios", position: "Midfielder", number: 15 },
      { name: "Thomas Lemar", position: "Midfielder", number: 16 },
      { name: "Alvaro Morata", position: "Forward", number: 17 },
    ],
  },

  {
    matchId: 5,
    team: "Team M",
    coach: "Carlo Ancelotti",
    players: [
      { name: "Thibaut Courtois", position: "Goalkeeper", number: 1 },
      { name: "Dani Carvajal", position: "Defender", number: 2 },
      { name: "Antonio Rudiger", position: "Defender", number: 3 },
      { name: "David Alaba", position: "Defender", number: 4 },
      { name: "Ferland Mendy", position: "Defender", number: 5 },
      { name: "Eduardo Camavinga", position: "Midfielder", number: 6 },
      { name: "Luka Modric", position: "Midfielder", number: 7 },
      { name: "Toni Kroos", position: "Midfielder", number: 8 },
      { name: "Rodrygo", position: "Forward", number: 9 },
      { name: "Vinicius Jr.", position: "Forward", number: 10 },
      { name: "Jude Bellingham", position: "Forward", number: 11 },

      { name: "Andriy Lunin", position: "Goalkeeper", number: 12 },
      { name: "Eder Militao", position: "Defender", number: 13 },
      { name: "Nacho", position: "Defender", number: 14 },
      { name: "Aurelien Tchouameni", position: "Midfielder", number: 15 },
      { name: "Dani Ceballos", position: "Midfielder", number: 16 },
      { name: "Joselu", position: "Forward", number: 17 },
    ],
  },
  {
    matchId: 5,
    team: "Team O",
    coach: "Jurgen Klopp",
    players: [
      { name: "Alisson Becker", position: "Goalkeeper", number: 1 },
      { name: "Trent Alexander-Arnold", position: "Defender", number: 2 },
      { name: "Virgil van Dijk", position: "Defender", number: 3 },
      { name: "Ibrahima Konate", position: "Defender", number: 4 },
      { name: "Andrew Robertson", position: "Defender", number: 5 },
      { name: "Alexis Mac Allister", position: "Midfielder", number: 6 },
      { name: "Dominik Szoboszlai", position: "Midfielder", number: 7 },
      { name: "Curtis Jones", position: "Midfielder", number: 8 },
      { name: "Mohamed Salah", position: "Forward", number: 9 },
      { name: "Darwin Nunez", position: "Forward", number: 10 },
      { name: "Luis Diaz", position: "Forward", number: 11 },

      { name: "Caoimhin Kelleher", position: "Goalkeeper", number: 12 },
      { name: "Joel Matip", position: "Defender", number: 13 },
      { name: "Joe Gomez", position: "Defender", number: 14 },
      { name: "Ryan Gravenberch", position: "Midfielder", number: 15 },
      { name: "Harvey Elliott", position: "Midfielder", number: 16 },
      { name: "Diogo Jota", position: "Forward", number: 17 },
    ],
  },

  {
    matchId: 6,
    team: "Team K",
    coach: "Massimiliano Allegri",
    players: [
      { name: "Wojciech Szczesny", position: "Goalkeeper", number: 1 },
      { name: "Danilo", position: "Defender", number: 2 },
      { name: "Gleison Bremer", position: "Defender", number: 3 },
      { name: "Federico Gatti", position: "Defender", number: 4 },
      { name: "Alex Sandro", position: "Defender", number: 5 },
      { name: "Adrien Rabiot", position: "Midfielder", number: 6 },
      { name: "Manuel Locatelli", position: "Midfielder", number: 7 },
      { name: "Weston McKennie", position: "Midfielder", number: 8 },
      { name: "Federico Chiesa", position: "Forward", number: 9 },
      { name: "Dusan Vlahovic", position: "Forward", number: 10 },
      { name: "Moise Kean", position: "Forward", number: 11 },

      { name: "Mattia Perin", position: "Goalkeeper", number: 12 },
      { name: "Leonardo Bonucci", position: "Defender", number: 13 },
      { name: "Daniele Rugani", position: "Defender", number: 14 },
      { name: "Fabio Miretti", position: "Midfielder", number: 15 },
      { name: "Nicolò Fagioli", position: "Midfielder", number: 16 },
      { name: "Arkadiusz Milik", position: "Forward", number: 17 },
    ],
  },
  {
    matchId: 6,
    team: "Team L",
    coach: "Erik ten Hag",
    players: [
      { name: "Andre Onana", position: "Goalkeeper", number: 1 },
      { name: "Aaron Wan-Bissaka", position: "Defender", number: 2 },
      { name: "Raphael Varane", position: "Defender", number: 3 },
      { name: "Lisandro Martinez", position: "Defender", number: 4 },
      { name: "Luke Shaw", position: "Defender", number: 5 },
      { name: "Casemiro", position: "Midfielder", number: 6 },
      { name: "Mason Mount", position: "Midfielder", number: 7 },
      { name: "Bruno Fernandes", position: "Midfielder", number: 8 },
      { name: "Jadon Sancho", position: "Forward", number: 9 },
      { name: "Marcus Rashford", position: "Forward", number: 10 },
      { name: "Rasmus Hojlund", position: "Forward", number: 11 },

      { name: "Altay Bayindir", position: "Goalkeeper", number: 12 },
      { name: "Victor Lindelof", position: "Defender", number: 13 },
      { name: "Harry Maguire", position: "Defender", number: 14 },
      { name: "Scott McTominay", position: "Midfielder", number: 15 },
      { name: "Christian Eriksen", position: "Midfielder", number: 16 },
      { name: "Antony", position: "Forward", number: 17 },
    ],
  },
];

/*
    This script is used to save the colors data to the MongoDB database.
    The script uses the mongoose package to connect to MongoDB.
    The script uses the Color model to insert the data into MongoDB.
    The script uses the config file to get the MongoDB URI.
    The script logs the success or failure of the data insertion.
    The script closes the MongoDB connection after the data insertion.
*/
const mongoose = require("mongoose");
const Color = require("../models/color");
const config = require("./config");

const colors = [
  { year: 1881, colors: ["#382c1d"] },
  {
    year: 1882,
    colors: [
      "#edddcb",
      "#ac8e44",
      "#494129",
      "#9e8554",
      "#452e20",
      "#493823",
      "#625553",
      "#49493a",
      "#9f7a54",
      "#7e625a",
      "#807766",
      "#8d8154",
      "#6e6140",
      "#2d2f2d",
    ],
  },
  {
    year: 1883,
    colors: [
      "#b4a382",
      "#53544f",
      "#c8b74a",
      "#e5d3bc",
      "#40362a",
      "#514929",
      "#837549",
      "#393338",
      "#d1b86b",
      "#b4b0b7",
      "#7d7e5d",
      "#705136",
      "#9da193",
      "#816c3e",
      "#45473d",
      "#525353",
      "#5b6152",
      "#a67746",
      "#5f5d4e",
    ],
  },
  {
    year: 1884,
    colors: [
      "#41453d",
      "#7a664a",
      "#92a79b",
      "#3c3b1f",
      "#c1a7a6",
      "#363634",
      "#c9c7cd",
      "#3f3b36",
      "#3b3a36",
      "#3b3725",
      "#372d21",
      "#383d37",
      "#cbb59d",
      "#564e43",
      "#544f42",
      "#423531",
      "#48392d",
      "#ceced4",
      "#585740",
      "#61674d",
      "#6f6640",
      "#d8d9bb",
      "#b0986f",
      "#2e3227",
      "#655b49",
      "#403723",
      "#635540",
      "#434539",
      "#47432d",
      "#4e474f",
      "#434133",
      "#5d493c",
      "#4e4838",
      "#50463b",
      "#58535b",
      "#4e4635",
      "#2d291b",
      "#2c281d",
      "#403f35",
      "#4e4538",
      "#3d383f",
      "#232a18",
      "#795e3a",
      "#58463c",
      "#c8b279",
      "#312e2b",
      "#534b43",
      "#413733",
      "#292618",
      "#493a29",
      "#211c13",
      "#1a2020",
      "#5b535b",
    ],
  },
  {
    year: 1885,
    colors: [
      "#463f47",
      "#222518",
      "#3f3e37",
      "#262d30",
      "#b9b8a2",
      "#26251c",
      "#ada79b",
      "#737658",
      "#584f41",
      "#8b644d",
      "#4e443b",
      "#4c4740",
      "#3c3333",
      "#4d463e",
      "#373232",
      "#4f585a",
      "#504e37",
      "#513e32",
      "#282727",
      "#3d373c",
      "#42393f",
      "#3d342f",
      "#453531",
      "#3a3936",
      "#c6be6d",
      "#4d4939",
      "#322f2e",
      "#3d3a34",
      "#1c1f15",
      "#3a3622",
      "#473c32",
      "#86604d",
      "#3f3532",
      "#3b3b28",
      "#332e2d",
      "#3d353c",
      "#302b20",
      "#36323d",
      "#52493b",
      "#513c35",
      "#191f14",
      "#0f0d04",
      "#222729",
      "#484148",
      "#171d16",
      "#19150f",
      "#1b1a0e",
      "#1d2418",
      "#453931",
      "#46483f",
      "#182023",
      "#202818",
      "#6d5b41",
      "#1d221a",
      "#172129",
      "#756a4a",
      "#423f38",
      "#ba9d77",
      "#715830",
      "#bd8a46",
      "#2e291e",
      "#222519",
      "#17170e",
      "#5a5644",
      "#433d2d",
      "#22261a",
      "#39372d",
      "#41453b",
      "#2f3228",
      "#463e35",
      "#191f12",
      "#4f503b",
      "#3d321c",
      "#796353",
      "#7c563c",
      "#2a3529",
      "#464032",
      "#544d38",
      "#3e2c0c",
      "#605430",
      "#d9d8de",
      "#3a3729",
      "#7e6540",
      "#4a381e",
      "#8a6e4f",
      "#7f834b",
      "#d7d6dc",
      "#3a3833",
      "#474033",
      "#8e7441",
      "#2f2712",
      "#3e3d2e",
      "#504726",
      "#403941",
      "#3a3e39",
      "#847142",
      "#393830",
      "#434233",
      "#41372e",
      "#2d2716",
      "#40331e",
      "#28261a",
      "#403e35",
      "#2d2b1a",
      "#3a321d",
      "#544530",
      "#262218",
      "#2a2919",
      "#1f2321",
      "#1c1e13",
      "#1c1d14",
      "#302316",
      "#494335",
      "#3f3b35",
      "#6c6340",
      "#2f2e1f",
      "#221c10",
      "#35301b",
      "#35322f",
      "#3f3932",
      "#989a61",
      "#4c454a",
      "#3c312a",
      "#453f47",
      "#936c4b",
      "#4d4d34",
      "#6a5e44",
      "#816149",
      "#312512",
      "#6f5f36",
      "#433c42",
      "#33391d",
      "#453d23",
      "#51562d",
      "#493e25",
      "#76735f",
      "#2b281c",
      "#404133",
      "#3e4039",
      "#2a2b22",
      "#3d514f",
      "#685240",
    ],
  },
  {
    year: 1886,
    colors: [
      "#3c7a8d",
      "#798586",
      "#6c7c70",
      "#577e84",
      "#385d6a",
      "#2c5462",
      "#898476",
      "#616665",
      "#4a7172",
      "#1e3f45",
      "#342a20",
      "#1f1f14",
      "#4d464e",
      "#45463f",
      "#2b2b20",
      "#343d33",
      "#b4afb6",
      "#6e7454",
      "#826851",
      "#5f5d55",
      "#c5c9b8",
      "#919088",
      "#d1c8a7",
      "#8b704d",
      "#695a4d",
      "#6d5b4b",
      "#3a5042",
      "#46483b",
      "#675946",
      "#cbc3b0",
      "#8f7451",
      "#9d9674",
      "#534c55",
      "#92745c",
      "#4b452c",
      "#8c8a84",
      "#c7c8bc",
      "#c6baa1",
      "#7e6549",
      "#433e45",
      "#3f3a37",
      "#4b4538",
      "#3e373e",
      "#423d37",
      "#67583b",
      "#483c35",
      "#4c4c41",
      "#2f2d23",
      "#232c2d",
      "#6d5238",
      "#1e2922",
      "#534f47",
      "#61604d",
      "#b3944e",
      "#453623",
      "#47443a",
      "#70614a",
      "#7e5d40",
      "#63625f",
      "#4b5045",
      "#5f574a",
      "#2d2a23",
      "#433d27",
      "#2d140c",
      "#885a48",
      "#838074",
      "#795c4b",
      "#3a3833",
      "#454047",
      "#2a2719",
      "#7a635e",
      "#292e1a",
      "#5e3b2b",
      "#413025",
      "#654429",
      "#c5beb7",
      "#baa285",
      "#ddd4b6",
      "#4e4b23",
      "#c1b398",
      "#857e68",
      "#7e7853",
      "#b9b2b1",
      "#ddd9df",
      "#728788",
      "#9da8b1",
      "#b9bab1",
      "#a5a7ad",
      "#676d55",
      "#433e3d",
      "#271d1b",
      "#2a2820",
      "#352218",
    ],
  },
  {
    year: 1887,
    colors: [
      "#45311a",
      "#353137",
      "#808272",
      "#36332a",
      "#423730",
      "#282119",
      "#8f6b3f",
      "#455e63",
      "#797d7e",
      "#616b64",
      "#947a63",
      "#9c9182",
      "#aea16d",
      "#6f5a44",
      "#aaa692",
      "#7a7837",
      "#5b7768",
      "#7e7d7a",
      "#86816c",
      "#b39241",
      "#c5ad75",
      "#92825d",
      "#867b63",
      "#a07e4c",
      "#27281c",
      "#3e3229",
      "#866d4f",
      "#3d474d",
      "#787059",
      "#c3c3b4",
      "#8b795a",
      "#ae9e85",
      "#979b8f",
      "#c4c6d0",
      "#c7d0c9",
      "#b4bcb1",
      "#575d4b",
      "#857665",
      "#2f3d37",
      "#846e54",
      "#8a94a7",
      "#969258",
      "#495547",
      "#4f5c3c",
      "#4f6c2d",
      "#918c5e",
      "#af8d61",
      "#83826b",
      "#7c836e",
      "#8e998e",
      "#516649",
      "#958b76",
      "#9d9053",
      "#86969f",
      "#737572",
      "#30403a",
      "#a46946",
      "#8d8658",
      "#3b3a42",
      "#444b4a",
      "#363b33",
      "#3e545b",
      "#424e4f",
      "#383536",
      "#767273",
      "#4a4d32",
      "#ae966b",
      "#c4af8c",
      "#435c40",
      "#646455",
      "#b59b90",
      "#5b6b58",
      "#9b8b4d",
      "#55624a",
      "#888d6c",
      "#c1b7b7",
      "#c2cab2",
      "#797d71",
      "#615b40",
      "#8a9592",
      "#443b2c",
      "#7d6840",
      "#c69e61",
      "#acac86",
      "#3c4448",
      "#413e35",
      "#9a8345",
      "#a59ba2",
      "#97978f",
      "#aa8e2c",
      "#b7b488",
      "#dcb67d",
      "#3b372a",
      "#47594a",
      "#7f7257",
      "#857146",
      "#96875d",
      "#687e8e",
      "#a29b81",
      "#4d5b5b",
      "#a59069",
      "#88734c",
    ],
  },
  {
    year: 1888,
    colors: [
      "#9e9b81",
      "#7b8d86",
      "#b6beb6",
      "#9f8969",
      "#a9a998",
      "#afaf97",
      "#c6bab0",
      "#ceb48e",
      "#baae79",
      "#a69492",
      "#a39e6f",
      "#546f3d",
      "#a2a27e",
      "#98a295",
      "#878b6a",
      "#807e45",
      "#b4bc95",
      "#706d5f",
      "#7f866b",
      "#84876b",
      "#64705c",
      "#a39e86",
      "#8d8164",
      "#a8a170",
      "#999f94",
      "#76704d",
      "#af9f5d",
      "#90a7a0",
      "#71512b",
      "#95a392",
      "#848b52",
      "#7a7964",
      "#68a5ca",
      "#c6c8c7",
      "#5c724d",
      "#4e6a45",
      "#8c8754",
      "#c09945",
      "#9c8a49",
      "#86846f",
      "#728b8d",
      "#777874",
      "#9c9e8d",
      "#b8ab7a",
      "#425c5c",
      "#b99c62",
      "#a2938c",
      "#afa87f",
      "#bc9b4d",
      "#b5a151",
      "#7d7a48",
      "#5c6f54",
      "#9f7647",
      "#ab9050",
      "#887f4d",
      "#375142",
      "#865e4a",
      "#c4cab7",
      "#4e5f58",
      "#89866c",
      "#7a7b4b",
      "#7d6e57",
      "#7c7849",
      "#193b4f",
      "#96beac",
      "#858f6c",
      "#41596d",
      "#827769",
      "#908468",
      "#9c8852",
      "#a3a083",
      "#758453",
      "#98d2d0",
      "#807d72",
      "#b7bcaa",
      "#a68e6c",
      "#ceb042",
      "#b79e3f",
      "#ab935d",
      "#9a8859",
      "#313139",
      "#978e79",
      "#55632b",
      "#68b181",
      "#768759",
      "#576950",
      "#848463",
      "#6e6a60",
      "#958758",
      "#657958",
      "#8e582d",
      "#948a5b",
      "#6d5f43",
      "#88a36b",
      "#958b6f",
      "#73765f",
      "#7d7763",
      "#907f48",
      "#464147",
      "#b2a16c",
      "#bbaf95",
      "#83764b",
      "#c8aa74",
      "#a88755",
      "#6c552c",
      "#bd9e4a",
      "#394136",
      "#364645",
      "#60793e",
      "#9a9e5d",
      "#c8b94a",
      "#ba991c",
      "#9bab5b",
      "#476745",
      "#9b8638",
      "#949137",
      "#9f7b32",
      "#d7cb29",
      "#6e6c44",
      "#797c52",
      "#5f5a36",
      "#acc391",
      "#b5af80",
      "#bfaa62",
      "#31413c",
      "#babe39",
      "#4b5f50",
      "#818162",
      "#333c2e",
      "#494542",
      "#2d3b21",
      "#968367",
    ],
  },
  {
    year: 1889,
    colors: [
      "#8a805a",
      "#475c4d",
      "#c86e42",
      "#496f52",
      "#385a3c",
      "#b4af6c",
      "#2a3222",
      "#2b3225",
      "#776f42",
      "#444c31",
      "#29784d",
      "#847335",
      "#3d4d3d",
      "#72774b",
      "#5a6343",
      "#70795d",
      "#5f6d4c",
      "#c8bf3a",
      "#8b998b",
      "#657654",
      "#90968a",
      "#7b775b",
      "#927e53",
      "#3f4539",
      "#9c926a",
      "#687d6c",
      "#425344",
      "#44414b",
      "#4a665c",
      "#5a8f62",
      "#626b4d",
      "#787f56",
      "#70846b",
      "#89978f",
      "#849761",
      "#81905e",
      "#4c5f7d",
      "#516d66",
      "#415139",
      "#3b4b33",
      "#2b331f",
      "#303f2d",
      "#b89d54",
      "#b6c2c3",
      "#89926b",
      "#627b70",
      "#645b4a",
      "#374c41",
      "#857f53",
      "#3c4434",
      "#364029",
      "#757e75",
      "#335561",
      "#888170",
      "#c1ccc6",
      "#959d8e",
      "#8ba293",
      "#ada363",
      "#a2a17f",
      "#b9a496",
      "#749cc2",
      "#828453",
      "#8c8e7c",
      "#8b8461",
      "#7a7024",
      "#7a6e49",
      "#847a48",
      "#93a68e",
      "#8f8870",
      "#79786b",
      "#7da794",
      "#9bb5ad",
      "#909973",
      "#cec171",
      "#968363",
      "#908664",
      "#8b897b",
      "#af9f86",
      "#66816a",
      "#78694e",
      "#695f4d",
      "#919884",
      "#4a4f3f",
      "#676852",
      "#5a6d69",
      "#3e4347",
      "#3d3832",
      "#988d7a",
      "#777c7b",
      "#aa8756",
      "#8b8b4e",
      "#897e6e",
      "#a49d83",
      "#6f573e",
      "#be7e5a",
      "#4c4c39",
      "#8e6c4c",
      "#84694a",
      "#444834",
      "#706c52",
      "#b0a67f",
      "#7f7458",
      "#a7a67b",
      "#868158",
      "#6c7166",
      "#918e73",
      "#5b4b33",
      "#6c5e4b",
      "#959063",
      "#72673d",
      "#949186",
      "#bbb6bd",
      "#bab99b",
      "#bab99b",
      "#a5947f",
      "#6d756e",
      "#a4948d",
      "#a69e71",
      "#806843",
      "#a67a3b",
    ],
  },
  {
    year: 1890,
    colors: [
      "#b1833d",
      "#8b9f90",
      "#909769",
      "#bdc7b4",
      "#576c5c",
      "#93987e",
      "#3e432f",
      "#7ca2a0",
      "#b2afa2",
      "#95a4a3",
      "#988063",
      "#949b6f",
      "#4b5e3f",
      "#313f31",
      "#55613c",
      "#a89f74",
      "#948e63",
      "#7b885d",
      "#bfd4ba",
      "#b7c475",
      "#413f3e",
      "#919f8a",
      "#4b5a4f",
      "#6c7b6a",
      "#707a54",
      "#3c624b",
      "#877e56",
      "#96ae5a",
      "#778694",
      "#8c9d63",
      "#778e7b",
      "#737e5b",
      "#a4955d",
      "#879188",
      "#8b8a87",
      "#79765f",
      "#4d577c",
      "#3a3c3a",
      "#495e75",
      "#777b66",
      "#969b63",
      "#4e5a3d",
      "#81925c",
      "#849b6c",
      "#3d4b41",
      "#6d6a40",
      "#728461",
      "#929560",
      "#b2aa88",
      "#6c725b",
      "#283549",
      "#adaa7d",
      "#494b4a",
      "#56775a",
      "#3b472d",
      "#787e5b",
      "#c2c49b",
      "#ab813e",
      "#53625f",
      "#757c64",
      "#948b67",
      "#93aa8a",
      "#d2bb47",
      "#98a185",
      "#818044",
      "#85894f",
      "#86868b",
      "#5b7a60",
      "#714229",
      "#b29e84",
      "#557893",
      "#93904f",
      "#a09e8e",
      "#4f4c53",
      "#a2b196",
      "#8a8e6a",
      "#89975a",
      "#93a455",
      "#95a34e",
      "#7b7555",
      "#707a53",
      "#a09a7d",
      "#7f6e2e",
      "#9ca57f",
      "#8d9896",
      "#919870",
      "#c1aa92",
      "#b18f5d",
      "#bdac89",
    ],
  },
];

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    // Save new colors
    await Color.insertMany(colors);
    console.log("Colors have been saved");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
//Script for at sætte op data i db.
import pmodel from "./models/post.model.js";
import umodel from "./models/users.model.js";
import { addUser, createPost } from "./handlers/handler.js";
import bcrypt from "bcryptjs";
import { connectDB } from "./dbConnect.js"; //loader også env vars.
import mongoose from "mongoose";

async function setup() {
  const hashedPass = await bcrypt.hash("admin123", 10);

  await connectDB(); //Forbind til db.

  await pmodel.deleteMany({}); //Slet alle posts.
  await umodel.deleteMany({}); //Slet alle admin brugere.

  //Insert en hel masse data.
  const user = await addUser({
    email: "admin@admin.dk",
    name: "Hans Hansen",
    password: hashedPass,
  });

  try {
    await createPost({
      title: "En stille morgen ved Bodensøen",
      date: new Date("2024-08-15T12:00:00Z"),
      text: "Tidligt om morgenen, mens disen stadig lå lavt over Bodensøen, sad jeg med en kop kaffe på en lille bænk ved bredden. Der var næsten ingen mennesker. Kun lyden af vand, der skvulpede mod stenene, og et par ænder, der skændtes længere ude. \n Jeg havde forventet, at søen ville være smuk, men ikke så fredelig. Der er noget særligt ved at være det rigtige sted, før verden vågner. Det er som at få et glimt af noget ægte. \n Senere på dagen blev byen mere livlig, men morgenen forblev det mest mindeværdige. En stille oplevelse, midt i Europas travlhed.",
      likes: 0,
      comments: [],
      category: ["Tyskland", "Natur", "Søer"],
      img: [`${process.env.SERVER_HOST}/uploads/img01.jpg`],
    });
  } catch (error) {
    console.log(error.message);
  }

  await createPost({
    title: "En fredag i Istanbul",
    date: Date.now(),
    text: "Fredag i Istanbul begynder med duften af friskbrød og lyden af minareter, der kalder til bøn. Jeg gik fra Galata mod Sultanahmet, mens byen vågnede omkring mig – butikker åbnede, katte strakte sig i solen, og ældre mænd satte sig ved fortovscaféer med teglas, der klirrede. \n Jeg besøgte Den Blå Moské og Hagia Sophia, men det var udenfor, på pladsen mellem dem, jeg mærkede stemningen. En rolig respekt, en pause midt i storbyens puls. Senere købte jeg en simit og satte mig ved Bosporus-strædet, mens færgerne gled forbi. \n Istanbul er en by af kontraster – gamle mure og moderne liv. Vest og Øst. Et sted, hvor historien er lige under overfladen, hvis man tør mærke efter.",
    likes: 10,
    comments: [],
    category: ["Tyrkiet", "Kultur", "Byvandring"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img02.jpg`,
      `${process.env.SERVER_HOST}/uploads/img03.jpg`,
      `${process.env.SERVER_HOST}/uploads/img04.jpg`,
    ],
  });

  await createPost({
    title: "Seoul om natten",
    date: new Date("2024-10-11T12:00:00Z").getTime(),
    text: "Når solen går ned i Seoul, vågner byen op på en ny måde. Lysreklamerne blinker, og gyderne fyldes med duften af grillede kødspyd og krydrede supper. Jeg havde hørt om nattelivet her, men det var først, da jeg gik gennem Myeongdong efter mørkets frembrud, at jeg forstod hypen. \n Gadeboderne stod tæt – med alt fra kylling på pind til søde risboller og bubble tea. Jeg prøvede lidt af hvert og endte med at købe en alt for stærk kimchi-pancake, som jeg måtte skylle ned med en lokal sodavand. Musik strømmede ud fra butikkerne, og unge dansede foran små scener. \n Det var intenst, men på en god måde. Seoul er ikke en by, man bare ser. Man mærker den. Smager den. Og den smager af chili, sukker og elektricitet.",
    likes: 30,
    comments: [],
    category: ["Sydkorea", "Storby", "Madkultur", "Aftenliv"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img05.webp`,
      `${process.env.SERVER_HOST}/uploads/img06.jpg`,
    ],
  });

  await createPost({
    title: "en dag i Washington D.C",
    date: new Date("2024-12-15T12:00:00Z").getTime(),
    text: "Washington D.C. er en by, man føler sig lille i – ikke på grund af bygningernes størrelse, men på grund af historien, der hænger i luften. Jeg startede morgenen ved Lincoln Memorial, hvor trapperne fører op til en af de mest ikoniske statuer i USA. Det var tidligt, så der var næsten ingen mennesker – kun en skoleklasse og et par joggere.\n Herefter gik jeg ned ad National Mall og passerede mindesmærkerne for Vietnam og Korea. De rammer hårdere, end jeg havde regnet med. Ikke fordi jeg har nogen tilknytning – men fordi navnene virker uendelige. Det er svært ikke at stoppe op og tænke.\n Smithsonian-museerne er gratis og fyldt med viden – jeg nåede kun Air and Space Museum og National Museum of American History, men kunne have brugt dage der. Om aftenen så jeg Det Hvide Hus, omkranset af turister og sikkerhedsvagter. \n Washington D.C. er mere end politik – det er minder. Og det føles som om byen hele tiden minder én om, hvor man kommer fra, og hvad man tror på.",
    likes: 15,
    comments: [],
    category: ["USA", "Historie", "Storby"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img07.jpeg`,
      `${process.env.SERVER_HOST}/uploads/img08.jpg`,
    ],
  });

  await createPost({
    title: "Paris – mere end romantik og croissanter",
    date: new Date("2024-09-20T12:00:00Z").getTime(),
    text: "Det er nemt at tænke på Paris som en kliché: Eiffeltårnet, caféer, kunst og romantik. Men det er først, når man slentrer gennem de smalle gader i Marais og opdager en boghandel gemt bag en port, at byen virkelig åbner sig. \n Jeg boede på et lille hotel tæt ved Bastillen. Hver morgen gik jeg forbi et bageri, hvor duften af smør og brød fyldte gaden. Jeg købte min kaffe stående, som de lokale, og tog den med videre mod Seinen. \n Louvre var overvældende – jeg gik målrettet efter nogle få sale, og endte alligevel med at bruge timer der. Men det bedste øjeblik var om aftenen, da jeg sad på trappen foran Sacré-Cœur, med udsigt over byen og musikere, der spillede for småmønter og smil. \n Paris er ikke bare en storby. Den føles som et vævet tæppe af minder, musik, smag og blikke. Og uanset hvor mange billeder man tager, er det oplevelsen i øjeblikket, der sætter sig fast. \n",
    likes: 25,
    comments: [],
    category: ["Frankrig", "Kultur", "Mad"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img09.webp`,
      `${process.env.SERVER_HOST}/uploads/img10.jpg`,
    ],
  });

  await createPost({
    title: "Jerusalem – en gåtur gennem tusind år",
    date: new Date("2025-03-20T12:00:00Z").getTime(),
    text: "Jeg har aldrig været et sted, hvor fortid og nutid kolliderer så intenst som i Jerusalem. Den gamle bydel føles som et levende museum – men samtidig er det tydeligt, at folk lever deres helt almindelige liv midt i det ekstraordinære. \n Jeg gik ind gennem Jaffa-porten og lod mig føre gennem de snoede gader. Dufte af krydderier, friskbagt brød og røgelse blandede sig, mens stemmer lød på arabisk, hebraisk og engelsk. Jeg nåede Grædemuren først, hvor folk stod i stilhed, lænede panden mod stenen. Jeg vidste ikke, hvad jeg skulle føle – men jeg mærkede noget. \n Senere gik jeg op mod Gravkirken. Det er sjældent, man står et sted, der har betydning for milliarder af mennesker. Men her gør man det. Nogle bad. Andre græd. Jeg stod bare stille. \n Jeg drak kaffe i det armenske kvarter, spiste hummus i det muslimske, og snakkede med en kristen butiksejer om fred og håb. \n Jerusalem tvinger én til at tænke. På tro. På konflikt. På sammenhæng. Det er ikke en let by. Men den er vigtig. Og uforglemmelig.",
    likes: 50,
    comments: [],
    category: ["Religion", "Historie"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img11.jpg`,
      `${process.env.SERVER_HOST}/uploads/img12.jpg`,
    ],
  });

  await createPost({
    title: "Barcelona – mellem hav og historie",
    date: new Date("2025-05-25T12:00:00Z").getTime(),
    text:
      "Barcelona balancerer ubesværet mellem strandliv og storslået arkitektur. Jeg startede dagen med at cykle ned ad den palmeombruste promenade langs Barceloneta‑stranden, hvor morgenens første surfere allerede var i vandet. Saltduften hang i luften, blandet med lyden af måger og ringeklokker fra andre cyklister.\n" +
      "Kort tid efter stod jeg i skyggen af La Sagrada Família. Gaudís ufuldendte mesterværk rejser sig som et sandslot, og man kan bruge timer på at beundre de organiske former. Jeg købte billet til tårnet og så ud over byen: blå Middelhav, røde tage og grønne bjergskråninger i baggrunden.\n" +
      "Til frokost fandt jeg et tapas‑sted i El Born‑kvarteret: patatas bravas, padrón‑pebre og brød med tomat. Mens jeg spiste, spillede en gademusiker klassisk guitar i den brostensbelagte gyde.\n" +
      "Jeg sluttede dagen i Parc Güell, hvor mosaikbænke slynger sig som farverige slanger. Solen gik ned bag byen, og lyset gav keramikstykkerne et blødt skær. Barcelona føles som et udendørsgalleri, hvor hver gade er et lærred, og tiden går i siesta‑tempo.",
    likes: 5,
    comments: [],
    category: ["Spanien", "Arkitektur", "Strand"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img13.jpg`,
      `${process.env.SERVER_HOST}/uploads/img14.webp`,
    ],
  });

  await createPost({
    title: "Tokyo – orden i kaos",
    date: new Date("2025-05-15T12:00:00Z").getTime(),
    text:
      "Tokyo er en by, hvor tusind ting sker på én gang – men på en eller anden måde giver det hele mening. Jeg ankom til Shinjuku station, og det var som at træde ind i et urværk: mennesker i jakkesæt, skoleelever i uniformer, reklamer overalt, men ingen skubbede. Alt gled bare.\n" +
      "Om morgenen gik jeg i Meiji Jingu – en fredfyldt skov midt i byen. Man glemmer næsten, man er i en metropol. Senere besøgte jeg Harajuku, hvor mode, musik og ungdomskultur eksploderer i farver og lyde. Jeg købte en crepe med jordbær og flødeskum, mens cosplayede teenagere passerede forbi.\n" +
      "Om aftenen spiste jeg ramen i et lille hul-i-væggen‑sted i Shibuya. Kokken nikkede kort, og skålen blev sat foran mig, rygende varm. Udenfor blinkede neonlysene, og menneskestrømmen over det ikoniske Shibuya‑kryds virkede næsten hypnotisk.\n" +
      "Tokyo er både fremtid og tradition. Et sted hvor intet virker tilfældigt – og alt er muligt.",
    likes: 3,
    comments: [],
    category: ["Japan", "Storby", "Kultur"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img15.webp`,
      `${process.env.SERVER_HOST}/uploads/img16.jpg`,
    ],
  });

  await createPost({
    title: "Rom – lag på lag af historie",
    date: new Date("2024-05-10T12:00:00Z").getTime(),
    text:
      "I Rom føles hvert skridt som en rejse gennem tiden. Jeg begyndte min dag ved Colosseum, hvor morgensolen ramte stenene og gav dem et gyldent skær. Turister stimlede sammen, men der var alligevel en ro i at stå der, hvor gladiatorer engang kæmpede.\n" +
      "Jeg gik videre gennem Forum Romanum, og det slog mig, hvor mange lag byen består af. Oldtid, middelalder, renæssance – alt ligger ovenpå hinanden, som hvis historien aldrig blev slettet, kun tilføjet.\n" +
      "Til frokost satte jeg mig på en fortovscafé og bestilte en simpel pasta carbonara. Det var ægte – æggeblomme, pecorino og sort peber – intet andet. Smagene var kraftige, men ærlige. Præcis som byen.\n" +
      "Om aftenen kastede jeg en mønt i Trevi-fontænen, som traditionen foreskriver. Jeg ønskede ikke noget bestemt – bare at komme tilbage. For Rom er ikke noget, man besøger én gang. Det er et sted, man vender tilbage til, igen og igen.",
    likes: 0,
    comments: [],
    category: ["Italien", "Historie", "Mad"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img17.jpg`,
      `${process.env.SERVER_HOST}/uploads/img18.jpg`,
    ],
  });

  await createPost({
    title: "Kairo – støv, storhed og sjæl",
    date: new Date("2024-06-02T12:00:00Z").getTime(),
    text:
      "Kairo er overvældende. Ikke på den dårlige måde, men som et menneskehav, der aldrig holder op med at bevæge sig. Jeg ankom midt i myldretiden, og trafikken var en symfoni af horn og kaos – men også en slags rytme, man langsomt forstod.\n" +
      "Næste dag tog jeg til Giza. At stå foran pyramiderne er noget helt andet end at se dem i bøger. De er kolossale. Tunge af tid. Jeg red på en kamel rundt om dem, men det mest rørende var bare at sidde i sandet og se op på de takkede silhuetter mod den klare himmel.\n" +
      "Tilbage i byen spiste jeg koshari – en egyptisk comfort food – på et lokalt sted. Linser, ris, pasta og tomatsauce. Billigt og velsmagende. Bagefter gik jeg gennem Khan el-Khalili markedet. Duft af parfumeolier, støv af krydderier og stemmer overalt.\n" +
      "Kairo kræver noget af dig – men giver så meget igen. Det er en by med sjæl, hvis man tør give den tid.",
    likes: 10,
    comments: [],
    category: ["Egypten", "Historie", "Markeder"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img19.jpg`,
      `${process.env.SERVER_HOST}/uploads/img20.webp`,
    ],
  });

  await createPost({
    title: "New York – byen der aldrig sover",
    date: new Date("2024-01-30T12:00:00Z").getTime(),
    text:
      "New York er en larmende, lysende, levende organisme. Jeg ankom om aftenen, og allerede da jeg stod i kø til en hotdog under Times Square’s blinkende skærme, forstod jeg: Det her er en by, der lever hele døgnet.\n" +
      "Næste morgen tog jeg subway'en til Brooklyn og gik over Brooklyn Bridge. Solen stod lavt over Manhattan, og byen foran mig glitrede som et løfte. I Dumbo drak jeg kaffe i en hip café og lyttede til folk snakke om startups, kunst og politik.\n" +
      "Jeg brugte eftermiddagen i Central Park, hvor børn spillede bold og gadeartister dansede. Det var et pusterum midt i al larmen.\n" +
      "Om aftenen spiste jeg pizza i East Village og gik til jazz i en kælderbar. Musikken var intens og ægte. Ligesom byen selv. New York er ikke én ting – den er tusind. Og hver person finder sin egen version.",
    likes: 8,
    comments: [],
    category: ["USA", "Storby", "Kultur"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img21.webp`,
      `${process.env.SERVER_HOST}/uploads/img22.webp`,
    ],
  });

  await createPost({
    title: "Athen – solen over ruinerne",
    date: new Date("2024-06-20T12:00:00Z").getTime(),
    text:
      "Athen overraskede mig. Jeg havde forventet ruiner og historie – men ikke så meget liv. Allerede første dag, da jeg gik gennem gaderne i Plaka, mærkede jeg det: små caféer, lyden af bouzouki, duften af grillet kød og frisk oregano.\n" +
      "Jeg besteg Akropolis i stegende varme. Stenene glødede, og Parthenon ragede op mod den blå himmel. Udsigten over byen tog pusten fra mig. Det var som at kigge ud over både fortid og nutid på én gang.\n" +
      "Til frokost fik jeg souvlaki og tzatziki, og det smagte som noget, en bedstemor kunne have lavet. Senere sad jeg i skyggen under oliventræer og læste i en bog om græsk filosofi – fordi det føltes rigtigt.\n" +
      "Athen er ikke perfekt. Den er støvet og rå. Men den føles ægte. En by med rødder dybere end næsten nogen anden.",
    likes: 7,
    comments: [],
    category: ["Grækenland", "Historie", "Mad"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img23.jpg`,
      `${process.env.SERVER_HOST}/uploads/img24.jpg`,
    ],
  });

  await createPost({
    title: "Lissabon – byen på bakkerne",
    date: new Date("2025-03-10T12:00:00Z").getTime(),
    text:
      "Lissabon er en by, hvor man går op og ned. Bogstaveligt. De brostensbelagte gader snor sig op ad stejle bakker, og hvert sving giver en ny udsigt over Tejo-floden og røde tegltage.\n" +
      "Jeg tog sporvogn 28 og lod den slingre mig gennem byen. Den hvinede rundt om hjørner, og undervejs så jeg facader dækket af farvede kakler og vasketøj hængt til tørre mellem altanerne.\n" +
      "Jeg spiste bacalhau til frokost og en pastel de nata til dessert. Den var lun, med karameliseret top og sprød bund. Perfekt.\n" +
      "Om aftenen gik jeg til et lille fado‑sted i Alfama. Musikken var melankolsk og ærlig – den ramte noget dybt. En kvinde sang, som om hun kendte ens inderste tanker.\n" +
      "Lissabon føles som en by, der smiler gennem tårer. Og det gør den smuk.",
    likes: 36,
    comments: [],
    category: ["Portugal", "Musik", "Kultur"],
    img: [
      `${process.env.SERVER_HOST}/uploads/img25.jpg`,
      `${process.env.SERVER_HOST}/uploads/img27.jpg`,
    ],
  });

  await mongoose.disconnect(); //Bare for at vente til funktionen er færdig.
}

setup();

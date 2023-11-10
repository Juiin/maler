/* global Infinity */

var express = require('express');
var app = express();
var serv = require('http').Server(app);
 
app.get('/',function(req, res) {
    res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
 
var PORT = process.env.PORT || 11158;
serv.listen(PORT);
console.log("Maler server started. Port: 11158");

var SOCKET_LIST = {};
var ROOM_LIST = [];
ROOM_LIST[0] = new Room("default", "" , 999 , true);
var DEBUG = true;
var WORD_LIST = ["flasche","flugzeug","flur","frau","fussball","gabel","ärger","Abend","Abfahrt","Abflug","Absender","Adresse","Alkohol","Ampel","Anfang","Angebot","Angestellte","Angst","Ankunft","Anmeldung","Anrufbeantworter","Ansage","Anschluss","Antwort","Anzeige","Apotheke","Appartement","Appetit","April","Arbeitsplatz","Arm","Arzt","Aufenthalt","Aufgabe","Auge","Ausbildung","Ausflug","Auskunft","Ausländer","Aussage","Ausstellung","Ausweis","Automat","Bäckerei","Büro","Baby","Bad","Bahnhof","Balkon","Banane","Bank","Batterie","Baum","Beamte","Beispiel","Benzin","Beratung","Berg","Beruf","Berufsschule","Besuch","Betrag","Bewerbung","Bild","Bitte","Bleistift","Blick","Blume","Bluse","Blut","Bohne","Brötchen","Brücke","Brief","Briefkasten","Briefmarke","Brieftasche","Brille","Brot","Bruder","Buch","Buchstabe","Cafe","CD","Creme","Dach","Dank","Dauer","Dezember","Ding","Disco","Doppelzimmer","Dorf","Durchsage","Durst","Dusche","E-Mail","Ecke","Ei","Einführung","Eingang","Einladung","Eintritt","Einwohner","Einzelzimmer","Eltern","Empfang","Ende","Enkel","Entschuldigung","Erdgeschoss","Erfahrung","Ergebnis","Erlaubnis","Ermässigung","Erwachsene","Fähre","Führerschein","Führung","Fabrik","Fahrer","Fahrkarte","Fahrplan","Fahrrad","Familie","Familienname","Farbe","Fax","Ferien","Fernsehgerät","Feuerzeug","Fieber","Firma","Fleisch","Flughafen","Formular","Foto","Frühjahr","Frühling","Frühstück","Frage","Freizeit","Friseur","Frist","Fundbüro","Garage","Gas","Gast","Geburtstag","Gegenteil","Geld","Geldbörse","Gemüse","Gepäck","Geschäft","Geschwister","Gesicht","Gespräch","Gesundheit","Getränk","Gewicht","Gewitter","Glück","Glückwunsch","Glas","Gleis","Grösse","Grippe","Gruss","Grundschule","Gruppe","Guthaben","Haar","Halle","Hals","Haltestelle","Hand","Handtuch","Handy","Hausaufgabe","Hausfrau","Haushalt","Hausmann","Heimat","Hemd","Herbst","Herd","Herr","Hilfe","Hobby","Holz","Hunger","Idee","Import","Industrie","Inhalt","Jacke","Job","Jugendherberge","Jugendliche","Käse","Körper","Küche","Kündigung","Kaffee","Kamera","Kanne","Kartoffel","Kasse","Kassette","Kassettenrecorder","Keller","Kenntnisse","Kennzeichen","Kette","Kfz","Kind","Kindergarten","Kino","Kiosk","Klasse","Kleid","Kleidung","Kneipe","Koffer","Kollege","Kollegin","Konsulat","Konto","Kontrolle","Kosmetik","Krankenkasse","Kredit","Kuchen","Kugelschreiber","Kurs","Lösung","Laden","Land","Landschaft","Lebensmittel","Leid","Lehre","Leute","Licht","Lied","Lohn","Lokal","Lust","Möbel","Müll","Magen","Mantel","Material","Mechaniker","Mehrwertsteuer","Meinung","Menge","Metall","Miete","Milch","Minute","Mittag","Mitte","Mitteilung","Mittelschule","Mittwoch","Mode","Moment","Monat","Morgen","Motor","Museum","Nähe","Nachbar","Nachmittag","Nachrichten","Name","Natur","Nebel","Norden","Notarzt","Notfall","Notiz","Nudel","Nummer","Ober","Obst","Oktober","Operation","Ordnung","Ort","Osten","Päckchen","Paket","Panne","Papier","Parfüm","Park","Partei","Partner","Party","Pause","Plan","Plastik","Platz","Pommes","Portion","Postleitzahl","Prüfung","Praktikum","Praxis","Preis","Problem","Programm","Prospekt","Qualität","Quittung","Rabatt","Radio","Rathaus","Raucher","Raum","Realschule","Rechnung","Regen","Reinigung","Reisebüro","Reiseführer","Reparatur","Restaurant","Rezept","Rezeption","Rind","Rundgang","Süden","Sache","Saft","Salat","Salz","Satz","Schüler","Schalter","Schlüssel","Schluss","Schmerzen","Schwein","Schwester","Schwimmbad","See","Sehenswürdigkeit","Seife","Sekretärin","Sekunde","Sendung","Senioren","Service","Sessel","Sofa","Sohn","Sommer","Sonderangebot","Sonne","Sorge","Spülmaschine","Spass","Spaziergang","Speisekarte","Spielplatz","Sprache","Sprachschule","Sprechstunde","Stück","Stadt","Standesamt","Stoff","Streichholz","Strom","Student","Studentin","Studium","Stunde","Supermarkt","Suppe","Tür","Tüte","Tankstelle","Tasche","Teil","Termin","Test","Text","Thema","Ticket","Tipp","Tochter","Tomate","Topf","Tourist","Treppe","Trinkgeld","U-Bahn","Unfall","Unterhaltung","Unterkunft","Unterricht","Unterschied","Unterschrift","Untersuchung","Urlaub","übernachtung","Vater","Verbindung","Verkäufer","Verkehr","Vermieter","Versicherung","Verspätung","Vertrag","Video","Vormittag","Vorname","Vorsicht","Vorwahl","Wäsche","Wagen","Weg","Wein","Welt","Werkstatt","Werkzeug","Westen","Wetter","Wiedersehen","Woche","Wochenende","Wochentag","Wohnung","Wolke","Wort","Wunsch","Wurst","Zahl","Zeitschrift","Zeitung","Zentrum","Zettel","Zeugnis","Zigarette","Zimmer","steuer","strudel","taste","tokio","verband","washington","wirtschaft","zelle","zylinder","wind","stift","tau","ton","verein","wolkenkratzer","zentaur","zahn","winnetou","stock","superheld","teleskop","tor","viertel","watt","wurf","zitrone","zeit","wand","strand","tafel","tempo","torte","vorsatz","weide","würfel","zoll","wanze","straße","tag","theater","turm","wald","welle","wurm","zug","umzug","tod","takt","toast","uhr","tanz","pass","pinguin","prinzessin","rolle","saturn","schiff","schnur","spion","peitsche","pirat","punkt","riegel","rom","schokolade","shakespeare","staat","peking","pistole","pyramide","römer","schale","schirm","schotten","siegel","stadion","pension","platte","quartett","riese","rost","schlange","schuh","skelett","stamm","pferd","po","quelle","ring","roulette","scheibe","schloss","schule","soldat","stempel","pflaster","rasen","ritter","rücken","schein","schnee","schuppen","spiel","stern","pilot","raute","rock","rute","schelle","schneemann","seite","spinne","krankenhaus","kunde","leim","löffel","matte","mikroskop","mühle","netz","öl","krankheit","lager","maler","maus","millionär","mund","new york","oper","krebs","lakritze","limousine","london","mandel","meer","mini","muschel","niete","optik","kreis","laser","linie","lösung","mangel","melone","mittel","mutter","ninja","orange","kreuz","laster","linse","löwe","mark","messe","moos","nacht","note","krieg","leben","loch","luft","maschine","messer","morgenstern","nadel","nuss","krone","lehrer","loch ness","mast","moskau","nagel","oktopus","geist","glocke","grund","hase","honig","hut","käfer","karte","könig","genie","glück","gürtel","haupt","horn","indien","kamm","kasino","kirche","königin","gericht","gold","gut","heide","horst","inka","kanal","kater","kiwi","konzert","geschirr","golf","hahn","hering","hotel","jäger","känguruh","katze","knie","korb","geschoss","grad","hamburger","herz","hubschrauber","jahr","kapelle","kerze","knopf","korn","gras","himalaja","hund","jet","kapitän","ketchup","koch","kraft","griechenland","harz","hollywood","hupe","jura","karotte","kiefer","kohle","bindung","bremse","chor","dieb","eis","fest","fleck","fuchs","blatt","bombe","dame","dietrich","elfenbein","fackel","figur","fliege","funken","blau","boot","bulle","daumen","dinosaurier","england","fall","film","flöte","fuß","blinker","börse","burg","decke","doktor","ente","fallschirm","finger","flügel","futter","blüte","botschaft","busch","demo","drache","erde","feder","fisch","bock","boxer","deutschland","drossel","feige","fläche","forscher","gehalt","bogen","brause","china","drucker","dichtung","essen","fessel","frankreich","ladung","mond","leiter","wal","star","tisch","feuer","pfeife","brücke","gang","gift","iris","taucher","elf","bergsteiger","tausch","bund","hexe","läufer","einhorn","koks","roboter","mine","lippe","satellit","schild","olymp","brand","schnabeltier","abgabe","absatz","adler","afrika","ägypten","akt","alien","amerikaner","antarktis","anwalt","apfel","atlantis","atlas","auflauf","aufzug","ausdruck","australien","back","bande","bar","bär","bart","bau","bauer","bayern","becken","bett","TITANIC","COMPUTER","ABSTURZ","MAGAZIN","ZUFALL","CYBERSEX","KOSTENPFLICHTIG","KREDITKARTE","EISENBAHN","KRATZER","ARBEITSINSTRUMENT","AUSBLICK","NASENSCHLEIM","GANGSCHALTUNG","OPFER","REIS","ESSSTäBCHEN","LIEGESTUHL","STROHHALM","LAWINE","WEINTRAUBE","DATENVERARBEITUNG","PORZELLAN","AKTIE","QUALLE","MARATHON","PFERDERENNEN","ORCHESTER","NATURKATASTROPHE","KAPITAL","POST","DATENBANK","PFANNE","MAUSTASTE","HANDBUCH","VITAMINE","FEUERWEHR","PROTOKOLL","KALENDER","TELEFON","ANANAS","HALLO","KILOMETER","WURSTSALAT","POLIZEI","SCHWARZMARKT","PENISOPERATION","LÖFFEL","MAISKOLBEN","KIPPE","BIER","TATSACHE","ARSCHGESICHT","EISTEE","OBERAFFENMEGAGEIL","RABE","PARANOID","SCHLAFWANDLER","BLIND","EGAL","ARZTHELFER","KNOCHEN","BRECHEN","LACHEN","ENTSCHEIDUNG","BALLON","LIEBE","REDEN","HAUS","BAUMSTAMM","AQUARIUM","WECHSELGELD","KELLNER","WÖRTERBUCH","ZEBRA","KOFFERRAUM","FLUGZEUGABSTURZ","PAPST","KATZENKLO","ZIELPUNKT","FEHLER","MATHEMATIK","MORD","WUNDER","BODEN","STRASSENBAHN","COMPUTERSPIEL","MITTERNACHT","GOLDFISCH","HAMSTER","PAPRIKA","SCHIMMEL","KASTEN","GURKE","OBSTSALAT","VORHANG","SPüLMITTEL","LATEIN","DEUTSCH","ZEICHNEN","TURNEN","BIOLOGIE","CHEMIE","PHYSIK","GEOGRAFIE","RELIGION","PSYCHOLOGIE","SCHNITZEL","ALPHABET","PULLOVER","JEANS","WEIHNACHTEN","BIENE","SEESTERN","SAND","LEXIKON","WACHSEN","LESEN","DENKEN","MüDE","BüHNE","TISCHDECKE","UNKRAUT","TEPPICH","UMGEBUNG","ASCHENBECHER","ZIGARETTEN","FENSTER","WINTER","SONNENSCHEIN","SCHATZ","ENGEL","ZWERG","KINDERWAGEN","AUTO","HINZUFüGEN","ANZAHL","ANSCHLAG","HAMMER","VOGEL","SCHRAUBE","ROSE","HOSE","HIER","KLEIN","ALLIANZ","APFELSAFT","NOTEBOOK","BRIEFUMSCHLAG","TASCHENTUCH","KARTON","RECHTSANWALT","KABEL","WEIHNACHTSBAUM","LICHTERKETTE","LAMPE","GUMMIBAND","SCHRANK","BüROKLAMMER","UNIVERSITäT","KOPF","BEIN","SPORT","BALL","DRAHTLOS","CHEF","PFADFINDER","FEüRMELDER","KLASSENZIMMER","STUHL","TOILETTE","TELEFONNUMMER","AUTOHäNDLER","WASSER","UHRZEIT","GESCHENK","HANDTASCHE","VENTILATOR","HEIZUNG","RüCKEN","ENERGIE","STOCKWERK","MARKT","KREUZWORTRäTSEL","INTERNET","TASSE","KüHLSCHRANK","TELLER","MEDIKAMENT","MANN","VIRUS","SCHORNSTEIN","ZIEGELSTEIN","ZIMT","ZUCKER","MARMELADE","SCHINKEN","BUTTER","MUSIK","TROMPETE","GARTEN","RUDER","GITTER","GEFäNGNIS","HäFTLING","REISE","BAHN","SCHIENE","BUNDESWEHR","ZIVILDIENST","FEIERABEND","STERNSCHNUPPE","BOCKWURST","AUTOPILOT","LASSO","SCHATTEN","PIRATENSCHIFF","TASCHENRECHNER","STAMMBAUM","HERDE","BILDSCHIRM","JAGDHUND","FLUCH","STORCH","KLAMOTTEN","STIER","ZWILLING","JUNGE","MäDCHEN","NASENBäR","GIROKONTO","DARSTELLUNG","EINZELSPIELER","BUSHALTESTELLE","DAMPFSCHIFFFAHRT","DATUM","HOCHZEIT","RAT","STYLIST","AZUBI","STRATEGIE","SINNLOS","CHAOS","PROFI","SPIDERMAN","COOL","GALGEN","KARTENSPIEL","TAXI","KNABBERN","GARTENZWERG","CLOWN","ASOZIAL","HENKER","ZAHNPASTA","ZAHNSCHMERZEN","STATISTIKEN","UNTERWASSERHÖHLE","KUNST","KARTEN","WASCHMASCHINE","STROMKREIS","GITARRE","ROCKBAND","SCHLAGZEUG","WAHNSINN","SCHEIBENWISCHER","SäNGER","MITTELALTER","WASSERPISTOLE","WELTMEISTERSCHAFT","BUNDESTAG","FASZINATION","MENSCH","HOFFNUNG","FREIHEIT","WITZ","EINFACH","BRATWURSTBRATGERäT","KOPFHÖRER","LESELAMPE","BILDERRAHMEN","TENNISSCHLäGER","SCHEISSE","LACHKRAMPF","TODESSTERN","VETO","GOOGLE","KAUGUMMI","ZIEGE","ZUCKERWATTE","BLÖDSINN","CHAT","EREKTION","DIEBSTAHL","LACH","GABELSTAPLER","POKER","MEISTER","HOCHWASSER","INFORMATION","ZUNEIGUNG","HASS","IMMER","KRASS","ALTER","IMPFSTOFF","KOCHSALZ","KONTAKT","SANDMäNNCHEN","MARIENKäFER","TIER","GRILLE","SCHOKOLADENPUDDING","WOLF","BIRNE","SCHNUPFEN"];
var WORD_LIST_POE = ["molten shell","puncture","discharge","animate weapon","arctic armour","barrage","bear trap","blade blast","blade flurry","blade vortex","bladefall","blast rain","blink arrow","Blood Rage","Burning Arrow","Caustic Arrow","Charged Dash","Cobra Lash","Cremation","Cyclone","Dash","Desecrate","Detonate Dead","Double Strike","Dual Strike","Elemental Hit","Ethereal Knives","Explosive Arrow","Explosive Trap","Fire Trap","Flamethrower Trap","Flicker Strike","Frenzy","Frost Blades","Galvanic Arrow","Grace","Haste","Hatred","Herald of Agony","Herald of Ice","Ice Shot","Ice Trap","Lacerate","Lancing Steel","Lightning Arrow","Lightning Strike","Mirror Arrow","Pestilent Strike","Phase Run","Plague Bearer","Rain of Arrows","Reave","Scourge Arrow","Seismic Trap","Shattering Steel","Siege Ballista","Smoke Mine","Spectral Shield Throw","Spectral Throw","Split Arrow","Summon Ice Golem","Temporal Chains","Tornado Shot","Toxic Rain","Unearth","Viper Strike","Volatile Dead","Whirling Blades","Wild Strike","Withering Step","Abyssal Cry","Ancestral Protector","Ancestral Warchief","Animate Guardian","Berserk","Bladestorm","Blood and Sand","Chain Hook","Cleave","Consecrated Path","Decoy Totem","Dominating Blow","Dread Banner","Earthquake","Enduring Cry","Flesh and Stone","Glacial Hammer","Ground Slam","Heavy Strike","Herald of Ash","Herald of Purity","Holy Flame Totem","Ice Crash","Immortal Call","Infernal Blow","Leap Slam","Molten Strike","Perforate","Rallying Cry","Searing Bond","Shield Charge","Shockwave Totem","Smite","Static Strike","Steelskin","Summon Flame Golem","Summon Stone Golem","Sunder","Sweep","Tectonic Slam","Vigilant Strike","Vulnerability","War Banner","Arc","Arctic Breath","Armageddon Brand","Assassins Mark","Ball Lightning","Bane","Blight","Bodyswap","Bone Offering","Brand Recall","Cold Snap","Conductivity","Contagion","Conversion Trap","Convocation","Dark Pact","Despair","Divine Ire","Enfeeble","Essence Drain","Fireball","Firestorm","Flame Dash","Flame Surge","Flameblast","Flammability","Flesh Offering","Freezing Pulse","Frost Bomb","Frost Wall","Frostblink","Frostbolt","Glacial Cascade","Herald of Thunder","Ice Nova","Ice Spear","Icicle Mine","Incinerate","Kinetic Blast","Kinetic Bolt","Lightning Spire Trap","Lightning Tendrils","Lightning Trap","Lightning Warp","Magma Orb","Orb of Storms","Power Siphon","Purifying Flame","Pyroclast Mine","Raise Spectre","Raise Zombie","Righteous Fire","Scorching Ray","Shock Nova","Siphoning Trap","Soulrend","Spark","Spellslinger","Spirit Offering","Storm Brand","Storm Burst","Storm Call","Stormbind","Stormblast Mine","Summon Carrion Golem","Summon Chaos Golem","Summon Holy Relic","Summon Lightning Golem","Summon Raging Spirit","Summon Skeletons","Summon Skitterbots","Tempest Shield","Vortex","Wave of Conviction","Winter Orb","Wither","karui ward","stone of lazhwar","daressos salute","astramentis","eye of chayula","biscos collar","volls devotion","xophs heart","impresence","yoke of suffering","gloomfang","darkness enthroned","string of servitude","meginords girdle","wurms molt","belt of the deceiver","biscos leash","ryslathas coil","headhunter","soultether","cyclopean coil","doedres damning","kaoms sign","pyre","emberwake","call of the brotherhood","dream fragments","le heup of all","loris lantern","thiefs torment","essence worm","ventors gamble","stormfire","drillneck","maloneys mechanism","rigwalds quills","soul strike","deaths oath","kaoms heart","bronns lithe","queen of the forest","hyrris ire","the perfect form","skin of the lords","tabula rasa","soul mantle","the coming calamity","vis mortis","shavronnes wrappings","gruthkuls pelt","belly of the beast","lightning coil","daressos defiance","volls protector","loreweave","cloak of defiance","victarios influence","carcass jack","the eternity shroud","inpulsas broken heart","tinkerskin","shroud of the lightless","kaoms roots","seven-league step","abberaths hooves","goldwyrm","atziris step","wanderlust","bones of ullr","rainbowstride","skyforth","lochtonial caress","atziris acuity","maligaros virtuosity","hrimsorrow","oskarm","tombfist","haemophilia","shapers touch","facebreaker","the baron","abyssus","goldrim","rats nest","starkonjas head","alphas howl","rime gaze","scolds bridle","indigon","devotos devotion","bringer of rain","lightpoacher","the three dragons","the gull","heretics veil","lycosidae","atziris reflection","eshs mirror","aegis aurora","rise of the phoenix","prism guardian","the screaming eagle","soul taker","ngamahus flame","sinvictas mettle","atziris disfavour","quill rain","storm cloud","deaths harp","iron commander","chin sol","voltaxic rift","wind ripper","lioneyes glare","Hand of wisdom and action","touch of anguish","binos kitchen knife","brightbeak","mjölner","marohi erqi","brutus lead sprinkler","bitterdream","montreguls grasp","the searing touch","agnerod north","pillar of the caged god","the whispering ice","tremor rod","sire of shards","cane of unravelling","pledge of hands","oni-goroshi","prismatic eclipse","scaeva","ichimonji","the saviour","varunastra","dreamfeather","ahns might","paradoxica","cospris malice","the dancing dervish","oros sacrifice","starforge","lifesprig","the poets pen","obliteration","shimmeron","void battery","the writhing jar","the wise oak","taste of hate","lions roar","bottled faith","witchfire brew","dying sun","vessel of vinktar","grand spectrum","inspired learning","intuitive leap","hall of grandmasters","mao kun","poorjoys asylum","the beachhead","the putrid cloister","the perandus manor","untainted paradise","vaults of atziri","chaos orb","exalted orb","orb of fusing","scroll of wisdom","orb of alteration","sirus","elder","shaper","minotaur","chimera","hydra","pheonix","ignite","freeze","shock","maim","trickster","necromancer","elementalist","inquisitor","chieftain","juggernaut","berserker","slayer","scion","champion","gladiator","raider","pathfinder","deadeye","assassin","saboteur","occultist","guardian","hierophant","logout","orb of chance","mirror of kalandra","sextant","atlas","map","divination card","scarab","fossil","essence","abyss","legion","perandus","waypoint","portal","mtx","zana","niko","alva","jun","einhar","hollow palm technique","shrine","rogue exile","torment","vaal orb","aura bot","cadiro","jewel","elreon","haku","drop bear","devourer","corrupted blood","bleeding","curse","influence","power charge","frenzy charge","endurance charge","azurite","phasing","onslaught","jewel socket","passive skill tree","keystone","chaos innoculation","mind over matter","acrobatics","Vaal Pact","Blood Magic","Resolute Technique 	","Elemental Overload","Pain Attunement","Zealots Oath","Eldritch Battery","ghost reaver","unwavering stance","Ancestral Bond","avatar of fire","conduit","crimson dance","elemental equilibrium","iron reflexes","minion instability","perfect agony","point blank","wicked ward","inventory","vendor recipe","accuracy","resistance","evasion","armour","mana","temple of atzoatl","menagerie","labyrinth","izaro","lich","chromatic orb","six link","corruption altar","safehouse","mastermind","dweller of the deep","hellrake","fairgraves","merveil","vaal","alira","oak","kraityn","vaal","trial of ascendancy","piety","dominus","general gravicius","the dried lake","blood aqueduct","daresso","kaom","malachai","kitava","innocence","sin","brine king","hillock","arakaali","greust","solaris temple","maligaro","shavronne","simulacrum","breachstone","stash","currency","itemlevel","ancient orb","catalyst","horizon orb","orb of annulment","offering to the goddess","resonator","breach","talisman","Advanced Traps Support","Arrow Nova Support","Barrage Support","Cast On Critical Strike Support","Cast on Death Support","Chain Support","Close Combat Support","Cluster Traps Support","Culling Strike Support","Enhance Support","Faster Attacks Support","Faster Projectiles Support","Fork Support","Greater Multiple Projectiles Support","Greater Volley Support","Hypothermia Support","Impale Support","Lesser Multiple Projectiles Support","Mana Leech Support","Mirage Archer Support","Pierce Support","Poison Support","Second Wind Support","Slower Projectiles Support","Trap and Mine Damage Support","Trap Support","Volley Support","Ancestral Call Support","Ballista Totem Support","Blood Magic Support","Bloodlust Support","Brutality Support","Cast on Melee Kill Support","Cast when Damage Taken Support","Cold to Fire Support","Damage on Full Life Support","Elemental Damage with Attacks Support","Empower Support","Endurance Charge on Melee Stun Support","Fire Penetration Support","Fortify Support","Generosity Support","Inspiration Support","Iron Grip Support","Iron Will Support","Knockback Support","Less Duration Support","Life Gain on Hit Support","Life Leech Support","Maim Support","Melee Splash Support","Multiple Totems Support","Multistrike Support","Pulverise Support","Rage Support","Ruthless Support","Spell Totem Support","Added Chaos Damage Support","Added Lightning Damage Support","Arcane Surge Support","Archmage Support","Blasphemy Support","Bonechill Support","Cast when Stunned Support","Cast while Channelling Support","Charged Mines Support","Combustion Support","Concentrated Effect Support","Controlled Destruction Support","Curse On Hit Support","Deathmark Support","Decay Support","Efficacy Support","Elemental Army Support","Elemental Focus Support","Elemental Proliferation Support","Energy Leech Support","Enlighten Support","Faster Casting Support","Feeding Frenzy Support","High-Impact Mine Support","Ignite Proliferation Support","Immolate Support","Increased Area of Effect Support","Increased Critical Damage Support","Increased Critical Strikes Support","Infernal Legion Support","Infused Channelling Support","Innervate Support","Intensify Support","Item Rarity Support","Lightning Penetration Support","Meat Shield Support","Minefield Support","Minion Damage Support","Minion Life Support","Minion Speed Support","Physical to Lightning Support","Power Charge On Critical Support","Spell Cascade Support","Spell Echo Support","Summon Phantasm Support","Unleash Support","vaal spark","vaal earthquake"];
var WORD_LIST_RIKAIDO = ["Anki","Immersion","AJATT","Refold","Migaku","Matt vs Japan","Brit vs Japan","Sentence Mining","Leech","Intermediate Plateau","Project Uproot","Pitch Accent","Tolerating Ambiguity","Devoicing","YOGA","Tae Kim","Cure Dolly","Genki","ara ara","yare yare","kansaiben","nihongo jouzu","shou ga nai","shoubu pantsu","omae wa mou shinderu","nani","pokemon getto daze","myanimelist","learnnatively","memento","yoasobi","r/learnjapanese","hikikomori","nukige","duolingo","jpdb","jlpt","kanken","steve kaufmann","dame","kaizokuou ni ore wa naru","shinjitsu wa itsumo hitotsu","terrace house","output","input","zettai ryouiki","jidouhanbaiki","vocab cards","sentence cards","grammar","freeflow","extensive reading","ttsu reader","textractor","visual novel","light novel","anime","isekai","shounen","shoujo","anki streak","furigana","kanji","jisho","one piece","dragon ball","attack on titan","oregairu","murakami","nyaa","yoroshiku","mental dictionary entry","ikigai","tatemae","honne","karoushi","rtk","heisig","yugioh","conan","baka","neon genesis evangelion","naruto","rikaido","fire punch","hen na ie","stroke order","Khatzumoto","kore kara podcast","livakivi","abroad in japan","dogen","kanjieater","nyanpassu","ghibli","jojo","demon slayer","chainsaw man","your name","manga","mokuro","themoeway","morphman","pomodoro","subs2srs","mushoku tensei","Shadowing","italki","hellotalk","yotsubato","steven krashen","i+1 sentence","comprehensible input","yomichan","frequency list","ocr","satori reader","aussieman","vtuber","kindle","whitenoising","comprehension","passive listening","berserk","hiragana","katakana","kitsunekko","deepL","DoJG","hentai","otaku","at field","heiban","seppuku","harakiri","yojijukugo","nakadashi","shotacon"];
PRELOBBYROOM = new Room("prelobby","", 999, true);



//SOCKET
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
var io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
    socket.id = Math.random();
    socket.username = "";
    SOCKET_LIST[socket.id] = socket;
    socket.room = PRELOBBYROOM;
    //DEBUG
    socket.on("evalServer",function(data){
        if(!DEBUG)
            return;
        var res = eval(data);
        socket.emit("evalAnswer",res);     
    });
    
    
    //Signing In/Out///////////////////////////////////////////
    socket.on("signIn",function(data){
            if(isUsernameTaken(data)){
                socket.emit("signInResponse",{success:false});     
            } else {
                socket.username = data.username;
                socket.emit("joinRoom",0,"");
                socket.emit("signInResponse",{success:true});
            }
    });
    socket.on("disconnect",function(){
        delete SOCKET_LIST[socket.id];
        delete socket.room.playerList[socket.id];
        refreshUserChat(socket.room);
        refreshUserChatIngame(socket.room);
        if(socket.username !== ""){
            for(var i in socket.room.playerList){
                socket.room.playerList[i].emit("addToChat",socket.username+" has left!");
            }
        }
        refreshRoomList();
    });
    //Chat /////////////////////////////////////////////////
    socket.on("chatToEveryone",function(data){
        for(var i in socket.room.playerList){
            socket.room.playerList[i].emit("addToChat",socket.username + ": " + data);
        }
        
        if(socket.room.hasStarted){
            if(socket.room.gameMode === "teams"){
                var playerTeam = getPlayerObj(socket.room,socket.username).team;
                if(((playerTeam === "blue" && socket.room.turn === 0) || (playerTeam === "red" && socket.room.turn === 1)) && socket.username !== socket.room.currentDrawer){
                   if(data.toLowerCase() === socket.room.currentWord.toLowerCase()){
                       var word = data;
                       word = word.toLowerCase();
                       word = word.charAt(0).toUpperCase() + word.slice(1);
                       for(var i in socket.room.playerList){
                            socket.room.playerList[i].emit("addToChat","Point for " + playerTeam + ". " + word + " was correct.");
							socket.room.playerList[i].emit("wordCorrectSound");
                       }
                       socket.room.score[socket.room.turn]++;
                       nextWord(socket.room);
                       refreshInfo(socket.room);
                       refreshUserChatIngame(socket.room);
                   } 
                }
            }else if(socket.room.gameMode === "ffa"){
                var playerObj = getPlayerObj(socket.room,socket.username);
                if(socket.username !== socket.room.currentDrawer){
                    if(data.toLowerCase() === socket.room.currentWord.toLowerCase()){
                       var word = data;
                       word = word.toLowerCase();
                       word = word.charAt(0).toUpperCase() + word.slice(1);
                       for(var i in socket.room.playerList){
                            socket.room.playerList[i].emit("addToChat","Point for " + socket.username + ". " + word + " was correct.");
							socket.room.playerList[i].emit("wordCorrectSound");
                       }
                       playerObj.score += socket.room.timeRemaining;
                       var drawerPlayerObj = getPlayerObj(socket.room,socket.room.currentDrawer);
                       drawerPlayerObj.score += socket.room.timeRemaining;
                       socket.room.timeRemaining = socket.room.timeSetting;
                       nextTurn(socket.room);
                       refreshInfo(socket.room);
                       refreshUserChatIngame(socket.room);
                    }
                }
            }
            
        }
    });
    
    //ROOMS ///////////////////////////////////////////////
    socket.on("joinRoom",function(data,pw){
        if(pw === ROOM_LIST[data].password){
            socket.emit("toggleRoomList",ROOM_LIST[data].name);
        
            //Leave Old Room
            delete socket.room.playerList[socket.id];
            refreshUserChat(socket.room);
            refreshUserChatIngame(socket.room);
            joinLeaveMessage("leave", socket.room, socket.username, socket);
            //Join New Room
            ROOM_LIST[data].playerList[socket.id] = socket;
            socket.room = ROOM_LIST[data]; 
            joinLeaveMessage("join", socket.room, socket.username, socket);
            refreshUserChat(socket.room);
            refreshUserChatIngame(socket.room);
            refreshRoomName(socket);
            if(socket.room.hasStarted){
                socket.emit("startGame");
                refreshInfo(socket.room);
                refreshGeneralInfo(socket.room);
            }
            refreshRoomList();
        }else{
            socket.emit("enterRoomPassword",data);
        }
    });
    
    socket.on("createRoom", function(name, pw,gameMode,selectedTimeToDraw,selectedWordList,customWordList){
        var newRoom = ROOM_LIST.push(new Room(name,pw,10,true,gameMode,selectedTimeToDraw,selectedWordList,customWordList));
        socket.emit("joinRoom",newRoom-1,pw);
    });
    
    socket.on("checkRoomNames",function(name,pw,gameMode,selectedTimeToDraw,selectedWordList,customWordList){
        for(var i=0;i<ROOM_LIST.length;i++){
            if(name === ROOM_LIST[i].name){
                socket.emit("createRoomFinal",false,name,pw);
                return;
            }
        }
        socket.emit("createRoomFinal",true,name,pw,gameMode,selectedTimeToDraw,selectedWordList,customWordList);
    });
    
    socket.on("startGame", function(){
        var totalPlayers = 0;
        for(var i in socket.room.playerList){
            totalPlayers++;
        }
        if((totalPlayers >= 2 && socket.room.gameMode === "ffa") || (totalPlayers >= 4 && socket.room.gameMode === "teams") || socket.room.gameMode === "freestyle"){
            for(var i in socket.room.playerList){
                socket.room.playerList[i].emit("startGame");
            } 
            socket.room.hasStarted = true;
            newGame(socket.room);
        }else if(socket.room.gameMode === "ffa"){
            socket.emit("addToChat","At least 2 people required to start the game.")
        }else if(socket.room.gameMode === "teams"){
            socket.emit("addToChat","At least 4 people required to start the game.")
        }
        
    });
    
    socket.on('error',function(er){
        console.log(er);
    });
    
    socket.on("newGame",function(){
        for(var i in socket.room.playerList){
            socket.room.playerList[i].emit("addToChat", socket.username + " has started a new game.");
        }
        newGame(socket.room);
    });
    
    
    //GAME////
    socket.on("drawClick",function(data){
        if(socket.room.state === "drawing"){
            if(socket.room.currentDrawer === socket.username || socket.room.gameMode === "freestyle"){
                for(var i in socket.room.playerList){
                if(socket.room.playerList[i].username === socket.username){
                        continue;
                    }
                    socket.room.playerList[i].emit("drawClick",data);
                }
            }
        }
    });
    
    socket.on("clearCanvas",function(){
        if(socket.username === socket.room.currentDrawer || socket.room.gameMode === "freestyle"){
            for(var i in socket.room.playerList){
                socket.room.playerList[i].emit("clearCanvas");
            } 
        }
    });
    
    socket.on("startRound",function(chosenWordID){
       if(socket.room.currentDrawer === socket.username && socket.room.state === "readying"){
            socket.room.timerRunning = true;
            socket.room.state = "drawing";
			socket.room.currentWord = socket.room.wordOptions[chosenWordID];
			socket.room.wordList.splice(socket.room.wordList.indexOf(socket.room.currentWord),1);
			socket.room.wordOptions = [];
			console.log(socket.room.wordList)
			for(var i in socket.room.playerList){
				socket.room.playerList[i].emit("roundStartSound");
		   }
       }    
    });
});
////////////////////////////////////////////////////////////////////////////////
//GLOBAL////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
var isUsernameTaken = function(data){
    var taken = false;
        for(var i in SOCKET_LIST){
                if(SOCKET_LIST[i].username === data.username) taken = true;
        }
    return taken;
};

//Chat Methods
var refreshUserChat = function(room){
    for(var i in room.playerList){
        room.playerList[i].emit("clearUserChat");
        for(var j in room.playerList){
                var name = room.playerList[j].username;
                room.playerList[i].emit("addToUserChat",name);
        }
    }
};

var refreshUserChatIngame = function(room){
    if(!room.hasStarted){
        return;
    }
    for(var i in room.playerList){
        room.playerList[i].emit("clearUserChatIngame",room.score,room.gameMode === "teams");
        for(var j in room.playerList){
            var name = room.playerList[j].username;
			
            var playerObj = getPlayerObj(room,name);
            var team;
            if(playerObj !== null){
                team = getPlayerObj(room,name).team;
            }else{
                team = "black";
            }
            if(name === room.currentDrawer){
				name += " (Drawing)";
			}
            if(playerObj !== null){
                room.playerList[i].emit("addToUserChatIngame",name,team,playerObj.score);
            }else{
                room.playerList[i].emit("addToUserChatIngame",name,team,0);
            }
            
        }
    }
};

//ROOM
function Room(name, password, maxPlayers, isOpen, gameMode, selectedTimeToDraw, selectedWordList, customWordList) {
    this.name = name;
    this.password = password;
    this.maxPlayers = maxPlayers;
    this.isOpen = isOpen;
    this.gameMode = gameMode;
	this.selectedWordList = selectedWordList;
	this.customWordList = customWordList;
	
    
    this.playerList = {}; //These are the sockets : [socket.id] = socket
    
    //EDIT this and you also need to edit, newGame() and removePlayerList();
    
    //Game
    this.hasStarted = false;
    this.timeSetting = selectedTimeToDraw;
    this.timeRemaining = this.timeSetting;
    this.timerRunning = false;
    this.playingPlayers = []; //these are the player objects
    this.state = "readying";
    this.currentDrawer = "";
    this.wordList = [];
    this.currentWord = "";
    this.teams = [[],[]];
    this.score = [0,0]; //0 is blue 1 is red
    this.lastRedDrawer = -1;
    this.lastBlueDrawer = 0;
    this.turn = 0; //0 = blue 1 = red
    
};

function Player(name){
    this.username = name;
    this.team = "either";
    this.score = 0;
};

    
var refreshRoomList = function(){
    checkForEmptyRooms(); //IMPORTANT refreshRoomList calls checkforEmptyRooms -> destroying unused rooms
    var sendRoomList = [];
    for(var i=0;i<ROOM_LIST.length;i++){
        var playerAmount = 0;
        for(var j in ROOM_LIST[i].playerList){
            playerAmount ++;
        }
        sendRoomList[i] = {name: ROOM_LIST[i].name, password: ROOM_LIST[i].password, maxPlayers: ROOM_LIST[i].maxPlayers, isOpen: ROOM_LIST[i].isOpen, currentPlayerAmount: playerAmount};
    }
    
    for(var i in ROOM_LIST[0].playerList){
        ROOM_LIST[0].playerList[i].emit("fillRoomList",sendRoomList);
    }
};

var joinLeaveMessage = function(joinLeave, room, name, myself){
    var message = "";
    if(joinLeave === "join"){
        message = " has joined ";
    }else{
        message = " has left ";
    }
    for(var i in room.playerList){
        if(room.playerList[i] === myself){
            continue;
        }
        room.playerList[i].emit("addToChat", name + message + room.name + ".");
    }
};

var refreshRoomName = function (socket){
    socket.emit("refreshRoomName", socket.room.name);
};

var checkForEmptyRooms = function(){
    for(var i=1;i<ROOM_LIST.length;i++){
        var playerAmount = 0;
        for(var j in ROOM_LIST[i].playerList){
            playerAmount ++;
        }
        if(playerAmount == 0){
            ROOM_LIST.splice(i,1);
            refreshRoomList();
            break;
        }
    }
};

///////////////////////////////////////////////////////////////////////////////
//GAME/////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

var newGame = function(room){
    room.playingPlayers = playerListToArray(room.playerList);
	if(room.selectedWordList === "Default"){
		room.wordList = JSON.parse(JSON.stringify(WORD_LIST));
	}else if(room.selectedWordList === "Path of Exile"){
		room.wordList = JSON.parse(JSON.stringify(WORD_LIST_POE));
	}else if(room.selectedWordList === "Rikaido"){
		room.wordList = JSON.parse(JSON.stringify(WORD_LIST_RIKAIDO));
	}
	
    
	if(room.customWordList != ""){
		var newWordList = room.customWordList.split(",");
		if(newWordList.length >= 4){
			room.wordList = newWordList;
		}
	}
    room.teams = [[],[]];
    if(room.gameMode === "teams"){
        assignTeams(room,true);
    }else if(room.gameMode === "ffa"){
        assignTeams(room,false);
    }
    room.currentDrawer = room.playingPlayers[0].username;
    room.hasStarted = true;
	room.currentWord = "";
	room.wordOptions = [];
    nextWord(room);
    room.state = "readying";
    room.lastRedDrawer = -1;
    room.lastBlueDrawer = 0;
    room.turn = 0; //0 = blue 1 = red
    room.timeRemaining = room.timeSetting;
    room.timerRunning = false;
    refreshUserChatIngame(room);
    refreshInfo(room);
    refreshGeneralInfo(room);
    for(var i in room.playerList){
        room.playerList[i].emit("refreshCurrentGameMode",room.gameMode);
    }
};

var nextWord = function(room){
	room.currentWord = "";
	for(var i=0;i<3;i++){
		var randomID = randomRange(0,room.wordList.length-1);
		room.wordOptions[i] = room.wordList[randomID];
		//wordOptions[i] = wordOptions[i].toLowerCase();
		//wordOptions[i] = wordOptions[i].charAt(0).toUpperCase() + wordOptions[i].slice(1);
		//room.wordList.splice(randomID,1);
	}
    
    if(room.wordList.length <= 4){
        if(room.selectedWordList === "Default"){
			room.wordList = JSON.parse(JSON.stringify(WORD_LIST));
		}else if(room.selectedWordList === "Path of Exile"){
			room.wordList = JSON.parse(JSON.stringify(WORD_LIST_POE));
		}else if(room.selectedWordList === "Rikaido"){
			room.wordList = JSON.parse(JSON.stringify(WORD_LIST_RIKAIDO));
		}
		if(room.customWordList != ""){
			var newWordList = room.customWordList.split(",");
			if(newWordList.length >= 4){
				room.wordList = newWordList;
			}
		}
    }
    for(var i in room.playerList){
        room.playerList[i].emit("clearCanvas");
    }
}

var assignTeams = function(room,team){
    shuffleArray(room.playingPlayers);
    if(team){
        for(var i=0;i<room.playingPlayers.length;i++){
            if(i % 2 === 0){
                room.playingPlayers[i].team = "blue";
                room.teams[0].push(room.playingPlayers[i]);
            }else{
                room.playingPlayers[i].team = "red";
                room.teams[1].push(room.playingPlayers[i]);
            }
        }
    }else{
        for(var i=0;i<room.playingPlayers.length;i++){
            room.playingPlayers[i].team = "blue";
            room.teams[0].push(room.playingPlayers[i]);
        }
    }
    
};

var playerListToArray = function(obj){
    var newArray = [];
    for(var i in obj){
        newArray.push(new Player(obj[i].username));
    }
    return newArray;
};

var getPlayerObj = function(room,username){
    for(var i in room.playingPlayers){
        if(username === room.playingPlayers[i].username){
            return room.playingPlayers[i];
        }
    }
    return null;
};

var refreshInfo = function(room){
    for(var i in room.playerList){
        if(getPlayerObj(room,room.playerList[i].username) !== null){ //I'm Playing
            var playerObj = getPlayerObj(room,room.playerList[i].username);
			var underscoreString = room.currentWord.replace(/\S/g,'_');
			if(underscoreString === ""){
				underscoreString = room.currentDrawer + " is choosing a Word";
			}else if(room.timeRemaining >= room.timeSetting/2){
				underscoreString = "";
			}
			
            if(room.currentDrawer === playerObj.username){ //I'm Drawing
                var word = room.currentWord;
                word = word.toLowerCase();
                word = word.charAt(0).toUpperCase() + word.slice(1);
                room.playerList[i].emit("refreshInfo",word,room.timeRemaining,room.currentDrawer);
            }else if((playerObj.team === "blue" && room.turn === 0) || (playerObj.team === "red" && room.turn === 1)){
                room.playerList[i].emit("refreshInfo",underscoreString,room.timeRemaining,room.currentDrawer);
            }else{
                room.playerList[i].emit("refreshInfo",underscoreString,room.timeRemaining,room.currentDrawer);
            }
        }else{
            room.playerList[i].emit("refreshInfo",underscoreString,room.timeRemaining,room.currentDrawer);
        }
    }
};

var refreshGeneralInfo = function(room){
	for(var i in room.playerList){
        if(getPlayerObj(room,room.playerList[i].username) !== null){ //I'm Playing
            var playerObj = getPlayerObj(room,room.playerList[i].username);
            if(room.currentDrawer === playerObj.username){ //I'm Drawing
                room.playerList[i].emit("refreshGeneralInfo",room.currentDrawer,room.state,room.wordOptions);
				continue;
            }
        }
		room.playerList[i].emit("refreshGeneralInfo",room.currentDrawer,room.state);
    }
};

var nextTurn = function(room){
    if(room.gameMode === "teams"){
        room.turn = addAndReset(room.turn,2);
        
    }else if(room.gameMode === "ffa"){
        
    }
    incrementLastDrawer(room);
    room.currentDrawer = room.teams[room.turn][correctLastDrawer(room)].username;
    nextWord(room);
    room.state = "readying";
    room.timerRunning = false;
    
    refreshGeneralInfo(room);
    refreshInfo(room);
    refreshUserChatIngame(room);
};

var addAndReset = function(number,resetThreshold){
    number++;
    if(number >= resetThreshold){
        number = 0;
    }
    return number;
};

var incrementLastDrawer = function(room){
    if(room.turn === 0){  /// blues turn
        room.lastBlueDrawer = addAndReset(room.lastBlueDrawer,room.teams[0].length);
    }else if(room.turn === 1){
        room.lastRedDrawer = addAndReset(room.lastRedDrawer,room.teams[1].length);
    }
};

var correctLastDrawer = function(room){
    if(room.turn === 0){
        return room.lastBlueDrawer;
    }else if(room.turn === 1){
        return room.lastRedDrawer;
    }
};

//UTILIY
var randomRange = function(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var shuffleArray = function(array){
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

setInterval(function(){
    for(var i in ROOM_LIST){
        if(ROOM_LIST[i].timerRunning){
            if(ROOM_LIST[i].timeRemaining > 0){
                ROOM_LIST[i].timeRemaining--;
                refreshInfo(ROOM_LIST[i]);
            }else{
                //TIMES UP
                var word = ROOM_LIST[i].currentWord;
                word = word.toLowerCase();
                word = word.charAt(0).toUpperCase() + word.slice(1);
                for(var j in ROOM_LIST[i].playerList){
                    ROOM_LIST[i].playerList[j].emit("addToChat", "The word was: " + word);
					ROOM_LIST[i].playerList[j].emit("wordNotGuessedSound");
                }
                ROOM_LIST[i].timeRemaining = ROOM_LIST[i].timeSetting;
                nextTurn(ROOM_LIST[i]);
            }
        }
    }
},1000);


//NOTES        
//dot if you click into window
//stop from playing with less than 4 in teams
//word after fail round -----
//you are guessing ---------
//correct word in chat ------
//skip word
//other ppl can click clear -----------
//indication on round end
//by chance you can get same options doubled since im not removing the entry of the choices only the picked option

//score of spectator is null
/*TypeError: Cannot read property 'score' of null
    at refreshUserChatIngame (/var/www/ta/maler/malerServer.js:249:78)
    at Socket.<anonymous> (/var/www/ta/maler/malerServer.js:128:13)
    at emitTwo (events.js:125:13)
    at Socket.emit (events.js:213:7)
    at /var/www/ta/maler/node_modules/socket.io/lib/socket.js:514:12
    at _combinedTickCallback (internal/process/next_tick.js:95:7)
    at process._tickCallback (internal/process/next_tick.js:161:9)
*/
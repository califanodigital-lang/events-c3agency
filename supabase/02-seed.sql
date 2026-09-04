-- C3 Agency · events.c3agency.it — dati iniziali
-- Rigenerato dai file creators.js / panels.js / site-content.js
-- Idempotente: si può rieseguire senza duplicare nulla.

begin;

-- ------------------------------------------------------------ aree
insert into public.geo_areas (key,title,subtitle,sort_order) values ('nord','Nord Italia','Piemonte · Liguria · Lombardia · Veneto · Emilia-Romagna',0)
  on conflict (key) do update set title=excluded.title, subtitle=excluded.subtitle, sort_order=excluded.sort_order;
insert into public.geo_areas (key,title,subtitle,sort_order) values ('centro','Centro Italia','Toscana · Lazio',1)
  on conflict (key) do update set title=excluded.title, subtitle=excluded.subtitle, sort_order=excluded.sort_order;
insert into public.geo_areas (key,title,subtitle,sort_order) values ('sud','Sud Italia e Isole','Campania · Puglia · Calabria · Sicilia · Sardegna',2)
  on conflict (key) do update set title=excluded.title, subtitle=excluded.subtitle, sort_order=excluded.sort_order;

-- -------------------------------------------------------- creator
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'beatrice-lorenzi', 'Beatrice Lorenzi', 'Hosting · Panel', 'Autrice, presentatrice e volto storico dei principali festival italiani. Unisce preparazione culturale, ritmo e grande padronanza del palco.', 'Veneto · target 25–44', 'assets/beatrice.jpg',
  '["Hosting e conduzione main stage","Moderazione di panel e interviste","Presentazione e giuria cosplay","Talk su fantasy, anime, cinema e cultura pop"]'::jsonb, 0)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'lo-scribacchino', 'Lo Scribacchino', 'Fantasy · Divulgazione', 'Autore e divulgatore fantasy specializzato nell’universo di Harry Potter. Porta sul palco lore, teorie e curiosità con uno stile ironico e accessibile.', 'Toscana · target 15–45', 'assets/scribacchino.jpg',
  '["Panel fantasy e letteratura","Approfondimenti su Harry Potter","Firmacopie e incontri editoriali","Interviste e storytelling live"]'::jsonb, 1)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'cristiana-nerdarte', 'Cristiana Nerdarte', 'Arte · Mitologia · Hosting', 'Storica dell’arte, cosplayer e divulgatrice. Collega arte, storia, mitologia e saghe nerd in format interattivi e narrativi.', 'Toscana / Lombardia · target 18–50+', 'assets/cristiana.jpg',
  '["Arte in Tim Burton: dal museo al cinema","Il Medioevo secondo Walt Disney: come i cartoni hanno trasformato l’età di mezzo","Cartoni a regola d’arte: che ci fanno le opere d’arte nei classici Disney?","Revelio: l’Arte in Harry Potter fra location ed easter egg","Fiabe spaventose: il lato dark delle fiabe dai Fratelli Grimm alla Disney","Animali fantastici e dove trovarli: dai miti a Newt Scamander!","Dadi e Quadri: fatti ispirare dall’Arte per giocare a Dungeons and Dragons!","Dal Museo al dungeon: quanto sono cambiati i mostri dal mito a DnD?","Pop Olimpo: come ci è finita l’Antica Grecia in TV?","Medioevo da ridere: gli stereotipi comici dell’età di mezzo nella cultura pop","Storie di Streghe: dal mito alla cultura pop","Nell’antro della strega: storie di oggetti stregati fra cappelli a punta, scope volanti e sfere di cristallo","Storie del Piccolo popolo: da dove nascono elfi, fate e folletti?","Storie di Vampiri: dalla mitologia a Hollywood","All’Arrembaggio: i pirati dalla storia al mondo nerd","Invito a Camelot: il mondo di Artù dal mito alla cultura pop","Invito ad Avalon: le donne del mito arturiano e l’evoluzione dei loro personaggi","Benvenuti all’Inferno! Quanto sono biblicamente accurati Hazbin Hotel, Good Omens e Lucifer?","Alle radici di Arda: storia e mito nell’universo di J.R.R. Tolkien","In una galassia lontana lontana: viaggi nello spazio dal Medioevo a Star Wars","I primi cosplayer erano imperatori romani! Viaggio nella storia del cosplay dall’Antica Roma ai giorni nostri"]'::jsonb, 2)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'itsklyo', 'ItsKlyo', 'Musica · Anime · Gaming', 'Cantante, creator e performer specializzata in anime, J-pop e K-pop, con esperienza anche nel gaming e nei giochi di ruolo.', 'Sicilia / Lazio · target 15–35', 'assets/klyo.jpg',
  '["Concerti e performance vocali","Panel anime, gaming e cultura asiatica","Hosting e moderazione","Attività GdR e workshop"]'::jsonb, 3)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'vale-spaccagiochi', 'Vale Spaccagiochi', 'Board game · GdR', 'Racconta giochi da tavolo, ruolo e carte collezionabili con ironia, rendendo il gaming analogico accessibile a tutti.', 'Liguria · target 15–50+', 'assets/vale-spaccagiochi.jpg',
  '["Panel su board game e GdR","Sessioni di gioco guidate","Hosting area games","Moderazione e interviste"]'::jsonb, 4)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'golgota', 'Golgota', 'Tolkien · Storytelling', 'Storyteller e divulgatore letterario dedicato alla Terra di Mezzo, tra narrazione epica, analisi e ironia.', 'Toscana · target 25–50+', 'assets/golgota.jpg',
  '["Panel tolkieniani e fantasy","Lezioni-spettacolo sulla lore","Storytelling e cultura pop","Dialoghi su miti e simbolismi"]'::jsonb, 5)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'carla-grimaldi', 'Carla Grimaldi', 'Live · Celtic folk', 'Violinista e compositrice tra folk celtico, atmosfere fantasy e sonorità contemporanee.', 'Campania · target 16–50+', 'assets/carla.jpg',
  '["Concerti dal vivo","Performance immersive","Sonorizzazioni narrative","Panel su musica, folklore e fantasy"]'::jsonb, 6)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'mochichuu', 'MochiChuu', 'Cosplay · Contest', 'Cosplayer e tatuatrice con esperienza internazionale, riconosciuta per la qualità dei costumi e la capacità interpretativa.', 'Emilia-Romagna · target 25–50+', 'assets/mochichuu.jpg',
  '["Giuria gare cosplay","Presentazione e stage hosting","Panel cosplay e cultura pop","Meet & greet"]'::jsonb, 7)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'loon', 'Loon', 'Cosplay · Stage host', 'Cosplayer internazionale con forte presenza scenica e lunga esperienza in eventi e competizioni.', 'Emilia-Romagna · target 25–50+', 'assets/loon.jpg',
  '["Giuria gare cosplay","Presentazione contest","Panel e workshop","Hosting e interviste"]'::jsonb, 8)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'finn-naso-blu', 'Finn Naso Blu', 'Fumetto · Divulgazione', 'Autore e infermiere: usa il fumetto per raccontare la quotidianità sanitaria con autenticità, ironia e sensibilità.', 'Lazio / Campania · target 25–50+', 'assets/smera-e-basta.jpg',
  '["Panel su fumetto e divulgazione","Artist alley","Firmacopie","Talk su sanità e narrazione"]'::jsonb, 9)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'sareika-lab', 'Sareika Lab', 'Prop-making · Workshop', 'Prop-maker e cosplayer professionista, specializzata in materiali, lavorazioni e costruzione di accessori.', 'Piemonte · target 25–50+', 'assets/sareika-lab.jpg',
  '["Workshop pratici di prop-making","Panel tecnici sul cosplay","Giuria tecnica cosplay","Presentazione contest"]'::jsonb, 10)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'faenel', 'Faenel', 'Tolkien · Cosplay', 'Cosplayer e divulgatrice dei mondi tolkieniani, capace di unire costumi, storytelling e approfondimento culturale.', 'Campania · target 25–50+', 'assets/faenel.jpg',
  '["Panel su Tolkien","Workshop cosplay","Hosting e moderazione","Giuria gare cosplay"]'::jsonb, 11)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'nennella-esposito', 'Nennella Esposito', 'Teatro · Cultura popolare', 'Performer che unisce teatro, comicità e tradizione napoletana in un linguaggio contemporaneo e inclusivo.', 'Veneto / Campania · target 15–35', 'assets/nennella.jpg',
  '["Performance live","Panel su cultura e inclusività","Hosting e interviste","Giuria e presentazione cosplay"]'::jsonb, 12)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'ardenchan', 'ArdenChan', 'Cosplay · Gaming', 'Creator, modella e cosplayer professionista, punto di riferimento per le community anime e gaming.', 'Toscana · target 15–35', 'assets/ardenchan.jpg',
  '["Ospite d’onore e meet & greet","Giuria cosplay","Panel e hosting","Contenuti social per l’evento"]'::jsonb, 13)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'shizen', 'Shizen', 'J-pop · K-pop · Show', 'Performer poliedrica che combina danza, musica e interpretazione nello show KaleidosPop.', 'Campania · target 15–35', 'assets/shizen.jpg',
  '["Show KaleidosPop","Performance J-pop e K-pop","Main stage","Animazione del pubblico"]'::jsonb, 14)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'team-rocker', 'Team Rocker', 'Rock · Anime · Live', 'Band dedicata alle sigle cult, agli anime e ai videogiochi reinterpretati in chiave rock.', 'Campania · target 15–55+', 'assets/team-rocker.jpg',
  '["Concerti live","Main stage","Medley di sigle anime","Show partecipativi"]'::jsonb, 15)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'il-forla', 'Il Forla', 'Gaming · Workshop', 'Creator e streamer specializzato in videogiochi, news e comunicazione digitale breve.', 'Lombardia · target 15–35', 'assets/forla.jpg',
  '["Panel gaming","Workshop su community e short video","Hosting area games","Moderazione e interviste"]'::jsonb, 16)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'dio-eros', 'Dio Eros', 'Tech · Gaming', 'Creator e sviluppatore che unisce programmazione, storytelling, anime e videogiochi.', 'Lombardia · target 15–35', 'assets/dio-eros.jpg',
  '["Panel tecnologia e gaming","Workshop digitali","Moderazione di talk","Hosting area games"]'::jsonb, 17)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'maurolone', 'Maurolone', 'Cinema · Serie TV', 'Critico e storyteller specializzato in cinema, serie TV, fenomeni web e cultura pop.', 'Campania / Lazio · target 15–35', 'assets/maurolone.jpg',
  '["Panel cinema e serie TV","Interviste agli ospiti","Maratone di analisi live","Hosting e moderazione"]'::jsonb, 18)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'ludo-thorn', 'Ludo Thorn', 'Doppiaggio · Animazione', 'Creator, doppiatore e autore di fumetti noto per parodie e performance vocali.', 'Cultura pop · young audience', 'assets/ludo-thorn.jpg',
  '["Doppiaggio live","Panel animazione e gaming","Presentazioni editoriali","Meet & greet"]'::jsonb, 19)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'inazuma-sensei', 'Inazuma Sensei', 'Doppiaggio · Fandom', 'Voice performer e creator dedicato ad animazione, fandub e cultura pop.', 'Anime · cartoon · young audience', 'assets/inazuma-sensei.jpg',
  '["Panel sul doppiaggio","Performance e prove dal vivo","Incontri su animazione web","Attività interattive con il pubblico"]'::jsonb, 20)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'kety', 'Kety', 'Primo soccorso · Edutainment', 'Divulgatore nell’ambito della sicurezza e del primo soccorso, con un linguaggio pratico e coinvolgente.', 'Pubblico trasversale', 'assets/kety.jpg',
  '["Dimostrazioni di primo soccorso","Simulazioni con il pubblico","Contenuti itineranti","Panel sulla sicurezza in fiera"]'::jsonb, 21)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'filo-d-oro', 'Filo D’Oro', 'Animazione · Commentary', 'Creator dedicata a serie animate e cultura pop, con uno stile ironico e vicino alla community.', 'Community anime · young audience', 'assets/filo-doro.jpg',
  '["Talk su cinema e animazione","Quiz e dibattiti live","Moderazione di panel","Hosting palco"]'::jsonb, 22)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'kiria-eternalove', 'Kiria Eternalove', 'Gaming · Scrittura', 'Youtuber, scrittrice e illustratrice che unisce gaming narrativo, libri e creatività.', 'Gaming · letteratura · target trasversale', 'assets/kiria-eternalove.jpg',
  '["Workshop di scrittura creativa","Panel su storytelling e visual novel","Presentazioni editoriali","Meet & greet"]'::jsonb, 23)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'ede-e-davide', 'Ede e Davide', 'Comedy · GdR', 'Duo di creator specializzato in intrattenimento nerd, gaming e comicità spontanea.', 'Campania · target young', 'assets/ede-e-davide.jpg',
  '["Hosting e presentazione","Sfide gaming dal vivo","Panel anime, cinema e GdR","Meet & greet"]'::jsonb, 24)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'sa-leggenda', 'Sa Leggenda', 'Comedy · Musica', 'Creator e performer dallo stile diretto, goliardico e virale.', 'Sardegna · target young', 'assets/sa-leggenda.jpg',
  '["Sketch comici live","Performance musicali","Interazione con il pubblico","Foto e video-saluti"]'::jsonb, 25)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'crudest-tv', 'Crudest TV', 'Comedy · Social', 'Creator dalla comicità irriverente e spontanea, ideale per contenuti tra la folla.', 'Campania · target young', 'assets/crudest-tv.jpg',
  '["Interviste itineranti","Sketch live","Reel e contenuti social","Intrattenimento palco"]'::jsonb, 26)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'monkey-tuna', 'Monkey Tuna', 'Gaming · Psicologia', 'Creator, cosplayer e psicologa: unisce cultura pop, videogiochi e salute mentale.', 'Gaming · cosplay · target 18+', 'assets/monkey-tuna.jpg',
  '["Panel su psicologia e media","Workshop cosplay e creatività","Q&A","Intrattenimento gaming"]'::jsonb, 27)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'pepiyos', 'Pepiyos', 'Lifestyle · Family', 'Coppia di creator amata per prank, challenge e racconto quotidiano della Yosfamily.', 'Giovani e famiglie', 'assets/pepiyos.jpg',
  '["Giochi interattivi sul palco","Meet & greet","Presentazione editoriale","Challenge con il pubblico"]'::jsonb, 28)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'teo-the-teach', 'Teo The Teach', 'Inglese · Pop culture · Live edutainment', 'Insegnante, creator e progettista di metodi di apprendimento: trasforma l’inglese in intrattenimento attraverso ironia, meme, cinema, gaming e gioco di ruolo. Ha portato panel e workshop a COMICON Napoli e Bergamo.', 'Lombardia · +400K follower · target 25–54', 'assets/teo-the-teach.jpg',
  '["Pronunce che fanno schifo: Live","Dungeons & English","International host bilingue","Panel e workshop su inglese e cultura pop"]'::jsonb, 29)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'teddino', 'Teddino', 'Comedy · Storytelling', 'Creator e videomaker capace di unire ironia, improvvisazione e racconto personale.', 'Pubblico giovane e trasversale', 'assets/teddino.jpg',
  '["Interviste tra il pubblico","Sketch improvvisati","Panel e attività palco","Storytelling motivazionale"]'::jsonb, 30)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'shorii', 'Shorii', 'Anime · Manga', 'Creator dedicato ad anime, manga e cultura pop giapponese, con un tono fresco e riconoscibile.', 'Young audience', 'assets/shorii.jpg',
  '["Panel anime e manga","Contenuti itineranti","Interviste leggere","Attività social"]'::jsonb, 31)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'soryu-geggy', 'Soryu Geggy', 'Cosplay · Canto', 'Cosplayer, cantante e creator con grande esperienza scenica e internazionale.', 'Anime · gaming · cosplay', 'assets/soryu-geggy.jpg',
  '["Performance musicali","Giuria cosplay","Conduzione contest","Meet & greet"]'::jsonb, 32)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'spiegabro', 'SpiegaBro', 'AI · Tech · Live', 'Creator e sviluppatore che rende accessibili tecnologia, AI e comunicazione con ironia.', 'Tech · cultura pop', 'assets/spiegabro.jpg',
  '["Talk-show su AI e creatività","Musica e video live","Workshop digitali","Interazione con il pubblico"]'::jsonb, 33)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'sonny-cosplay', 'Sonny Cosplay', 'Cosplay · Magia', 'Cosplayer, performer e host noto per personaggi iconici e una forte presenza teatrale.', 'Fantasy · cinema · cosplay', 'assets/sonny-cosplay.jpg',
  '["Giuria e conduzione contest","Spettacoli di magia","Performance in character","Hosting palco"]'::jsonb, 34)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;
insert into public.creators (slug,name,category,description,meta,image,activities,sort_order) values (
  'gattoacab', 'GattoAcab', 'Animazione · Video', 'Creator, videomaker e animatore 3D che racconta anime e cultura visuale con competenza tecnica.', 'Anime · video · cultura pop', 'assets/gattoacab.jpg',
  '["Panel su animazione e video","Workshop di videomaking","Contenuti social per l’evento","Moderazione e presentazione"]'::jsonb, 35)
  on conflict (slug) do update set name=excluded.name, category=excluded.category,
    description=excluded.description, meta=excluded.meta, image=excluded.image,
    activities=excluded.activities, sort_order=excluded.sort_order;

-- ---------------------------------------------------- territori
insert into public.creator_territories (creator_slug,area,region) values ('beatrice-lorenzi','nord','Veneto') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('cristiana-nerdarte','nord','Lombardia') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('vale-spaccagiochi','nord','Liguria') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('mochichuu','nord','Emilia-Romagna') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('loon','nord','Emilia-Romagna') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('sareika-lab','nord','Piemonte') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('nennella-esposito','nord','Veneto') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('il-forla','nord','Lombardia') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('dio-eros','nord','Lombardia') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('ludo-thorn','nord','Emilia-Romagna') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('inazuma-sensei','nord','Emilia-Romagna') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('kety','nord','Lombardia') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('teo-the-teach','nord','Lombardia') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('lo-scribacchino','centro','Toscana') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('cristiana-nerdarte','centro','Toscana') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('itsklyo','centro','Lazio') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('golgota','centro','Toscana') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('finn-naso-blu','centro','Lazio') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('ardenchan','centro','Toscana') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('maurolone','centro','Lazio') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('filo-d-oro','centro','Lazio') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('kiria-eternalove','centro','Toscana') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('monkey-tuna','centro','Lazio') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('sonny-cosplay','centro','Lazio') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('gattoacab','centro','Lazio') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('itsklyo','sud','Sicilia') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('carla-grimaldi','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('finn-naso-blu','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('faenel','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('nennella-esposito','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('shizen','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('team-rocker','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('maurolone','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('ede-e-davide','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('sa-leggenda','sud','Sardegna') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('crudest-tv','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('pepiyos','sud','Puglia') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('teddino','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('shorii','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('soryu-geggy','sud','Campania') on conflict do nothing;
insert into public.creator_territories (creator_slug,area,region) values ('spiegabro','sud','Calabria') on conflict do nothing;

-- ----------------------------------------------------- panel condivisi
insert into public.panels (slug,title,eyebrow,description,participants,duration,target,ideal,image,sort_order) values (
  'romantasy-fantasy', 'Romantasy & Fantasy', 'Il boom del genere · panel sul fenomeno del Romantasy', 'Un viaggio nel genere che ha conquistato BookTok e le classifiche mondiali. Esploreremo cosa distingue il Romantasy dal Fantasy tradizionale, scoprendo perché questo fenomeno ci piace tanto.',
  array['beatrice-lorenzi','lo-scribacchino']::text[], '60 minuti + Q&A opzionale', '18–50 · lettori Romantasy/Fantasy', 'Slot trend · area cultura pop', '', 0)
  on conflict (slug) do update set title=excluded.title, eyebrow=excluded.eyebrow,
    description=excluded.description, participants=excluded.participants, duration=excluded.duration,
    target=excluded.target, ideal=excluded.ideal, image=excluded.image, sort_order=excluded.sort_order;
insert into public.panels (slug,title,eyebrow,description,participants,duration,target,ideal,image,sort_order) values (
  'doppiaggio-sul-web', 'Doppiaggio sul Web', 'Panel a tutto doppiaggio', 'Un panel interattivo dedicato al mondo del doppiaggio: tecniche, curiosità e il lavoro della voce tra animazione, web e cultura pop. Alcuni volontari del pubblico salgono sul palco e vengono doppiati dal vivo, rendendo l’incontro dinamico e inaspettato.',
  array['inazuma-sensei','ludo-thorn']::text[], '60 minuti + Q&A opzionale', '16–40 · doppiaggio, anime e cultura pop', 'Slot trend · area cultura pop', '', 1)
  on conflict (slug) do update set title=excluded.title, eyebrow=excluded.eyebrow,
    description=excluded.description, participants=excluded.participants, duration=excluded.duration,
    target=excluded.target, ideal=excluded.ideal, image=excluded.image, sort_order=excluded.sort_order;
insert into public.panels (slug,title,eyebrow,description,participants,duration,target,ideal,image,sort_order) values (
  'armonie-stregate', 'Armonie Stregate', 'Panel narrativo-musicale sulla storia delle streghe', 'Divulgazione storica e mitologica si intrecciano alla musica dal vivo in un’esperienza immersiva. Da Ecate alla magia, da Medea e Grimilde a Viviana di Avalon, Galadriel e le figure veggenti, con brani come Once Upon a Dream, Road to Camelot e Down the Witches’ Road.',
  array['cristiana-nerdarte','carla-grimaldi']::text[], '60–75 minuti', '18–40 · fantasy, mitologia e GDR', 'Main stage pomeridiano · slot di richiamo', '', 2)
  on conflict (slug) do update set title=excluded.title, eyebrow=excluded.eyebrow,
    description=excluded.description, participants=excluded.participants, duration=excluded.duration,
    target=excluded.target, ideal=excluded.ideal, image=excluded.image, sort_order=excluded.sort_order;
insert into public.panels (slug,title,eyebrow,description,participants,duration,target,ideal,image,sort_order) values (
  'millennials-fantasy', 'Millennial’s Fantasy', 'Le storie che hanno cambiato le nostre vite', 'Un panel nostalgico e analitico sulle saghe fantasy e young adult che hanno formato i millennials tra gli anni 2000 e 2010. Dall’eroismo all’identità, analizzeremo i temi ricorrenti, l’impatto culturale e il modo in cui queste storie hanno plasmato il fantasy contemporaneo.',
  array['lo-scribacchino','golgota','cristiana-nerdarte']::text[], '60 minuti + Q&A opzionale', '25–50 · millennials e pubblico trasversale', 'Panel premium · fascia pomeridiana-serale', '', 3)
  on conflict (slug) do update set title=excluded.title, eyebrow=excluded.eyebrow,
    description=excluded.description, participants=excluded.participants, duration=excluded.duration,
    target=excluded.target, ideal=excluded.ideal, image=excluded.image, sort_order=excluded.sort_order;
insert into public.panels (slug,title,eyebrow,description,participants,duration,target,ideal,image,sort_order) values (
  'cosplay-in-terra-di-mezzo', 'Cosplay in Terra di Mezzo', 'Panel a tema Signore degli Anelli', 'Un incontro pratico-creativo sulla nascita di un cosplay tolkieniano: personaggio, silhouette, tessuti, accessori, pose e reference emotive. Il racconto si completa con il contesto narrativo e i dettagli che rendono un costume davvero coerente con l’universo di Tolkien.',
  array['faenel','golgota']::text[], '60 minuti + Q&A opzionale', '18–50 · lettori fantasy', 'Slot trend · area cultura pop', '', 4)
  on conflict (slug) do update set title=excluded.title, eyebrow=excluded.eyebrow,
    description=excluded.description, participants=excluded.participants, duration=excluded.duration,
    target=excluded.target, ideal=excluded.ideal, image=excluded.image, sort_order=excluded.sort_order;
insert into public.panels (slug,title,eyebrow,description,participants,duration,target,ideal,image,sort_order) values (
  'j-k-cartoon', 'J/K Cartoon', 'Concerto J-pop, K-pop e sigle anime', 'Le opening degli anime più famosi adattate in italiano, le sigle dei cartoni classici e una selezione J-pop e K-pop. Klyo porta voce e performance, mentre i Team Rocker accompagnano dal vivo e accendono il palco con medley tutti da ballare.',
  array['itsklyo','team-rocker']::text[], '60–90 minuti', '14–35 · anime, manga e cosplayer', 'Main stage · evento serale o chiusura giornata', '', 5)
  on conflict (slug) do update set title=excluded.title, eyebrow=excluded.eyebrow,
    description=excluded.description, participants=excluded.participants, duration=excluded.duration,
    target=excluded.target, ideal=excluded.ideal, image=excluded.image, sort_order=excluded.sort_order;

-- ------------------------------------------------------ testi del sito
insert into public.site_content (key,value) values ('navFormat','Format') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('navCreator','Creator') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('navTerritory','Territorio') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('navMethod','Come funziona') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('navLogistics','Logistica') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('headerCta','Parliamo della tua fiera') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('heroEyebrow','Creator package · fiere & festival') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('heroTitle','Il palco che la tua community ricorderà.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('heroLead','Creator, artisti e divulgatori già abituati al pubblico dal vivo. Costruiamo un palinsesto su misura tra fantasy, pop culture, musica, gaming e cosplay.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('heroPrimary','Scopri il roster') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('heroSecondary','Esplora i format') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('heroLabel','Tre linguaggi. Un solo palco.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('heroImage1','assets/beatrice.jpg') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('heroImage2','assets/cristiana.jpg') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('heroImage3','assets/scribacchino.jpg') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('formatEyebrow','Un palinsesto, molte possibilità') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('formatTitle','Format che accendono ogni area.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('formatText','Ogni proposta è acquistabile singolarmente oppure integrata in un pacchetto: più attività, un’unica regia editoriale e logistica.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format1Title','Panel & talk') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format1Text','Approfondimenti, interviste e conversazioni guidate da creator autorevoli e coinvolgenti.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format1Tag','Pop culture · Fantasy · Cinema') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format2Title','Show & concerti') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format2Text','Performance musicali, doppiaggio live e spettacoli pensati per il main stage.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format2Tag','Anime · K-pop · Rock · Folk') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format3Title','Workshop') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format3Text','Esperienze pratiche su prop-making, cosplay, gaming, content creation e storytelling.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format3Tag','Learning by doing') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format4Title','Hosting & contest') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format4Text','Presentazione, moderazione, quiz, meet & greet e giurie cosplay con ritmo da palco.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('format4Tag','Pubblico sempre al centro') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('rosterEyebrow','Il roster completo') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('rosterTitle','Trova il volto giusto.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('rosterText','Filtra l’intero roster per area. Il cast viene poi definito in base a target, tono, territorio e budget della manifestazione.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('filterAll','Tutti') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('filterFantasy','Fantasy') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('filterGaming','Gaming') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('filterRoleplay','GDR/GDT') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('filterCosplay','Cosplay') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('filterMusic','Musica') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('filterPop','Pop culture') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('filterEducation','Divulgazione') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('sharedPanelEyebrow','Più creator, un’unica esperienza') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('sharedPanelTitle','Panel condivisi.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('sharedPanelText','Incontri costruiti intorno a prospettive diverse, per trasformare un tema in una conversazione coinvolgente e memorabile.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('territoryEyebrow','Da nord a sud') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('territoryTitle','Creator vicini alla tua fiera.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('territoryText','Consulta il roster per area geografica. I profili con più basi operative compaiono nelle diverse zone in cui sono disponibili.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('methodEyebrow','Collaborazione semplice') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('methodTitle','Una proposta che si adatta alla tua fiera.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('method1Title','Raccontaci l’evento') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('method1Text','Pubblico, dimensioni, aree, date e obiettivi.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('method2Title','Componiamo il cast') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('method2Text','Selezioniamo creator e format coerenti con il palinsesto.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('method3Title','Ottimizziamo') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('method3Text','Più attività con gli stessi volti riducono costi e complessità.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('method4Title','Andiamo in scena') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('method4Text','Professionisti già abituati a palco, pubblico e imprevisti del live.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logisticsEyebrow','Logistica coordinata') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logisticsTitle','Più attività. Meno complessità.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logisticsText','Gestiamo la presenza dei creator con un modello semplice e modulare, pensato per alleggerire l’organizzazione della fiera e ottimizzare il budget.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logistics1Title','Un unico coordinamento') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logistics1Text','Cast, disponibilità e attività vengono costruiti come un unico palinsesto coerente.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logistics2Title','Viaggio e alloggio') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logistics2Text','La proposta comprende cachet e rimborso delle spese di viaggio e pernottamento.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logistics3Title','Più format, più valore') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logistics3Text','Dalla seconda attività dello stesso creator applichiamo uno sconto, riducendo costi e passaggi logistici.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logistics4Title','Presenza continuativa') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('logistics4Text','Gli stessi volti possono accompagnare panel, workshop, palco e area community durante l’evento.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactEyebrow','La prossima fiera può partire da qui') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactTitle','Costruiamo insieme il tuo prossimo sold out.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactText','Compila le prime informazioni: al termine puoi inviarle tramite email oppure aprire la richiesta già pronta su WhatsApp.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactFormTitle','Raccontaci il tuo evento') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactName','Nome e ruolo *') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactEmail','Email *') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactEvent','Nome dell’evento *') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactCity','Città e location *') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactDates','Date previste *') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactAudience','Affluenza stimata') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactAreas','Aree tematiche') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactBudget','Budget indicativo') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactInterest','Creator o format di interesse') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactPhone','Numero di cellulare *') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactEmailButton','Invia via email') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactWhatsappButton','Invia su WhatsApp') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactPrivacy','I dati restano nel tuo dispositivo finché non scegli il canale di invio.') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactEmailTarget','info@c3agency.it') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('contactWhatsappTarget','393513448497') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('footerCompany','C3 Agency SRL') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('footerAddress','Via Roma 30 · 81022 Casagiove (CE)') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('footerTax','P. IVA 04959500614 · PEC: C3agency@pec.it') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('footerReserved','Area riservata') on conflict (key) do update set value=excluded.value;
insert into public.site_content (key,value) values ('footerTop','Torna su ↑') on conflict (key) do update set value=excluded.value;

-- ------------------------------------------- macrocategorie attività
insert into public.app_settings (key,value) values ('activity_macrocategories','["Host","Cosplay","Panel & talk","Workshop","Performance","Gaming & GdR","Community & contenuti","Attività in fiera"]'::jsonb)
  on conflict (key) do update set value=excluded.value;

commit;

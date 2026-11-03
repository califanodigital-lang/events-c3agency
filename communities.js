window.C3_COMMUNITIES_DEFAULTS=[
  {
    slug:'hellaverse-italian-community',name:'Hellaverse Italian Community',eyebrow:'Cosplay · community · area tematica',
    description:'La community italiana dedicata a Hazbin Hotel e Helluva Boss porta in fiera raduni, attività, set immersivi e occasioni di incontro per cosplayer e fan.',
    details:'Una presenza modulare che può trasformare uno spazio della fiera in un vero punto di ritrovo Hellaverse. La proposta comprende set ispirati alle ambientazioni della serie, raduni inclusivi, quiz, karaoke, giochi, SOS cosplay e makeup, photo opportunity, lettura dei tarocchi e attività digitali. Il programma viene adattato agli spazi, alla durata dell’evento e al pubblico previsto.',
    instagram:'https://www.instagram.com/hazbin_hotel_italian_cosplay/',logo:'assets/community-hazbin-logo.jpg',cover:'assets/community-hazbin-event-01.png',
    activities:['Stand Hellaverse immersivo','Hellaverse Reunion','SOS Cosplay & Makeup','Karaoke, quiz e giochi','Photo opportunity e set tematici','Tarocchi e attività VR'],
    gallery:['assets/community-hazbin-event-01.png','assets/community-hazbin-event-02.png','assets/community-hazbin-05.jpg','assets/community-hazbin-13.jpg','assets/community-hazbin-01.jpg','assets/community-hazbin-02.jpg','assets/community-hazbin-07.jpg'],thematicEnabled:true,
    thematicAreas:[{title:'Hellaverse stand',description:'Uno spazio immersivo e modulare composto da più ambientazioni, attività e punti fotografici ispirati all’universo Hellaverse.',gallery:['assets/community-hazbin-05.jpg','assets/community-hazbin-06.jpg']},{title:'Hellaverse Reunion',description:'Raduno inclusivo con giochi, quiz, karaoke, momenti di condivisione, fotografie e premiazione dei partecipanti.',gallery:['assets/community-hazbin-event-01.png','assets/community-hazbin-event-02.png','assets/community-hazbin-13.jpg']}]
  },
  {
    slug:'disney-animation-icg',name:'Disney Animation ICG',eyebrow:'Inclusive cosplay group',
    description:'Una community inclusiva dedicata all’animazione Disney, pensata per creare raduni, momenti di condivisione e attività cosplay aperte a ogni fan.',
    details:'Disney Animation ICG crea occasioni di incontro inclusive dedicate ai personaggi e ai mondi dell’animazione Disney. La community può realizzare stand tematici con laboratori e punti foto, truccabimbi, raduni cosplay e presenze organizzate in occasione di eventi e proiezioni speciali.',
    instagram:'https://www.instagram.com/disneyanimation_icg/',logo:'assets/community-disney-logo.png',cover:'assets/community-disney-stand.jpg',
    activities:['Stand con laboratori e punto foto','Truccabimbi a tema','Raduni cosplay','Presenza a eventi e proiezioni speciali'],gallery:['assets/community-disney-stand.jpg','assets/community-disney-face-painting.jpg','assets/community-disney-gathering.jpg','assets/community-disney-special-events.jpg'],thematicEnabled:true,
    thematicAreas:[{title:'Stand, laboratori e punto foto',description:'Uno spazio Disney personalizzabile con scenografie, laboratori creativi, attività per il pubblico, truccabimbi e photo opportunity con i cosplayer.',gallery:['assets/community-disney-stand.jpg','assets/community-disney-face-painting.jpg']},{title:'Raduni ed eventi speciali',description:'Raduni cosplay inclusivi e presenze coordinate in occasione di manifestazioni, anteprime e proiezioni speciali.',gallery:['assets/community-disney-gathering.jpg','assets/community-disney-special-events.jpg']}]
  },
  {
    slug:'kpop-exorcists-community',name:'K-Pop Exorcists Community',eyebrow:'K-pop · cosplay · community',
    description:'La community italiana dedicata a KPop Demon Hunters riunisce fan e cosplayer con raduni, performance, meet & greet e attività musicali.',
    details:'Una proposta dedicata ai fan di KPop Demon Hunters che unisce cosplay, musica e partecipazione. Può includere raduni, performance, dance moment, meet & greet, giochi e contenuti fotografici pensati per coinvolgere anche famiglie e pubblico giovane.',
    instagram:'https://www.instagram.com/kpop_exorcists_community/',logo:'assets/community-kpop-logo.jpg',cover:'assets/community-kpop-event-01.png',
    activities:['Raduni cosplay','Performance e dance','Meet & greet','Attività per fan e famiglie'],gallery:['assets/community-kpop-event-01.png','assets/community-kpop-event-02.png'],thematicEnabled:true,
    thematicAreas:[{title:'Raduni e photo opportunity',description:'Incontri dedicati ai fan di KPop Demon Hunters con cosplay di gruppo, fotografie, momenti di condivisione e coinvolgimento del pubblico.',gallery:['assets/community-kpop-event-01.png','assets/community-kpop-event-02.png']}]
  },
  {
    slug:'dreamworksverse-cosplay',name:'DreamWorksVerse Cosplay',eyebrow:'DreamWorks · cosplay · community',
    description:'Una community che riunisce i mondi dell’animazione DreamWorks attraverso cosplay, raduni e attività partecipative per il pubblico.',
    details:'DreamWorksVerse Cosplay porta in fiera personaggi e universi dell’animazione DreamWorks. Raduni, giochi, photo opportunity e attività partecipative possono essere combinati in un programma adatto a palco, area tematica o spazio community.',
    instagram:'https://www.instagram.com/dreamworksverse_cosplay/',logo:'assets/community-dreamworks-logo.jpg',cover:'assets/community-dreamworks-logo.jpg',
    activities:['Raduni a tema','Cosplay e photo opportunity','Giochi con la community'],gallery:[],thematicEnabled:true,thematicAreas:[]
  },
  {
    slug:'skepsis-gaming',name:'Skepsis Gaming',eyebrow:'Gaming · esports · community',
    description:'Una community gaming pronta a coinvolgere il pubblico con tornei, sfide, momenti competitivi e attività condivise in fiera.',
    details:'Skepsis Gaming sviluppa attività dedicate al gaming competitivo e alla partecipazione dal vivo. La presenza può comprendere tornei, sfide aperte, momenti con player e coach, commento delle partite e animazione di un’area gaming personalizzata.',
    instagram:'https://www.instagram.com/skepsis_gaming/',logo:'assets/community-skepsis-logo.jpg',cover:'assets/community-skepsis-logo.jpg',
    activities:['Tornei e sfide','Gaming area','Attività con la community'],gallery:[],thematicEnabled:false,thematicAreas:[]
  }
];
try{const saved=JSON.parse(localStorage.getItem('c3_communities')||'null');window.C3_COMMUNITIES=Array.isArray(saved)?saved.map(item=>{const initial=window.C3_COMMUNITIES_DEFAULTS.find(entry=>entry.slug===item.slug)||{};const merged={...initial,...item,details:item.details||initial.details||item.description,thematicEnabled:item.slug==='skepsis-gaming'?false:item.thematicEnabled!==false,thematicAreas:Array.isArray(item.thematicAreas)?item.thematicAreas:(initial.thematicAreas||[])};if(merged.gallery?.length===1&&merged.gallery[0]===merged.logo)merged.gallery=[];if(item.slug==='hellaverse-italian-community'){merged.gallery=[...new Set([...(initial.gallery||[]),...(merged.gallery||[])])];if(!item.cover||item.cover==='assets/community-hazbin-05.jpg')merged.cover=initial.cover}if(item.slug==='kpop-exorcists-community'){if(!merged.gallery?.length)merged.gallery=initial.gallery||[];if(!item.cover||item.cover===item.logo)merged.cover=initial.cover;if(!merged.thematicAreas?.length)merged.thematicAreas=initial.thematicAreas||[]}return merged}):window.C3_COMMUNITIES_DEFAULTS.map(item=>({...item}))}catch{window.C3_COMMUNITIES=window.C3_COMMUNITIES_DEFAULTS.map(item=>({...item}))}

// Unregelmäßige Verben aus dem Buch: Grundform, Simple Past, Past Participle, Deutsch.
// Mehrere akzeptierte Schreibweisen einer Form stehen mit | getrennt.
(function (root) {
  const rows = [
    ["be", "was|were", "been", "sein"],
    ["beat", "beat", "beaten", "besiegen; schlagen"],
    ["become", "became", "become", "werden"],
    ["bring", "brought", "brought", "bringen; mitbringen"],
    ["build", "built", "built", "bauen"],
    ["buy", "bought", "bought", "kaufen"],
    ["catch", "caught", "caught", "fangen; erwischen"],
    ["choose", "chose", "chosen", "(aus)wählen"],
    ["come", "came", "come", "kommen"],
    ["cost", "cost", "cost", "kosten"],
    ["do", "did", "done", "machen; tun"],
    ["draw", "drew", "drawn", "zeichnen"],
    ["drink", "drank", "drunk", "trinken"],
    ["drive", "drove", "driven", "fahren; treiben"],
    ["eat", "ate", "eaten", "essen"],
    ["fall", "fell", "fallen", "fallen; hinfallen"],
    ["feed", "fed", "fed", "füttern"],
    ["feel", "felt", "felt", "(sich) fühlen"],
    ["fight", "fought", "fought", "kämpfen; (sich) streiten"],
    ["find", "found", "found", "finden"],
    ["fly", "flew", "flown", "fliegen"],
    ["forget", "forgot", "forgotten", "vergessen"],
    ["get", "got", "got", "bekommen; werden; kommen"],
    ["give", "gave", "given", "geben"],
    ["go", "went", "gone", "gehen; fahren"],
    ["hang", "hung", "hung", "hängen"],
    ["have", "had", "had", "haben; besitzen"],
    ["hear", "heard", "heard", "hören"],
    ["hide", "hid", "hidden", "(sich) verstecken"],
    ["hit", "hit", "hit", "treffen; schlagen"],
    ["hold", "held", "held", "halten; festhalten"],
    ["keep", "kept", "kept", "behalten; aufbewahren; halten"],
    ["know", "knew", "known", "kennen; wissen"],
    ["leave", "left", "left", "abfahren; verlassen; lassen"],
    ["lose", "lost", "lost", "verlieren"],
    ["make", "made", "made", "machen; tun; bilden"],
    ["meet", "met", "met", "kennen lernen; (sich) treffen"],
    ["pay", "paid", "paid", "bezahlen"],
    ["put", "put", "put", "setzen; legen; stellen"],
    ["read", "read", "read", "lesen"],
    ["ride", "rode", "ridden", "fahren; reiten"],
    ["run", "ran", "run", "rennen; laufen; fahren"],
    ["say", "said", "said", "sagen; sprechen"],
    ["see", "saw", "seen", "sehen"],
    ["sell", "sold", "sold", "verkaufen"],
    ["send", "sent", "sent", "schicken; senden"],
    ["shine", "shone", "shone", "scheinen; glänzen"],
    ["show", "showed", "shown|showed", "zeigen"],
    ["sing", "sang", "sung", "singen"],
    ["sit", "sat", "sat", "sich hinsetzen; sich setzen"],
    ["sleep", "slept", "slept", "schlafen"],
    ["speak", "spoke", "spoken", "sprechen"],
    ["spend", "spent", "spent", "ausgeben; verbringen"],
    ["stand", "stood", "stood", "stehen"],
    ["steal", "stole", "stolen", "stehlen"],
    ["swim", "swam", "swum", "schwimmen"],
    ["take", "took", "taken", "nehmen; mitnehmen"],
    ["teach", "taught", "taught", "unterrichten; lehren; beibringen"],
    ["tell", "told", "told", "erzählen; sagen"],
    ["think", "thought", "thought", "denken; glauben"],
    ["throw", "threw", "thrown", "werfen"],
    ["understand", "understood", "understood", "verstehen"],
    ["wake up", "woke up|woke", "woken up|woken", "aufwachen"],
    ["wear", "wore", "worn", "anhaben; tragen"],
    ["win", "won", "won", "gewinnen; siegen"],
    ["write", "wrote", "written", "schreiben"]
  ];

  const verbs = rows.map(([infinitive, past, participle, german]) => {
    const forms = [infinitive, past, participle].map(form => form.split("|"));
    forms[0].push(`to ${infinitive}`);
    return {
      id: `verb-${infinitive.replace(/\s+/g, "-")}`,
      german,
      forms,
      shown: [infinitive, past, participle].map(form => form.split("|").join(" / "))
    };
  });

  if (typeof module !== "undefined" && module.exports) module.exports = verbs;
  else root.RQ_VERBS = verbs;
})(typeof window !== "undefined" ? window : globalThis);

const input = document.querySelector("input");
const letters = Array.from(document.querySelectorAll("[data-letters]"));
const specs = Array.from(document.querySelectorAll("[data-spec]"));

const text = `Думи мої, думи мої, Лихо мені з вами!Нащо стали на папері Сумними рядами?..Чом вас вітер не розвіяв 
В степу, як пилину? Чом вас лихо не приспало,Як свою дитину?...За карії оченята,За чорнії бровиСерце рвалося, сміялось,
Виливало мову, Виливало, як уміло,За темнії ночі,За вишневий сад зелений,За ласки дівочі...За степи та за могили,
Що на Україні, Серце мліло, не хотілоСпівать на чужині... Не хотілось в снігу, в лісі,Козацьку громаду 
З булавами, з бунчугами Збирать на пораду.Нехай душі козацькіїВ Украйні витають – Там широко,
там веселоОд краю до краю...  Як та воля, що минулась,Дніпр широкий – море,Степ і степ, ревуть пороги,І могили – гори,
 – Там родилась, гарцювалаКозацькая воля; Там шляхтою, татарами Засідала поле,Засівала трупом поле,Поки не остило...`;

const party = createParty();
console.log(party);

init();

function init() {
    input.addEventListener("keydown", keydownHandler);
    input.addEventListener("keyup", keyupHandler);
}

function keydownHandler(event) {
    event.preventDefault();

    const letter = letters.find((x) => x.dataset.letters.includes(event.key));
    
    if (letter) {
        letter.classList.add("pressed");
        return;
    }

    let key = event.key.toLowerCase();

    if (key === " ") {
        key = "space";
    }

    const ownSpecs = specs.filter((x) => x.dataset.spec === key);
    if (ownSpecs.lenght) {
        ownSpecs.forEach(spec => spec.classList.add("pressed"));
        return;
    }

    console.warn("404".event);
}

function keyupHandler(event) {
    event.preventDefault();

    const letter = letters.find((x) => x.dataset.letters.includes(event.key));
    
    if (letter) {
        letter.classList.remove("pressed");
        return;
    }

    let key = event.key.toLowerCase();

    if (key === " ") {
        key = "space";
    }

    const ownSpecs =  specs.filter((x) => x.dataset.spec === key);
    if (ownSpecs) {
        ownSpecs.forEach(spec => spec.classList.remove("pressed"));
        return;
    }
}

function createParty (text) {
    const party = {
        text,
        strings: [],
        maxStringLength: 70,
        maxShowStrings: 3,
        currentStringIndex: 0,
        currentPrintedIndex: 0,
        erros: [],
    };

    party.text = party.text.replace(/\n/g, "\n ");
    const words = party.text.split(" ");
    let string = [];
    for (const word of words) {
        const newStringLength = [...string, word].join(" ").lenght + !word.includes("\n");
        
        if(newStringLength > party.maxStringLength) {
            party.strings.push(string.join(" ") + " ");
            string = [];
        }
        string.push(word);

        if (word.includes('\n')) {
            party.strings.push(string.join(" "));
            string = [];
        }
    }

    if (string.length) {
        party.strings.push(string.join(" "));
    }

    console.log(words);

    return party;
}
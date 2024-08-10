const typingtext = document.querySelector('.typing-text p')
const input = document.querySelector('.wrapper .input-field');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')
let timer;
let maxtime=60;
let timeleft = maxtime;
let charIndex =0;
let mistake=0;
let istyping = false;



function loadparagraph(){
    const paragraph = [
        "The quick brown fox jumps over the lazy dog.",
        "She sells seashells by the seashore.",
        "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
        "A journey of a thousand miles begins with a single step.",
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "You can't judge a book by its cover.",
        "A picture is worth a thousand words.",
        "Actions speak louder than words.",
        "Beauty is in the eye of the beholder."
    ];
    
    function generateParagraph(numberOfSentences) {
        let selectedSentences = [];
        for (let i = 0; i < numberOfSentences; i++) {
            const randomIndex = Math.floor(Math.random() * paragraph.length);
            selectedSentences.push(paragraph[randomIndex]);
        }
        return selectedSentences.join(' ');
    }
    
    
    const generatedParagraph = generateParagraph(10);  
    
    typingtext.innerHTML = '';
    for (const char of generatedParagraph) {
        typingtext.innerHTML += `<span>${char}</span>`;
    }
    
        typingtext.querySelectorAll('span')[0].classList.add('active')
        document.addEventListener('keydown',()=>input.focus())
        typingtext.addEventListener('click',()=>{
            input.focus();
        })
        
}

function inittyping(){
    const char = typingtext.querySelectorAll('span');
    const type =input.value.charAt(charIndex);
    if(charIndex <char.length && timeleft>0){

     if(!istyping){
        timer = setInterval(inittime,1000);
        istyping=true;
     }



        if(char[charIndex].innerText === type){
            char[charIndex].classList.add('correct');
            

        }
        else{
            mistake++;

            char[charIndex].classList.add('incorrect');
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText = mistake;
        cpm.innerText = charIndex-mistake;


    }
    else{
  clearInterval(timer)
  input.value="";

    }

}
function inittime(){
    if(timeleft>0){
        timeleft--;
        time.innerHTML=timeleft;
    const Wpm = Math.round(((charIndex-mistake)/5)/(maxtime-timeleft)*60);
    wpm.innerText = Wpm;


    }
    else{
        clearInterval(timer);
    }

}
function reset(){
    loadparagraph();
    clearInterval(timer);
    timeleft=maxtime;
    time.innerText=timeleft;
    input.value='';
    charIndex=0;
    mistake=0;
    istyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistake.innerText=0;


}

input.addEventListener('input',inittyping);
btn.addEventListener('click',reset);


loadparagraph();

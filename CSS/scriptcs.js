//gerekli ogelerin secimi
const basla_btn = document.querySelector(".basla_btn button");
const bilgi_kart = document.querySelector(".bilgi_kart");
const cikis_btn = bilgi_kart.querySelector(".butonlar .cikis");
const devam_btn = bilgi_kart.querySelector(".butonlar .bastan");
const soru_karti = document.querySelector(".soru_karti");
const sonuc_karti = document.querySelector(".sonuc_karti");
const sec_list = document.querySelector(".sec_list");
const sure_don = document.querySelector("header .sure_don");
const sureYaz = document.querySelector(".sure .sure_kal");
const sureHes = document.querySelector(".sure .sure_sn");

// Teste basla butonuna bastigimizi varsayarsak
basla_btn.onclick = () => {
    bilgi_kart.classList.add("aktifBilgi"); //Bilgi kutusunu goster
}

// Testten cikis butonuna bastigimizi varsayarsak
cikis_btn.onclick = () => {
    bilgi_kart.classList.remove("aktifBilgi"); //Bilgi kutusunu gizle
}

// Devam butonuna bastigimizi varsayarsak
devam_btn.onclick = () => {
    bilgi_kart.classList.remove("aktifBilgi"); //Bilgi kutusunu gizle
    soru_karti.classList.add("aktifTest"); //Soru kutusunu goster
    showQuetions(0); //Soru gosterme fonk cagir
    queCounter(1);
    surebasla(15); //surebasla fonk cagiriyoruz
    sureakis(0); //sureakis fonk cagiriyoruz
}

// var kullanmama sebebim: let ile tanımlanan bir degiskeni tekrar tanımlayamayiz ancak degerini guncelleyebiliriz.
let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

// const bir degiskene ilk atamayi yaptiktan sonra herhangi bir atama yapmanizi engeller.
const test_basla = sonuc_karti.querySelector(".butonlar .bastan");
const test_cikis = sonuc_karti.querySelector(".butonlar .cikis");

// Testi tekrar coz butonuna tikladigimizi varsayarsak
test_basla.onclick = () => {
    soru_karti.classList.add("aktifTest"); //Soru kutusunu gosterir
    sonuc_karti.classList.remove("aktifSonuc"); //Sonuc kutusunu gizler
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //Soru gosterme fonk cagir
    queCounter(que_numb);
    clearInterval(counter); //sayaci temizler
    clearInterval(counterLine); //sayac dilimini temizler
    surebasla(timeValue); //surebasla fonk cagiriyoruz
    sureakis(widthValue); //sureakis fonk cagiriyoruz
    sureYaz.textContent = "Kalan Sure"; //Kalan sureyi gostermemizi saglar
    snr_btn.classList.remove("show"); //Siradaki butonunu gizler
}

// Testten cikis butonuna bastigimizi varsayarsak
test_cikis.onclick = () => {
    window.location.reload(); //Mevcut penceriyi tekrar yukler
}

const snr_btn = document.querySelector("footer .snr_btn");
const bottom_ques_counter = document.querySelector("footer .top_soru");

// Siradakş soru butonuna bastigimizi varsayarsak
snr_btn.onclick = () => {
    if (que_count < questions.length - 1) { //Turkce olarak demek istedim ki test daha bitmemise 
        que_count++;
        que_numb++;
        showQuetions(que_count); //Soru gosterme fonk cagir
        queCounter(que_numb);
        clearInterval(counter); //sayaci temizler
        clearInterval(counterLine); //sayac dilimini temizler
        surebasla(timeValue); //surebasla fonk cagiriyoruz
        sureakis(widthValue); //sureakis fonk cagiriyoruz
        sureYaz.textContent = "Kalan Sure";
        snr_btn.classList.remove("show"); //Siradaki butonunu gizler
    } else {
        clearInterval(counter); //sayaci temizler
        clearInterval(counterLine); //sayac dilimini temizler
        showResult(); //showResult fonk cagirir (sonuclari gosterme fonk)
    }
}


function showQuetions(index) {
    const soru_metin = document.querySelector(".soru_metin");


    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[1] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[2] + '</span></div>' +
        '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    soru_metin.innerHTML = que_tag;
    sec_list.innerHTML = option_tag;

    const option = sec_list.querySelectorAll(".option");

    //Secilebilmeye uygun secenekleri hazirla
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// Iconlarim icin yeni div etiketleri
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//Kullanici bir secenege TIKLADIGINDA
function optionSelected(answer) {
    clearInterval(counter); //sayaci temizler
    clearInterval(counterLine); //sayac dilimini temizler
    let userAns = answer.textContent; //Kullanicinin sectigi secenegi getirir
    let correcAns = questions[que_count].answer; //Diziden dogru cevabi sec
    const allOptions = sec_list.children.length; //Secenekleri sergile 

    if (userAns == correcAns) { //Kullanicinin cevabi ile dogru cevabi karsilastiriyoruz ve aynı cikiyor
        userScore += 1; //Cevab dogru oldugu icin kullanicinin puanina 1 ekliyoruz.
        answer.classList.add("correct"); //Kullanicinin sectigi cevab dogru oldugu icin yesilleniyor.
        answer.insertAdjacentHTML("beforeend", tickIconTag); //Dogru cevap iconu ekleniyor
        console.log("Correct Answer");
        console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); //Kullanicinin sectigi cevap yanlis oldugu icin kirmizilaniyor.
        answer.insertAdjacentHTML("beforeend", crossIconTag); //Yanlis cevap iconu ekleniyor
        console.log("Wrong Answer");

        for (i = 0; i < allOptions; i++) {
            if (sec_list.children[i].textContent == correcAns) {
                sec_list.children[i].setAttribute("class", "option correct");
                sec_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        sec_list.children[i].classList.add("disabled"); //Kullanici cevabini sectiginde kalan tüm secenekleri secilemez yap
    }
    snr_btn.classList.add("show"); //Kullanici cevabini sectiyse sonraki butonunu sergile
}

function showResult() {
    bilgi_kart.classList.remove("aktifBilgi"); //Bilgi kutusunu gizle
    soru_karti.classList.remove("aktifTest"); //Soru kutusunu gizle
    sonuc_karti.classList.add("aktifSonuc"); //Sonuc kutusunu goster
    const scoreText = sonuc_karti.querySelector(".puan");
    if (userScore > 3) { // Kullanicinin puani 3 ustuyse
        let scoreTag = '<span> Tebrikler! 🎉, Puaniniz: <p>' + userScore + '</p> / <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 1) { // Kullanicinin puani 1 ustuyse
        let scoreTag = '<span> Puanınız: <p>' + userScore + '</p> / <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else { // Kullanicinin puani 1den az ise 
        let scoreTag = '<span> Puanınız: <p>' + userScore + '</p> / <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function surebasla(time) {
    counter = setInterval(sure, 1000);

    function sure() {
        sureHes.textContent = time; //changing the value of sureHes with time value
        time--; //Surenin degerini 1 azalt 
        if (time < 9) { //Sure 9dan az ise 
            let addZero = sureHes.textContent;
            sureHes.textContent = "0" + addZero; //Sure degerinin basina 0 koy ( Surenin 01,02 seklinde gorunmesi icin)
        }
        if (time < 0) { //if sure is less than 0
            clearInterval(counter); //sayaci temizler
            sureYaz.textContent = "Time Off"; //Zaman textini zamana gore guncelle
            const allOptions = sec_list.children.length;
            let correcAns = questions[que_count].answer;
            for (i = 0; i < allOptions; i++) {
                if (sec_list.children[i].textContent == correcAns) {
                    sec_list.children[i].setAttribute("class", "option correct");
                    sec_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                sec_list.children[i].classList.add("disabled"); //Kullanici cevabini sectiginde kalan tüm secenekleri secilemez yap
            }
            snr_btn.classList.add("show"); //Kullanici cevabini sectiyse sonraki butonunu sergile
        }
    }
}

function sureakis(time) {
    counterLine = setInterval(sure, 29);

    function sure() {
        time += 1; //Surenin degerini 1 arttirir
        sure_don.style.width = time + "px"; //Zamana px kadar deger ekleme(sure arttiriyor)
        if (time > 549) { //Sure deger olarak 549'dan buyuk ise
            clearInterval(counterLine); //sayac dilimini temizler
        }
    }
}

function queCounter(index) {

    let totalQueCounTag = '<span>Bulundugunuz soru: <p>' + index + '&nbsp; </p>Toplam soru:<p>' + questions.length;
    bottom_ques_counter.innerHTML = totalQueCounTag;
}
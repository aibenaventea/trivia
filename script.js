let categorySection1 = document.querySelector(".category1");
let categorySection2 = document.querySelector(".category2");
let categorySection3 = document.querySelector(".category3");

// let questionsE = document.querySelectorAll(".question-e");
// // console.log(questionsE);
// let questionsM = document.querySelectorAll(".question-m");
// // console.log(questionsM);
// let questionsH = document.querySelectorAll(".question-h");
// console.log(questionsH);
// let totalPoints = document.querySelector(".points")
// console.log(totalPoints);
let categorias = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32]
const category1 = categorias[Math.floor(Math.random() * categorias.length)];
const category2 = categorias[Math.floor(Math.random() * categorias.length)];
const category3 = categorias[Math.floor(Math.random() * categorias.length)];

function getTrivia() {
    let urlCategory1 = `https://opentdb.com/api.php?amount=30&category=${category1}&type=multiple`;
    apiTrivia(urlCategory1,1);
    let urlCategory2 = `https://opentdb.com/api.php?amount=30&category=${category2}&type=multiple`;
    apiTrivia(urlCategory2,2);
    let urlCategory3 = `https://opentdb.com/api.php?amount=30&category=${category3}&type=multiple`;
    apiTrivia(urlCategory3,3);
}

const apiTrivia = async (url,categoryIndex) => {
    let response = await fetch(url);
    let userJson = await response.json();
    let arrCategory = userJson.results;
    let userJsonIndex = arrCategory.length - 1;
    let arrEasyQ = [];
    let arrMediumQ = [];
    let arrHardQ = [];

    while (userJsonIndex > 0) {
        if (arrCategory[userJsonIndex].difficulty == "easy") {
            arrEasyQ.push(arrCategory[userJsonIndex]);
        } else if (arrCategory[userJsonIndex].difficulty == "medium") {
            arrMediumQ.push(arrCategory[userJsonIndex]);
        } else if (arrCategory[userJsonIndex].difficulty == "hard") {
            arrHardQ.push(arrCategory[userJsonIndex]);
        }
        userJsonIndex--;
    }
    let easyQ = selectQuestion(arrEasyQ)
    let mediumQ = selectQuestion(arrMediumQ)
    let hardQ = selectQuestion(arrHardQ)
    if(categoryIndex==1){
        categorySection1.innerHTML = generateHTML(easyQ, mediumQ, hardQ)
    }else if(categoryIndex==2){
        categorySection2.innerHTML = generateHTML(easyQ, mediumQ, hardQ)
    }else if(categoryIndex==3){
        categorySection3.innerHTML = generateHTML(easyQ, mediumQ, hardQ)
    }
}

function selectQuestion(arrDifficultyQ) {
    if (arrDifficultyQ[0].difficulty == "easy") {
        let easyQ = arrDifficultyQ[Math.floor(Math.random() * arrDifficultyQ.length)];
        return easyQ;
    } else if (arrDifficultyQ[0].difficulty == "medium") {
        let mediumQ = arrDifficultyQ[Math.floor(Math.random() * arrDifficultyQ.length)];
        return mediumQ;
    } else if (arrDifficultyQ[0].difficulty == "hard") {
        let hardQ = arrDifficultyQ[Math.floor(Math.random() * arrDifficultyQ.length)];
        return hardQ;
    }
}

function generateHTML(easyQ, mediumQ, hardQ) {
    let categoryQuestionsInsert = `
                                    <h2 class="title-section">${easyQ.category}</h2>
                                    <article class="question-e">
                                        <span class="ponintsQ">100</span>
                                        <p class="question">${easyQ.question}
                                            <form class="alternatives">
                                                <input class="alternative" type="radio" name="easyQ" >${easyQ.incorrect_answers[0]}<br>
                                                <input class="alternative" type="radio" name="easyQ" >${easyQ.incorrect_answers[2]}<br>
                                                <input class="alternative" type="radio" name="easyQ" >${easyQ.correct_answer}<br>
                                                <input class="alternative" type="radio" name="easyQ" >${easyQ.incorrect_answers[1]}<br>
                                            </form>
                                        </p>
                                    </article>
                                    <article class="question-m">
                                        <span class="ponintsQ">200</span>
                                        <p class="question">${mediumQ.question}
                                            <form class="alternatives">
                                                <input class="alternative" type="radio" name="mediumQ" >${mediumQ.incorrect_answers[0]}<br>
                                                <input class="alternative" type="radio" name="mediumQ" >${mediumQ.incorrect_answers[2]}<br>
                                                <input class="alternative" type="radio" name="mediumQ" >${mediumQ.correct_answer}<br>
                                                <input class="alternative" type="radio" name="mediumQ" >${mediumQ.incorrect_answers[1]}<br>
                                            </form>
                                        </p>
                                    </article>
                                    <article class="question-h">
                                        <span class="ponintsQ">300</span>
                                        <p class="question">${hardQ.question}
                                            <form class="alternatives">
                                                <input class="alternative" type="radio" name="hardQ" >${hardQ.incorrect_answers[0]}<br>
                                                <input class="alternative" type="radio" name="hardQ" >${hardQ.incorrect_answers[2]}<br>
                                                <input class="alternative" type="radio" name="hardQ" >${hardQ.correct_answer}<br>
                                                <input class="alternative" type="radio" name="hardQ" >${hardQ.incorrect_answers[1]}<br>
                                            </form>
                                        </p>
                                    </article>
                                    `
    return categoryQuestionsInsert;
}

getTrivia();

// questionsE.addEventListener("click", () => {
//     selectQuestion()
// });

// questionsM.addEventListener("click", () => {
//     selectQuestion()
// });

// questionsH.addEventListener("click", () => {
//     selectQuestion()
// });

//document.getElementById("prior_p").addEventListener("input", updateEquation);
//document.getElementById("prior_q").addEventListener("input", updateEquation);

function calculateBayesFactor() {
    let prior_p = parseFloat(document.getElementById("prior_p").value);
    let prior_q = parseFloat(document.getElementById("prior_q").value);
    let sn = parseFloat(document.getElementById("sensitivity").value);
    let fpr = parseFloat(document.getElementById("fpr").value);
    
    if (prior_p > 0 && prior_q > 0 && fpr >0 && sn>0) {
        let bayesFactor = (sn/fpr) ;
        res = bayesFactor*prior_p
        let probability_result = oddsToProb(((prior_p*bayesFactor))/prior_q)
        document.getElementById("result").innerText = "Bayes Factor: " + bayesFactor.toFixed(3) + ". Odds:" + (res)+":"+(res+prior_q )+ ". Probability of event given positive test: " + (probability_result*100)+ "%";
        updateGrid(probability_result*100);

    } else {
        document.getElementById("result").innerText = "Error: Likelihood values must be greater than 0.";
    }

    
}



function oddsToProb(odds){
    prob =  (odds/(1+odds));
    return prob;
}

//Create the grid of people 
function createGrid() {
    const grid = document.getElementById("grid-container");
    grid.innerHTML = "";  // Clear previous grid
    for (let i = 0; i < 100; i++) {
        let div = document.createElement("div");
        div.classList.add("person");
        grid.appendChild(div);
    }
}

function updateGrid(percent) {
    const people = document.querySelectorAll(".person");
    people.forEach((person, index) => {
        person.classList.toggle("highlighted", index < percent);
    });
}

createGrid();  // Initialize the grid


//SO, first ask if they want to have it as odds or probability

//Odds p/q
/*
updateEquation();  // Update once on load


function updateEquation() {
    let p = document.getElementById("prior_p").value;
    let q = document.getElementById("prior_q").value;
    let bayesFactor = (q != 0) ? (p / q).toFixed(2) : "\\infty";

    document.getElementById("mathjax-output").innerHTML = `
        \[
        \\frac{P(+ | \\text{Cancer})}{P(+ | \\text{No Cancer})} = 
        \\frac{${p}}{${q}} = ${bayesFactor}
        \]
    `;

    MathJax.typeset();
}
*/
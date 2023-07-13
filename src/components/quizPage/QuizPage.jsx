import { useEffect, useState } from "react";
import styleQuizPage from "./QuizPage.module.css";

function restboderbtn() {
  const allbtn = ["option1", "option2", "option3", "option4"];
  allbtn.forEach((btn) => {
    document.getElementById(btn).style.border = "none";
  });
}
function shuffleArray() {
  const textbtn = ["option1", "option2", "option3", "option4"];
  for (let i = textbtn.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [textbtn[i], textbtn[j]] = [textbtn[j], textbtn[i]];
  }
  return textbtn;
}
function Button(propse) {
  const allbtn = ["option1", "option2", "option3", "option4"];
  function checkanswe(event) {
    const btnclick = event.target.id;
    console.log(
      event.target.innerHTML,
      propse.allqus[propse.indexqustion].correct_answer,
      propse.indexqustion
    );
    if (
      event.target.innerHTML ===
      propse.allqus[propse.indexqustion].correct_answer
    ) {
      propse.checkbtn(true);
    } else {
      propse.checkbtn(false);
    }
    allbtn.forEach((btn) => {
      if (btnclick === btn) {
        event.target.style.border = "3px solid green";
      } else {
        document.getElementById(btn).style.border = "none";
      }
    });
  }
  return (
    <>
      <div className={styleQuizPage.cardQuiz}>
        <div className={styleQuizPage.bodyquiz}>
          <div>
            <button onClick={checkanswe} id="option1">
              {propse.qustion[propse.shuffleArray[0]]}
            </button>
          </div>
          <div>
            <button onClick={checkanswe} id="option2">
              {propse.qustion[propse.shuffleArray[1]]}
            </button>
          </div>
          <div>
            <button onClick={checkanswe} id="option3">
              {propse.qustion[propse.shuffleArray[2]]}
            </button>
          </div>
          <div>
            <button onClick={checkanswe} id="option4">
              {propse.qustion[propse.shuffleArray[3]]}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function QuizPage(propse) {
  const [check, setchack] = useState(false);
  const [arry, setarry] = useState(shuffleArray());
  const [qustioninfo, setqustioninfo] = useState({
    qustion: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
  });
  const [allqustion, setallqustion] = useState([]);
  const [countqustion, setcountqustion] = useState(0);
  const [currenqustion, setcurrenqustion] = useState(0);
  const [indexqustion, setindexqustion] = useState(1);
  const [checkPlayAgain,setCheckPlayAgain] = useState(false)
  useEffect(() => {
    
      setqustioninfo({
        qustion: propse.data[0].question,
        option1: propse.data[0].correct_answer,
        option2: propse.data[0].incorrect_answers[0],
        option3: propse.data[0].incorrect_answers[1],
        option4: propse.data[0].incorrect_answers[2],
      });
      setallqustion(propse.data);
      setcountqustion(propse.data.length);
      document.getElementById("loding").style.display = "none";
    
  }, []);
  function nextqustion(event) {
    restboderbtn();
    setindexqustion((priview) => {
      if (priview + 1 < allqustion.length) {
        return priview + 1;
      } else if(priview + 1 === allqustion.length){
        event.target.innerHTML="End of the exam";
        setCheckPlayAgain(true);
      }
      if(checkPlayAgain) {
        const portalElement = document.getElementById("portal-finish-modale");
        portalElement.style.display = "flex";
        portalElement.querySelector("h5").innerHTML = `You answered ${
          (currenqustion / countqustion) * 100
        }%`;
        portalElement.querySelector("button").onclick = ()=>{
          document.getElementById("portal-finish-modale").style.display = "none";
          propse.setstartgame(false)
        };
      }
      return priview;
    });
    setqustioninfo({
      qustion: allqustion[indexqustion].question,
      option1: allqustion[indexqustion].correct_answer,
      option2: allqustion[indexqustion].incorrect_answers[0],
      option3: allqustion[indexqustion].incorrect_answers[1],
      option4: allqustion[indexqustion].incorrect_answers[2],
    });
    setarry(shuffleArray());
    if (check) {
      setcurrenqustion((priview) => priview + 1);
      setchack(false);
    }
  }
  return (
    <>
      <div className={styleQuizPage.parent}>
        <div className={styleQuizPage.cardsetup}>
          <div className={styleQuizPage.correctAnswer}>
            Correct Answer: {currenqustion}/{countqustion}
          </div>
          <h2 className={styleQuizPage.qustion}>{qustioninfo.qustion}</h2>
          <Button
            qustion={qustioninfo}
            allqus={allqustion}
            checkbtn={setchack}
            indexqustion={indexqustion - 1}
            shuffleArray={arry}
          />
          <div className={styleQuizPage.nextQustion}>
            <button onClick={nextqustion}>Next Qusttions</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizPage;

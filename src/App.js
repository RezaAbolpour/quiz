import { useReducer,useState } from "react";
import "./App.css";
import QuizPage from "./components/quizPage/QuizPage";
import Setup from "./components/setup/Setup";
import axios from "axios";

async function getdat(state,option){
  if(option){
  document.getElementById("loding").style.display = "flex";
  const url = `https://opentdb.com/api.php?amount=${option[0]}&category=${option[1]}&difficulty=${option[2]}&type=multiple`;
  const response = await axios.get(url)
  console.log(response.data.results);
  return response.data.results
}else{
  return false
}
}
function App() {
  const [startgame, setstartgame] = useState(false);
  const [checkPlay, setCheckPlay] = useState(false);

  async function getdat(option){
    if(option){
    document.getElementById("loding").style.display = "flex";
    const url = `https://opentdb.com/api.php?amount=${option[0]}&category=${option[1]}&difficulty=${option[2]}&type=multiple`;
    const response = await axios.get(url)
    console.log(response.data.results);
    setstartgame(response.data.results)
  }else{
    setCheckPlay(option)
  }
  }

  return (
    <div>
      {!startgame ? <Setup onclick={getdat} /> : <QuizPage data={startgame} setstartgame={setstartgame}/>}
    </div>
  );
}

export default App;

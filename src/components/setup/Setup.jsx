import stylesetup from "./setup.module.css";
function Setup(propse) {
  function starthandler() {
    const number = document.getElementById("numberqu");
    const category = document.getElementById("category");
    const difficlty = document.getElementById("difficlty");
    console.log(number.value, category.value, difficlty.value);
    propse.onclick([number.value, category.value, difficlty.value]);
  }
  return (
    <>
      <div className={stylesetup.parent}>
        <div className={stylesetup.cardsetup}>
          <h1>Setup Quiz</h1>
          <div className={stylesetup.bodysetup}>
            <div>
              <div className={stylesetup.titel}>Number of Qusetion</div>
              <input
                id="numberqu"
                placeholder="enter number qustion"
                className={stylesetup.numberinput}
              ></input>
            </div>
            <div>
              <div className={stylesetup.titel}>Category</div>
              <select className={stylesetup.selects} id="category">
                <option value="20">Mythology</option>
                <option value="21">Sport</option>
                <option value="22">Geograohy</option>
                <option value="27">Animals</option>
              </select>
            </div>
            <div>
              <div className={stylesetup.titel}>Difficlty</div>
              <select className={stylesetup.selects} id="difficlty">
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <button className={stylesetup.btnorange} onClick={starthandler}>
              Start
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Setup;

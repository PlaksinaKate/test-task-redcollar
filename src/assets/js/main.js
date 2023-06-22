let countDown;
let secondsLeft;
let isInterruptBtnClicked = false;
let isStopBtnClicked = false;

const timerShow = document.querySelector('.timer__timer-time-left');
const timerGoBtn = document.querySelector('.timer__timer-btn_go');
const interruptBtn = document.querySelector('.timer__timer-btn_interrupt');
const stopBtn = document.querySelector('.timer__timer-btn_stop');

const chillTitle = document.querySelector('.timer__timer-titles-chill');
const workTitle = document.querySelector('.timer__timer-title_work');

const workImg = document.querySelector('.timer__timer-img_work');
const chillImg = document.querySelector('.timer__timer-img_chill');

const longChillCheckbox = document.querySelector('.timer__long-chill-toggle')

const changeTimeBtn = document.querySelector('.timer__change-values-title')
const changeTimeFormBtn = document.querySelector('.timer__change-values-btn')
const changeTimeInputs = document.querySelector('.timer__change-values-inputs')
const changeTimeWorkInput = document.querySelector('.timer__change-values-input_work')
const changeTimeChillInput = document.querySelector('.timer__change-values-input_chill')
const changeTimeLongChillInput = document.querySelector('.timer__change-values-input_long-chill')

function timer(seconds) {
  const changeTimeWorkInputValue = changeTimeWorkInput.value;
  const changeTimeChillInputValue = changeTimeChillInput.value;
  const changeTimeLongChillInputValue = changeTimeLongChillInput.value;

  let secondsValue;
  if (chillTitle.classList.contains('hidden')) {
    workImg.classList.remove('hidden');
    secondsValue = getSecondsValue(changeTimeWorkInputValue, seconds, seconds)
  } else {
    if (longChillCheckbox.checked) {
      secondsValue = getSecondsValue(changeTimeLongChillInputValue, seconds, 900)
    } else {
      secondsValue = getSecondsValue(changeTimeChillInputValue, seconds, 300)
    }
  }

  timerGoBtn.classList.add('hidden');
  interruptBtn.classList.remove('hidden');
  stopBtn.classList.remove('hidden');

  const currentTime = Date.now();
  const endTime = currentTime + secondsValue * 1000;
  showTimer(secondsValue);

  countDown = setInterval(() => {
    secondsLeft = Math.round((endTime - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countDown);
      if (secondsValue === 1500 || secondsValue === changeTimeWorkInputValue * 60) {
        workTitle.classList.add('hidden');
        chillTitle.classList.remove('hidden');
        workImg.classList.add('hidden');
        chillImg.classList.remove('hidden');

        if (longChillCheckbox.checked) {
          secondsValue = getSecondsValue(changeTimeLongChillInputValue, 0, 900)
          timer(secondsValue)
        } else {
          secondsValue = getSecondsValue(changeTimeChillInputValue, 0, 300)
          timer(secondsValue)
        }

      } else {
        workTitle.classList.remove('hidden');
        chillTitle.classList.add('hidden');
        workImg.classList.remove('hidden');
        chillImg.classList.add('hidden');

        timer(secondsValue)
      }
      return
    }

    showTimer(secondsLeft)

  }, 1000)

  interruptBtn.onclick = () => {
    isInterruptBtnClicked = true
    clearInterval(countDown);
    timerGoBtn.classList.remove('hidden');
    interruptBtn.classList.add('hidden');
  }


  timerGoBtn.onclick = () => {
    if (isInterruptBtnClicked) {
      timer(secondsLeft)
    } else if (isStopBtnClicked) {
      secondsValue = getSecondsValue(changeTimeWorkInputValue, 0, 1500)
      timer(secondsValue)
      isStopBtnClicked = false
    } else {
      timer(secondsValue)
    }
  }


  stopBtn.onclick = () => {
    isStopBtnClicked = true;
    clearInterval(countDown);
    secondsValue = getSecondsValue(changeTimeWorkInputValue, 0, 1500);
    showTimer(secondsValue);
    workTitle.classList.remove('hidden');
    chillTitle.classList.add('hidden');
    timerGoBtn.classList.remove('hidden');
    interruptBtn.classList.add('hidden');
    stopBtn.classList.add('hidden');
    workImg.classList.add('hidden');
    chillImg.classList.add('hidden');

    return
  }

  changeTimeFormBtn.onclick = () => {
    showTimer(changeTimeWorkInputValue * 60);
    clearInterval(countDown);

    changeTimeFormBtn.classList.add('hidden');
    changeTimeInputs.classList.add('hidden');
    changeTimeBtn.classList.remove('hidden');
    workTitle.classList.remove('hidden');
    chillTitle.classList.add('hidden');
    timerGoBtn.classList.remove('hidden');
    interruptBtn.classList.add('hidden');
    stopBtn.classList.add('hidden');
    workImg.classList.add('hidden');
    chillImg.classList.add('hidden');

    return
  }

}

function showTimer(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;

  const show = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`

  timerShow.textContent = show;

}

changeTimeBtn.onclick = () => {
  changeTimeFormBtn.classList.remove('hidden');
  changeTimeInputs.classList.remove('hidden');
  changeTimeBtn.classList.add('hidden');
}


changeTimeFormBtn.onclick = () => {
  changeTimeFormBtn.classList.add('hidden');
  changeTimeInputs.classList.add('hidden');
  changeTimeBtn.classList.remove('hidden');
  const changeTimeWorkValue = changeTimeWorkInput.value
  showTimer(changeTimeWorkValue * 60);
}

function getSecondsValue(input, seconds, defaultSeconds) {
  if (isInterruptBtnClicked) {
    isInterruptBtnClicked = false
    return seconds
  } else {
    return input ? input * 60 : defaultSeconds
  }
}


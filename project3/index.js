let guess = 1;
let secret = 0;
let score = 10;
let highscore = 0;
let guesses = [];
function submit() {
  $(".history").append(`<li>${guess}</li>`);
  if (guess == secret) {
    $(".submit").unbind();
    $("body").removeClass("tension1");
    $(".fail").hide();
    $(".fail2").addClass("w-100");
    $(".submit").text("CONGRATS! NEW GAME?");
    $(".submit").click(newGame);
    $('img').attr('src','correct.png')
    $('.hint').text(`Your score is ${score}`)
    if (score > highscore) {
      highscore = score;
      $(".highscore").text(`High Score: ${highscore}`);
    }
  } else if (score == 0) {
    $(".submit").unbind();
    $("body").removeClass("tension");
    $(".fail").hide();
    $(".fail2").addClass("w-100");
    $(".submit").text("try again");
    $('img').attr('src','wrong.png')
    $(".submit").click(newGame);
    window.alert(`You lost, the number was ${secret}`);
  } else {
    $("body").removeClass("tension");
    console.log(guesses);
    if (!guesses.includes(guess)) {
      guesses.push(guess);
      score--;
      if (guess > secret) {
        $(".hint").text("Your guess is too high");
      } else {
        $(".hint").text("Your guess is too low");
      }
    } else {
      $(".hint").text("You already guessed this number!");
    }
  }
  $(".score").text(`Score: ${score}`);
}

function newGame() {
    $('.history').html('');
  score = 10;
  $(".score").text(`Score: ${score}`);
  secret = Math.floor(1 + Math.random() * 100);
  guesses = [];
  $("#guess").val('');
  $(".submit").unbind();
  $("body").css("background-color", "aqua");
  $("body").removeClass('tension1');
  $("body").removeClass('tension');
  $(".fail").show();
  $('img').attr('src','mia.png')
  $(".fail2").removeClass("w-100");
  $(".submit").text("Check");
  $(".submit").click(function (e) {
    guess = $("#guess").val();
    if ((guess <= 100) & (guess > 0)) {
      if (guess == secret) {
        $("body").addClass("tension1");
        $("body").css("background-color", "green");
      } else {
        $("body").css("background-color", "red");
        $("body").addClass("tension");
      }
      setTimeout(submit, 2000);
    } 
    else {
      $(".hint").text("Invalid Input! Enter a number between 1-100");
    }
  });
}
newGame();






function resize(x) {
  if (x.matches) {
    $(".score").addClass("d-inline-flex");
    $(".score").addClass("justify-content-center");
  } else {
    $(".score").removeClass("d-inline-flex");
    $(".score").removeClass("justify-content-center");
  }
}
let x = window.matchMedia("(max-width: 580px)");
resize(x);
x.addListener(resize);

$(".reset").click(function (e) {
  location.reload(true);
})

//Start -- removes start button when clicked
$("#start").on('click',function () {
    $('#start').remove();
    game.loadQuestion();
})

//clicking buttons and response
$(document).on('click','.answer-button',function(e){
    game.clicked(e);
})
$(document).on('click','#reset',function(){
    game.reset();
})


//Questions and answers -- stored in an array, imgs to come.
var questions = [{
                    question: "Who has won the most World Cup Titles?",
                    answers: ["Argentia - 9 titles", "Spain - 17 titles", "Germany - 5 titles", "Brazil - 5 titles"],
                    correctAnswer: "Brazil - 5 titles",
                    image: ""
                },{
                    question: "Who won the first World Cup and when?",
                    answers: ["Brazil, 1920", "Argentina, 1936", "Paraguay 1936", "Uruguay, 1930"],
                    correctAnswer: "Uruguay, 1930",
                    image: ""
                },{
                    question: "In 2014, how many people globally tuned into the World Cup?",
                    answers: ["5.6 Billion People","2.9 Billion People","3.2 Billion People","1.9 Billion People"],
                    correctAnswer: "3.2 Billion People",
                    image: ""
                },{
                    question: "Which Player has score the most Goals in the World Cup",
                    answers: ["Ronaldo, Brazil","Pele, Brazil","Lionel Messi, Argentina","Miroslav Klose, Germany"],
                    correctAnswer: "Miroslav Klose, Germany",
                    image: ""
                },{
                    question: "Who was the youngest player in the World Cup",
                    answers: ["Pele, Brazil - Aged 16","Norman Whiteside, North Ireland - Aged 17","Saloman Olembe, Cameroon - Aged 17","Samuel Eto'o, Cameroon - Aged 17"],
                    correctAnswer: "Norman Whiteside, North Ireland - Aged 17",
                    image: ""
                },{
                    question: "Which french player is known for head butting an opponent in the chest and subsequntially receiving a red card in the World Cup Finals?",
                    answers: ["Thierry Henry","Franck Ribéry","Patrick Vieira","Zinédine Zidane"],
                    correctAnswer: "Zinédine Zidane",
                    image: ""
                },{
                    question: "Fifa recently decided to increase the number of teams competing in the World Cup from 32 to this number is 2026?",
                    answers: ["100","66","38","48"],
                    correctAnswer: "48",
                    image: ""
                },{
                    question: "Which team has qualified for every World Cup since 1930?",
                    answers: ["Brazil","Italy","France","Germany"],
                    correctAnswer: "Brazil",
                    image: ""
                },{
                    question: "This player has scored the most goals in a World Cup match, finding the back of the net 5 times against Cameroon in 1994?",
                    answers: ["Diego Maradona","Marco van Basten","Johan Cruyff","Oleg Salenko"],
                    correctAnswer: "Oleg Salenko",
                    image: ""
                },{
                    question: "Where is Fifa planning to hold the next World Cup?",
                    answers: ["The United States, Mexico, and Canada","Saudi Arabia","Turkey","Qatar"],
                    correctAnswer: "Qatar",
                    image: ""
                },{
                    question: "What was the largest attendence of a World Cup Game?",
                    answers: ["199,854 People - Uruguay v Brazil on 16 July 1950 at Maracanã Stadium in Rio de Janeiro, Brazil","214,600 People -- Argentina v West Germany on 29 June 1986 at Estadio Azteca in Mexico City, Mexico","109,014 People - Netherlands vs Spain on 11 July 2010 at Soccer City in Johannesburg, South Africa","94,194 People - Brazil vs Italy on 17 July 1994 at the Rose Bowl in Pasadena, California, USA"],
                    correctAnswer: "199,854 People - Uruguay v Brazil on 16 July 1950 at Maracanã Stadium in Rio de Janeiro, Brazil",
                    image: ""
                },{
                    question: "Which players have the most cards (reds and yellows) in the World Cup?",
                    answers: ["Zinédine Zidane and Cafu","Rigobert Song and Zinédine Zidane","Cafu and Luis Suárez","Nigel de Jong and Pepe"],
                    correctAnswer: "Zinédine Zidane and Cafu",
                    image: ""
                }
            ];
//Game
var game = {
    questions:questions,
    currentQuestion:0,
    counter:30,
    correct:0,
    incorrect:0,
    unanswered:0,

    countdown: function(){
        game.counter--;
        $('#counter').html(game.counter);
        if(game.counter<=0){
            console.log("TIME UP!");
            game.timeUp();
        }
    },
    loadQuestion: function(){
        timer = setInterval(game.countdown,1000);
        $("#subwrapper").html("<h2> Time Left: <span id='counter'>30</span> seconds</h2>");
        $("#subwrapper").append("<h2>"+questions[game.currentQuestion].question+"</h2>");
        for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
            $("#subwrapper").append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }
        
    },
    nextQuestion: function(){
        game.counter = 30;
        $("#counter").html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function(){
        clearInterval(timer);
        game.unanswered++;
        $("#subwrapper").html('<h2>YOUR TIME IS UP!</h2>')
        $("#subwrapper").append("<h3>The Correct Answer Was: "+questions[game.currentQuestion].correctAnswer+"</h3>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },  
    results: function(){
        clearInterval(timer);
        $('#subwrapper').html("<h2>ALL DONE!</h2>");
        $('#subwrapper').append("<h3>Correct: "+game.correct+"</h3>");
        $('#subwrapper').append("<h3>Incorrect: "+game.incorrect+"</h3>");
        $('#subwrapper').append("<h3>Unanswered: "+game.unanswered+"</h3>");
        $('#subwrapper').append("<button id='reset'> PLAY AGAIN! </button>");
        
    },
    clicked: function(e){
        clearInterval(timer);
        if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }
    },
    answeredCorrectly: function(){
        console.log("CORRECT!");
        clearInterval(timer);
        game.correct++;
        $("#subwrapper").html("<h2>That is CORRECT!</h2>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },
    answeredIncorrectly: function(){
        console.log("WRONG!");
        clearInterval(timer);
        game.incorrect++;
        $("#subwrapper").html("<h2>That is WRONG!</h2>");
        $("#subwrapper").append("<h3>The Correct Answer Was: "+questions[game.currentQuestion].correctAnswer+"</h3>");
        if(game.currentQuestion==questions.length-1){
            setTimeout(game.results,3*1000);
        } else {
            setTimeout(game.nextQuestion,3*1000);
        }
    },    
    reset: function(){
        game.currentQuestion = 0;
        game.counter = 0;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();

    },

}

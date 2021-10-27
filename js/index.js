
$('document').ready(function(){
   
    var index = 0;
    var count = 0;

    $('#start-btn').click(function(){
      $('#rules').show();
      $('#intro').hide();
    });

    $('#exit').click(function(){
        $('#rules').hide();
        $('#intro').show();
    });

    $('#continue').click(function(){
        $('#rules').hide();
        $('#hero').show();
        getQuetion(index);
    });


    $('#next').click(function(){
        getNextQuestion();
        $('.options p').css({"background-color":"rgb(207, 207, 207)",
                                        "color":"black",
                                        "cursor": "pointer",
                                        "opacity": 1,
                                        "pointer-events":"auto"
        });
    });


    $('.options p').click(function(option){
           getAnswer(option);
    });
    

    function getQuetion(index){
    $.get('js/questions.js', {questions: "questions"}, function(){
       
        $('#ques').html(questions[index].question);

            $('#option1').text(questions[index].options[0]);
            $('#option2').html(questions[index].options[1]);
            $('#option3').html(questions[index].options[2]);
            $('#option4').html(questions[index].options[3]);
         
       })
    }

    function getNextQuestion(){

        if(index === questions.length-1 ){
            $('#quiz').html(`
                <p>Your total score is: ${count} /5</p>
         `);

         $('#next').html("Finish").click(function(){
            location.reload();
        });
         
        }
        else{
        index = index + 1;
        getQuetion(index);
    }

        }


    function getAnswer(option){

    var selected = $(option.currentTarget).text();

    $.get('js/questions.js', {questions:"questions"}, function(){
        
        var answer = questions[index].answer;

        if(selected === answer){
          $(option.currentTarget).css({"background-color":"#32CD32",
                                        "color":"white",
        });

        $('.options p').css({"pointer-events":"none",
            "cursor": "not-allowed",
             "opacity": 0.65
            });

             count = count + 1;
             console.log(count);
        }

        else{

            $(option.currentTarget).css({"background-color":"#FF0000",
            "color":"white",
            });

            $('.options p').css({"pointer-events":"none",
            "cursor": "not-allowed",
             "opacity": 0.65
            });


            console.log('wrong');
        }
        
    })

    }


});


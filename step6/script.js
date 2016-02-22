$(document).ready(function() {
//bottom
/*alert( $(".sonic").offset().top +  $(".sonic").height() );*/
	var bgRPos = 0;
	var bgLPos = 0;
	var collision = false;
	var up = false;
	var down = false;
	var upvec = 0;
	var jumping = false;
	var andRight = false;
	var tempCol = '';
	var falling = false;

	function hitDiv(code) {
		$("#exo div").each(function(index){
	    var id = $(this).attr("class");
			switch(id) {
				case 'colimitG':
					//Right
					var colR = $(this).offset().left + $(this).width();
					var scol = $(".sonic").offset().left;
					if(scol < colR-12 && code !== 39) {
						collision = true;
						tempCol = 'colimitG';
					}
					break;
				case 'grndlimitG':
					var colR = $(this).offset().left + $(this).width();
					var scolL = $(".sonic").offset().left;
					if(scolL < colR-35) {
						var posY = $(this).offset().top;
						var poS = $(".sonic").offset().top + $(".sonic").height();
						console.log(scolL, colR, posY, poS);
						if(poS < posY) {
							/*$(".sonic").css("top", posY);*/
							$(".sonic").css("transform", "translateY("+(poS+1)+"px)");
						}
						tempCol = 'grndlimitG';
					}
					break;
				case 'startSlope':
					var colR = $(this).offset().left + $(this).width();
					var colL = $(this).offset().left;
					var scolL = $(".sonic").offset().left;
					var scolR = $(".sonic").offset().left + $(".sonic").width();
					if(scolR > colL && scolR < colR/* || scolR > colL*/) {
/*if(tempCol == 'startGround')
	console.log(tempCol, scolL, colR, up, down);*/

						if (code === 39)
							up = true;
						else
							down = true;

						tempCol = 'startSlope';
					}
					break;
				case 'startGround':
						var colR = $(this).offset().left + $(this).width();
						var colL = $(this).offset().left;
						var scolL = $(".sonic").offset().left;
						var scolR = $(".sonic").offset().left + $(".sonic").width();
						if(scolR > colL/* || scolR > colL*/) {
							up = false;
							tempCol = 'startGround';
						}
						break;
					case 'bg1Ground':
						var colR = $(this).offset().left + $(this).width();
						var colL = $(this).offset().left;
						var colT = $(this).offset().top;
						var scolL = $(".sonic").offset().left;
						var scolR = $(".sonic").offset().left + $(".sonic").width();
						var scolB = $(".sonic").offset().top + $(".sonic").height();
					/*	console.log(scolR);
						console.log(colL);*/
						if(scolR > colL+12 && colT < scolB) {
							/*console.log(colT);
							console.log(scolB);*/
							collision = true;
	/*						tempCol = 'bg1Ground';*/
						}
						break;
			}
		});
		return collision;
	}
	function scrollR() {
		/*if(collision) {
			var scolB = $(".sonic").offset().top + $(".sonic").height();
			//var colT = $(tempCol).offset().top;
			console.log(scolB, colT);
		}*/


		$(".start").css("transform", "translateX("+bgRPos+"px)");
		$(".bg1").css("transform", "translateX("+bgRPos+"px)");
		$(".limitG").css("transform", "translateX("+bgRPos+"px)");
		$(".colimitG").css("transform", "translateX("+bgRPos+"px)");
		$(".startSlope").css("transform", "translateX("+bgRPos+"px)");
		$(".startGround").css("transform", "translateX("+bgRPos+"px)");
		$(".bg1Ground").css("transform", "translateX("+bgRPos+"px)");
		bgRPos -= 40;
		bgLPos = bgRPos;
	}
	var map = {39: false, 32: false};
	$(document).keydown(function(event) {
		event.preventDefault();
		collision = hitDiv(event.keyCode);
		switch(event.keyCode) {
			case 39:
				if(!collision) {
					$(".sonic").css("animation", "walk .8s steps(9) infinite");
					$(".sonic").css("transform", "scaleX(1)");
					//mettre le wrapper?
					$(".sonic").css("transform", "translateY("+upvec+"px)");
					$(".start").css("transform", "translateX("+bgRPos+"px)");
					$(".bg1").css("transform", "translateX("+bgRPos+"px)");
					$(".limitG").css("transform", "translateX("+bgRPos+"px)");
					$(".colimitG").css("transform", "translateX("+bgRPos+"px)");
					$(".startSlope").css("transform", "translateX("+bgRPos+"px)");
					$(".startGround").css("transform", "translateX("+bgRPos+"px)");
					$(".bg1Ground").css("transform", "translateX("+bgRPos+"px)");
					bgRPos -= 2;
					bgLPos = bgRPos;
					if(up)
						upvec -= .18;
				}
				break;
			case 37:
				if(!collision) {
					$(".sonic").css("animation", "walk .8s steps(9) infinite");
					$(".sonic").css("transform", "scaleX(-1)");
					$(".wrapper").css("transform", "translateY("+upvec+"px)");
					$(".start").css("transform", "translateX("+bgLPos+"px)");
					$(".bg1").css("transform", "translateX("+bgLPos+"px)");
					$(".limitG").css("transform", "translateX("+bgLPos+"px)");
					$(".grndlimitG").css("transform", "translateX("+bgLPos+"px)");
					$(".colimitG").css("transform", "translateX("+bgLPos+"px)");
					$(".startSlope").css("transform", "translateX("+bgLPos+"px)");
					$(".startGround").css("transform", "translateX("+bgRPos+"px)");
					$(".bg1Ground").css("transform", "translateX("+bgRPos+"px)");
					bgLPos += 2;
					bgRPos = bgLPos;
					if(down)
						upvec += .18;
				}
				break;
			case 32:
				jumping = true;
				break;
		}

		if (event.keyCode in map) {
			map[event.keyCode] = true;
			if (map[39] && map[32])
					andRight = true;
		}

		up = false;
		down = false;
		collision = false;
	});
	$(document).keyup(function(event) {
		switch(event.keyCode) {
			case 32:
				$(".sonic").css("animation", "jump 1.0s steps(9)");
			break;
		}
	});

	function onTick() {
		if(!jumping)
			$(".sonic").css("animation", "sonic .8s steps(8) infinite");
		else if(andRight)
			scrollR();

		$(".sonic").one('animationend', function(e) {
	    jumping = false;
			andRight = false;
			map = {39: false, 32: false};
		});
		collision = false;
	}
	setInterval(onTick, 500);
});

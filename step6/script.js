$(document).ready(function() {
	var bgRPos = 0;
	var bgLPos = 0;
	var collision = false;
	var up = false;
	var down = false;
	var upvec = 0;
	var jumping = false;
	var andRight = false;
	var tempCol = 'startSlope'; //Default
	var jump_col = false;
	var grnd_pos = 0;
	var falling = false;

	function hitDiv(code) {
		$("#exo div").each(function(index){
	    var id = $(this).attr("class");
			switch(id) {
				case 'colimitG':
					//Right
					var colR = $(this).offset().left + $(this).width();
					var scol = $(".sonic").offset().left;
					/*Left limit collision*/
					if(scol < colR-12 && code !== 39) {
						collision = true;
						tempCol = 'colimitG';
					}
					break;
				case 'grndlimitG':
					var colR = $(this).offset().left + $(this).width();
					var scolL = $(".sonic").offset().left;
					if(scolL < colR-$(".sonic").width() ) {
						var posY = $(this).offset().top;
						grnd_pos = posY;
						var poS = $(".sonic").offset().top + $(".sonic").height();
						/*Stop running down here*/
						if(down) {
							down = false;
							upvec = 0;
						}
						/*On ground*/
						if(posY > poS)
							$(".wrapper").css("top", "364px");

						tempCol = 'grndlimitG';
					}
					break;

				case 'firstcolG':
					var colL = $(this).offset().left;
					var scor = $(".sonic").offset().left + $(".sonic").width();
					var limit = scor-colL;
					var posY =  $(".sonic").offset().top;
					var grnd = 340;
					if(scor > colL+10 && posY >= grnd && code !== 37) {
						collision = true;
						tempCol = 'firstcolG';
					}
					break;

				case 'startSlope':
					var colR = $(this).offset().left + $(this).width();
					var colL = $(this).offset().left;
					var scolR = $(".sonic").offset().left + $(".sonic").width();
					if(scolR > colL && scolR < colR) {
						if (code === 39) {
							/*If back from down reset data*/
							if(down) {
								down = false;
								upvec = 0;
							}
							/*Now we are up*/
							up = true;
						}
						else {
							if(up) {
								up = false;
								upvec = 0;
							}
							down = true;
						}
						tempCol = 'startSlope';
					}
					break;

				case 'startGround':
					var colL = $(this).offset().left;
					var scolR = $(".sonic").offset().left + $(".sonic").width();
					if(scolR > colL) {
						up = false;
						tempCol = 'startGround';
					}
					break;

				case 'startSlopeR':
				var colR = $(this).offset().left + $(this).width();
				var colL = $(this).offset().left;
				var scolL = $(".sonic").offset().left;
				if(scolL < colR && scolL > colL) {
					if (code === 39) {
						down = true;
						up = false;
					}
					else {
						up = true;
						down = false;
					}

					tempCol = 'startSlopeR';
				}
						break;

/*inutile pour le moment*/
					case 'bg1Ground':
						var colR = $(this).offset().left + $(this).width();
						var colL = $(this).offset().left;
						var colT = $(this).offset().top;
						var scolL = $(".sonic").offset().left;
						var scolR = $(".sonic").offset().left + $(".sonic").width();
						var scolB = $(".sonic").offset().top + $(".sonic").height();

						if(scolR > colL+12 && colT < scolB) {
							/*collision = true;
	/*						tempCol = 'bg1Ground';*/
						}
						break;
			}
		});
		return collision;
	}

	/*Jump + right*/
	function scrollR() {
		$(".start").css("transform", "translateX("+bgRPos+"px)");
		$(".bg1").css("transform", "translateX("+bgRPos+"px)");
		$(".limitG").css("transform", "translateX("+bgRPos+"px)");
		$(".grndlimitG").css("transform", "translateX("+bgRPos+"px)");
		$(".colimitG").css("transform", "translateX("+bgRPos+"px)");
		$(".firstcolG").css("transform", "translateX("+bgRPos+"px)");
		$(".startSlope").css("transform", "translateX("+bgRPos+"px)");
		$(".startGround").css("transform", "translateX("+bgRPos+"px)");
		$(".startSlopeR").css("transform", "translateX("+bgRPos+"px)");
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
					$(".grndlimitG").css("transform", "translateX("+bgRPos+"px)");
					$(".colimitG").css("transform", "translateX("+bgRPos+"px)");
					$(".firstcolG").css("transform", "translateX("+bgRPos+"px)");
					$(".startSlope").css("transform", "translateX("+bgRPos+"px)");
					$(".startGround").css("transform", "translateX("+bgRPos+"px)");
					$(".startSlopeR").css("transform", "translateX("+bgRPos+"px)");
					$(".bg1Ground").css("transform", "translateX("+bgRPos+"px)");
					bgRPos -= 2;
					bgLPos = bgRPos;
					if(up)
						upvec -= .18;
					else if(down)
						upvec += .28;
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
					$(".firstcolG").css("transform", "translateX("+bgLPos+"px)");
					$(".startSlope").css("transform", "translateX("+bgLPos+"px)");
					$(".startGround").css("transform", "translateX("+bgLPos+"px)");
					$(".startSlopeR").css("transform", "translateX("+bgLPos+"px)");
					$(".bg1Ground").css("transform", "translateX("+bgLPos+"px)");
					bgLPos += 2;
					bgRPos = bgLPos;
					if(down)
						upvec += .18;
					else if(up)
						upvec -= .28;
				}
				break;
			case 32:
				jumping = true;
				if(collision && tempCol === 'startSlope')
					jump_col = true;

				break;
		}

		if (event.keyCode in map) {
			map[event.keyCode] = true;
			if (map[39] && map[32])
					andRight = true;
		}
		collision = false;
	});

	/*Jump*/
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
			if(jumping && tempCol === 'startSlope') {
				if(jump_col && grnd_pos > 0) {
					falling = true;
				}
			}

	    jumping = false;
			andRight = false;
			map = {39: false, 32: false};
		});

		if(falling && !jumping) {
			if(jump_col && grnd_pos > 0) {
				$(".wrapper").css("top", "330px");
				falling = false;
			}
		}

		collision = false;
	}
	setInterval(onTick, 500);
});

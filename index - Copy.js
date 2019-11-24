window.onload = function () {
	var start = null;

	var WIDTH = 960;
	var HEIGHT = 800;

	var cheatFrames = 0;

	var pixels = [];
	for (var i = 0; i < HEIGHT; i++) {
		pixels.push([]);
		for (var j = 0; j < WIDTH; j++) {
			pixels[i].push(false);
		}
	}

	var count = 0;

	var keysDown = {
		'left': false,
		'right': false,
		'up': false,
		'down': false,
		'space': false
	};

	var spaceReleased = false;

	var canvasElement = document.getElementById('can');
	var ctx = canvasElement.getContext('2d');

	var rect = {
		'x': WIDTH / 2,
		'y': HEIGHT / 2
	};

	var rectSize = {
		'width': 100,
		'height': 100,
	}

	var maxVelocity = {
		'x': 600,
		'y': 600
	};

	var velocity = { // pixels/second
		'x': 0,
		'y': 0
	};

	var acceleration = {
		'x': 250,
		'y': 250
	};

	var render = function () {
		//ctx.clearRect(0, 0, WIDTH, HEIGHT);

		rect.x += velocity.x / 60;
		rect.y += velocity.y / 60;

		if (rect.x - rectSize.width / 2 < 0) {
			rect.x = rectSize.width / 2;
			velocity.x = 0;
		}

		if (rect.x + rectSize.width / 2 > WIDTH) {
			rect.x = WIDTH - rectSize.width / 2;
			velocity.x = 0;
		}

		if (rect.y - rectSize.height / 2 < 0) {
			rect.y = rectSize.height / 2;
			velocity.y = 0;
		}

		if (rect.y + rectSize.height / 2 > HEIGHT) {
			rect.y = HEIGHT - rectSize.height / 2;
			velocity.y = 0;
		}

		if (keysDown.left) {
			velocity.x -= acceleration.x / 60;
			if (velocity.x < -maxVelocity.x) velocity.x = -maxVelocity.x;
		}

		if (keysDown.right) {
			velocity.x += acceleration.x / 60;
			if (velocity.x > maxVelocity.x) velocity.x = maxVelocity.x;
		}

		if (keysDown.up) {
			velocity.y -= acceleration.y / 60;
			if (velocity.y < -maxVelocity.y) velocity.y = -maxVelocity.y;
		}

		if (keysDown.down) {
			velocity.y += acceleration.y / 60;
			if (velocity.y > maxVelocity.y) velocity.y = maxVelocity.y;
		}

		for (var i = 0; i < rectSize.height; i++) {
			for (var j = 0; j < rectSize.width; j++) {
				var old = pixels[Math.floor(rect.y) + i - rectSize.height / 2][Math.floor(rect.x) + j - rectSize.width / 2];
				if (old === false) {
					pixels[Math.floor(rect.y) + i - rectSize.height / 2][Math.floor(rect.x) + j - rectSize.width / 2] = true;
					count += 1;
				}
			}
		}

		ctx.fillStyle = 'black';
		ctx.fillRect(rect.x - rectSize.width / 2, rect.y - rectSize.height / 2, rectSize.width, rectSize.height);

		if (keysDown.space) {
			ctx.fillStyle = '#0f0';
			ctx.fillRect(rect.x - 1, rect.y - 1, 2, 2);

			if (count > WIDTH * HEIGHT - 500) {
				for (var i = 0; i < pixels.length; i++) {
					for (var j = 0; j < pixels[i].length; j++) {
						if (pixels[i][j] === false) {
							ctx.fillRect(j, i, 1, 1);
						}
					}
				}
			}

			cheatFrames++;
			document.getElementById('cheatFrames').textContent = cheatFrames;
		} else if (spaceReleased) {
			spaceReleased = false;
			ctx.fillStyle = 'white';
			if (count > WIDTH * HEIGHT - 500) {
				for (var i = 0; i < pixels.length; i++) {
					for (var j = 0; j < pixels[i].length; j++) {
						if (pixels[i][j] === false) {
							ctx.fillRect(j, i, 1, 1);
						}
					}
				}
			}
		}

		if (count === WIDTH * HEIGHT) {
			var taken = (new Date() - start) / 1000;
			console.log('YOU TOOK: ' + taken + ' seconds, and cheated for ' + cheatFrames + ' frames (0.4s penalty each).\n\nScore: ' + (taken + 0.4 * cheatFrames));
			alert('YOU TOOK: ' + taken + ' seconds, and cheated for ' + cheatFrames + ' frames (0.4s penalty each).\n\nScore: ' + (taken + 0.4 * cheatFrames));
		} else {
			window.requestAnimationFrame(render);
		}
	};

	render();

	document.onkeydown = function (e) {
		if (start === null) start = new Date();
		if (e.keyCode === 37) {
			keysDown.left = true;
		} else if (e.keyCode === 39) {
			keysDown.right = true;
		} else if (e.keyCode === 38) {
			keysDown.up = true;
		} else if (e.keyCode === 40) {
			keysDown.down = true;
		} else if (e.keyCode === 32) {
			keysDown.space = true;
		}
	};

	document.onkeyup = function (e) {
		if (e.keyCode === 37) {
			keysDown.left = false;
		} else if (e.keyCode === 39) {
			keysDown.right = false;
		} else if (e.keyCode === 38) {
			keysDown.up = false;
		} else if (e.keyCode === 40) {
			keysDown.down = false;
		} else if (e.keyCode === 32) {
			keysDown.space = false;
			spaceReleased = true;
		}
	};
};
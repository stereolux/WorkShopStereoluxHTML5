components.directive('game', ['$rootScope', function ($rootScope) {
   var directiveDefinitionObject = {
    templateUrl: 'partials/components/game.html',
    replace: true,
    restrict: 'E',
    scope: {        
    },    
    link: function postLink($scope, iElement, iAttrs) { 

      var canvas = iElement[0];
      var ctx = canvas.getContext("2d");
      canvas.width = 512;
      canvas.height = 480;

      // Background image
      var bgReady = false;
      var bgImage = new Image();
      bgImage.onload = function () {
        bgReady = true;
      };
      bgImage.src = "../assets/images/background.png";

      // Hero image
      var heroReady = false;
      var heroImage = new Image();
      heroImage.onload = function () {
        heroReady = true;
      };
      heroImage.src = "../assets/images/hero.png";

      // Monster image
      var monsterReady = false;
      var monsterImage = new Image();
      monsterImage.onload = function () {
        monsterReady = true;
      };
      monsterImage.src = "../assets/images/monster.png";

      // Game objects
      var hero = {
        speed: 256 // movement in pixels per second
      };
      var monster = {};
      var monstersCaught = 0;

      // Handle keyboard controls
      var tasks = [];

      $rootScope.$on('gameEvent', function(event, data){
        tasks.push(data);        
      }); 

      /*var keysDown = {};

      addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
      }, false);

      addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
      }, false);
      */

      // Reset the game when the player catches a monster
      var reset = function () {
        hero.x = canvas.width / 2;
        hero.y = canvas.height / 2;

        // Throw the monster somewhere on the screen randomly
        monster.x = 32 + (Math.random() * (canvas.width - 64));
        monster.y = 32 + (Math.random() * (canvas.height - 64));
      };

      // Update game objects
      var update = function (modifier) {
        var data = tasks[0];
        tasks = tasks.slice(1,tasks.length);
        var mvt = 20;
        if (data === 'haut'){          
          hero.y -= mvt;//hero.speed * modifier;
        }else if (data === 'bas'){
          hero.y += mvt;//hero.speed * modifier;          
        }else if (data === 'gauche'){
          hero.x -= mvt;//hero.speed * modifier;          
        }else if (data === 'droite'){
          hero.x += mvt;//hero.speed * modifier;          
        }
        /*
        if (38 in keysDown) { // Player holding up
          hero.y -= hero.speed * modifier;
        }
        if (40 in keysDown) { // Player holding down
          hero.y += hero.speed * modifier;
        }
        if (37 in keysDown) { // Player holding left
          hero.x -= hero.speed * modifier;
        }
        if (39 in keysDown) { // Player holding right
          hero.x += hero.speed * modifier;
        }*/

        // Are they touching?
        if (
          hero.x <= (monster.x + 32)
          && monster.x <= (hero.x + 32)
          && hero.y <= (monster.y + 32)
          && monster.y <= (hero.y + 32)
        ) {
          ++monstersCaught;
          reset();
        }
      };

      // Draw everything
      var render = function () {
        if (bgReady) {
          ctx.drawImage(bgImage, 0, 0);
        }

        if (heroReady) {
          ctx.drawImage(heroImage, hero.x, hero.y);
        }

        if (monsterReady) {
          ctx.drawImage(monsterImage, monster.x, monster.y);
        }

        // Score
        ctx.fillStyle = "rgb(250, 250, 250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
      };

      // The main game loop
      var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);
        render();

        then = now;
      };

      // Let's play this game!
      reset();
      var then = Date.now();
      setInterval(main, 1); // Execute as fast as possible

        
    }
  };
  return directiveDefinitionObject;
}]);

 
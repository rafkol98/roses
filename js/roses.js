//Rafael Kollyfas - 2020
// three.js global variables
var scene,
    camera,
    renderer,
    controls,
    group;



// Rose materials
var roseDarkMaterial = new THREE.MeshLambertMaterial({ color: 0xFF3B3B });
var stemMaterial = new THREE.MeshLambertMaterial({ color: 0x002607 });
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);

var sphereGeometry = new THREE.SphereGeometry(1, 32,80);

var radius = 50; // Planet radius
// scene.background = new THREE.Color( 0xff0000 );



// Retrieve roses from wrapapi, update text + grow roses when appropriate
function getRoses() {
  
  fetch('https://coronavirus-19-api.herokuapp.com/all').then(res => res.json()).then(
    
    data => growroses(data["deaths"]/10000) 
    
    );
  

}

// Generate a planet at (0,0,0) with specified radius
function planet(r) {
  var groundMaterial = new THREE.MeshLambertMaterial({ color: 0x050505});
  var planetGeometry = new THREE.SphereGeometry(r, 100, 100); 
  var planet = new THREE.Mesh(planetGeometry, groundMaterial);
  planet.position.set(0,0,0);
  scene.add(planet)
}

// Generate a simple rose, rotated with provided angles
function rose(angles) {
    var stem = new THREE.Mesh(cubeGeometry, stemMaterial );
    stem.position.set(0, radius + 0.75, 0 );
    stem.scale.set( 0.3, 1.5, 0.3 );

    // var roseDark = new THREE.Mesh(sphereGeometry, roseDarkMaterial );
    // roseDark.position.set( 0, radius + 1.4, 0 );
    // roseDark.scale.set( 0.8, 0.2, 0.8 );

    var topRose = new THREE.Mesh(sphereGeometry, roseDarkMaterial );
    topRose.position.set( 0, radius + 1.2, 0 );
    topRose.scale.set( 0.5, 0.4, 0.2 );

    var topRose2 = new THREE.Mesh(sphereGeometry, roseDarkMaterial );
    topRose2.position.set( 0, radius + 1.2, 0 );
    topRose2.scale.set( 0.2, 0.4, 0.5 );


    var rose = new THREE.Group();
    // rose.add( roseDark );
    rose.add(topRose);
    rose.add(topRose2);
    rose.add( stem );

    rose.rotation.set(angles[0], angles[1], angles[2])

    return rose
}

// Generate a random angle triple from [0, 2PI]
function randomAngleTriple() {
  return [
    2 * Math.PI * Math.random(),
    2 * Math.PI * Math.random(),
    2 * Math.PI * Math.random()
  ]
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// Add n roses to scene randomly
function growroses(n) {
  $("#souls").text("WE LOST "+numberWithCommas(n*10000)+" SOULS")
  $("#soulsWeLose").text("a rose appears for every 10,000 souls we lose in this fight.")
  for (var i = 0; i < n; i++) {
    scene.add(rose(randomAngleTriple()))
  }
}

function init() {
    // Update rose count regularly
    getRoses()

    // Set up scene + renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 80

    renderer =  new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Create lights, add lights to scene
    var light1 = new THREE.DirectionalLight( 0xDDEED3, 1 );
    var light2 = new THREE.AmbientLight(0x7D7D7D);
    light1.position.set( 0, 0, 1 );

    scene.add(light1);
    scene.add(light2);
    scene.add(planet(radius));

    // Orbital controls (rotation)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.autoRotate = true;
    controls.update();
}

function render() {
    requestAnimationFrame( render );
    controls.update();
    renderer.setClearColor( 0x181418 );
    renderer.render( scene, camera );
    // renderer.setClearColor( 0xffffff, 0);
}

init();
render();

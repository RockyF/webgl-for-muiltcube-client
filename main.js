var windowHalfX, windowHalfY;
var camera, scene, renderer, projector, raycaster;
var cube;
var mouse = new THREE.Vector2(), INTERSECTED;
var aimX = 200, aimZ = 200, speed = 0.01;
var ground;
var movalbe = false;

$(function () {
	var container = document.createElement('div');
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 15000);

	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0xffffff, 1, 5000);
	scene.fog.color.setHSL(0.6, 0, 1);

	var light = new THREE.DirectionalLight(0xEEEEEE, 1.0, 0);
	light.position.set(0, 200, 100);
	light.castShadow = true;
	scene.add(light);

	light = new THREE.AmbientLight(0x888888);
	scene.add(light);

	var geometry = new THREE.CubeGeometry(100, 100, 100);
	var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	cube = new THREE.Mesh(geometry, material);
	cube.position.y = 100;
	cube.castShadow = true;
	scene.add(cube);
	//console.log(cube)

	var loader = new THREE.JSONLoader( true );
	loader.load( "model/scene.js", function( geometry ) {
		console.log(geometry);
		ground = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060 } ) );
		ground.scale.set(50, 50, 50);
		ground.receiveShadow = true;
		scene.add( ground );
	} );

	renderer = new THREE.WebGLRenderer({ clearColor: 0x222222, clearAlpha: 1, antialias: true });
	renderer.shadowMapEnabled = true;
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.sortObjects = false;
	container.appendChild(renderer.domElement);

	projector = new THREE.Projector();
	raycaster = new THREE.Raycaster();

	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);

	window.addEventListener('resize', onWindowResize, false);
	onWindowResize();
	animate();
});

function onWindowResize() {
	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.position.z = 1000;
	//camera.position.x = 500;
	camera.position.y = 500;
	camera.rotation.x = -Math.PI / 6;
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {

	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = -( event.clientY / window.innerHeight ) * 2 + 1;

}

function onDocumentMouseUp(event) {

	event.preventDefault();
	var vector = new THREE.Vector3(mouse.x, mouse.y, 1);
	projector.unprojectVector(vector, camera);
	raycaster.set(camera.position, vector.sub(camera.position).normalize());
	var intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0 && intersects[0].object == ground) {
		aimX = intersects[0].point.x;
		aimZ = intersects[0].point.z;
		var dir = Math.atan((aimZ - cube.position.z) / (aimX - cube.position.x));
		TweenLite(cube.rotation, 0.3, {y:dir, onComplete:function(){
			TweenLite(cube.position, 1, {x:aimX, z:aimZ});
		}});
		movalbe = true;
	}
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	/*var cubeX = cube.position.x;
	var cubeZ = cube.position.z;
	if(Math.abs(aimX - cubeX) < 5 && Math.abs(aimZ - cubeZ)){
		movalbe = false;
	}else{
		cube.position.x += (aimX - cubeX) * speed;
		cube.position.z += (aimZ - cubeZ) * speed;
	}*/


	renderer.render(scene, camera);
}
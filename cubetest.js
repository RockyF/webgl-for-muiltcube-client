/**
 * Created by RockyF on 14-3-16.
 */

var container, stats;

var camera, scene, renderer;

var cube, plane;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


$(function () {
	init();
	animate();
});


function init() {
	container = document.createElement('div');
	document.body.appendChild(container);

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.y = 150;
	camera.position.z = 500;

	scene = new THREE.Scene();

	var light = new THREE.PointLight(0xff2233);
	light.position.set(100, 100, 100);
	scene.add(light);

	var light = new THREE.AmbientLight(0x111111);
	scene.add(light);

	// Cube

	/*for (var i = 0; i < geometry.faces.length; i += 2) {

		var hex = Math.random() * 0xffffff;
		geometry.faces[ i ].color.setHex(hex);
		geometry.faces[ i + 1 ].color.setHex(hex);

	}*/

	//var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors, overdraw: 0.5 });

	var geometry = new THREE.CubeGeometry(100, 100, 100);
	var material = new THREE.MeshLambertMaterial({ color: 0xffffff });
	cube = new THREE.Mesh(geometry, material);

	scene.add(cube);

	// Plane

	var geometry = new THREE.PlaneGeometry(200, 200);
	//geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

	var material = new THREE.MeshBasicMaterial({ color: 0xe0e0e0, overdraw: 0.5 });

	plane = new THREE.Mesh(geometry, material);
	scene.add(plane);

	renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setClearColor(0xf0f0f0);
	renderer.setSize(window.innerWidth, window.innerHeight);

	container.appendChild(renderer.domElement);

	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '0px';
	container.appendChild(stats.domElement);

	window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize(window.innerWidth, window.innerHeight);

}
//

function animate() {

	requestAnimationFrame(animate);

	render();
	stats.update();

}

function render() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render(scene, camera);

}
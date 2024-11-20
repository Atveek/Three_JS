import * as THREE from "three";
//OrbitControls is use for the update the angle of the camera by mouse
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

//renderer is area where 3D element is render
const renderer = new THREE.WebGLRenderer();

//define the size of the screen when 3D element is render
renderer.setSize(window.innerWidth, window.innerHeight);

//append that renderer into the html file
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

//select the camera and the aspect ratio , near and far position
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//create the orbit for control the camera in renderer space
const orbit = new OrbitControls(camera, renderer.domElement);

//AxesHelper is introduce for the help of 3D coordinates
//5 represent the length of the Axes
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

//how to set the camera position
// camera.position.z = 5;
// camera.position.y = 2;

//easy way to set camera position x,y,z
camera.position.set(-10, 30, 30);
//set the orbit  update for every  update()
orbit.update();

//define the box
//first define the Geometry area
//second define the Material like color
//third add both property to the box
//forth add box into scene
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);

//plane
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;

//gridHelper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

//sphereGeometry - radius , horizontal round division ,vertical division
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x0000ff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

sphere.position.set(-10, 10, 0);

//animation of box
function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;
  //add camera and scene in the canvas
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

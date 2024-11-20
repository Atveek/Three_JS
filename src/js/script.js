import * as THREE from "three";
//OrbitControls is use for the update the angle of the camera by mouse
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

//renderer is area where 3D element is render
const renderer = new THREE.WebGLRenderer();

//define the size of the screen when 3D element is render
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

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
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

//gridHelper
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

//sphereGeometry - radius , horizontal round division ,vertical division
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);
sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

//direction of light
const directionalLight = new THREE.DirectionalLight(0xffffff, 11);
scene.add(directionalLight);
directionalLight.position.set(-30, 50, 0);
directionalLight.castShadow = true;
directionalLight.shadow.camera.top = 12
directionalLight.shadow.camera.bottom = -12

const DirectionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  5
);
scene.add(DirectionalLightHelper);

const DLightShadowHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
scene.add(DLightShadowHelper);

//define GUI
//define option -  the property of object which change by user
//add that property in screen of user
const gui = new dat.GUI();
const options = {
  sphereColor: "#ffea00",
  wireframe: false,
  speed: 0.01,
};
gui.addColor(options, "sphereColor").onChange(function (e) {
  sphere.material.color.set(e);
});
gui.add(options, "wireframe").onChange(function (e) {
  sphere.material.wireframe = e;
});
gui.add(options, "speed", 0, 0.1);

let step = 0;

//animation of box
function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.y = time / 1000;

  step += options.speed;
  sphere.position.y = 20 * Math.abs(Math.sin(step));
  //add camera and scene in the canvas
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

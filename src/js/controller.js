window.onload = function()
{
	var scene, renderer, container, camera;
	
	init();
	animate();
	
	function init()
	{
		container = document.createElement('div');
		document.body.appendChild(container);
		
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.set(0, 1000, 1000);
		
		scene = new THREE.Scene();
		
		var geometry = new THREE.Geometry();
		
		var size = 600,
			step = 150;
		for (var i = -size; i <= size; i += step)
		{
			geometry.vertices.push(new THREE.Vector3(-size, 0, i));
			geometry.vertices.push(new THREE.Vector3(size, 0, i));
			
			geometry.vertices.push(new THREE.Vector3(i, 0, -size));
			geometry.vertices.push(new THREE.Vector3(i, 0, size));
		}
		
		var material = new THREE.LineBasicMaterial({color: 0x000000, opacity: 0.5});
		var line = new THREE.Line(geometry, material);
		line.type = THREE.LinePieces;
		scene.add(line);
		
		var ambientLight = new THREE.AmbientLight(Math.random() * 0x202020);
		scene.add( ambientLight );

		var directionalLight = new THREE.DirectionalLight(Math.random() * 0xffffff);
		directionalLight.position.set(0, 1, 0);
		scene.add(directionalLight);

		var pointLight = new THREE.PointLight(0xff0000, 1, 500);
		scene.add(pointLight);

		renderer = new THREE.CanvasRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);

		container.appendChild(renderer.domElement);
		
		window.addEventListener('resize', onWindowResize, false);
	}
	
	function onWindowResize() 
	{
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	}
	
	function animate()
	{
		requestAnimationFrame(animate);
		render();
	}
	
	function render()
	{
		camera.lookAt(scene.position);
		renderer.render(scene, camera);
	}
}
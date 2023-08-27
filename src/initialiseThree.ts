/* eslint-disable prefer-const */

import { useEffect } from 'react'
import type { PerspectiveCamera, Scene, WebGLRenderer, Mesh } from 'three'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

export function useIntialiseThree(containerSelector: string) {


  
  useEffect(() => {
    // -- Initialisation
    const container = document.querySelector(containerSelector) as HTMLElement
    let time = 0
    let camera: PerspectiveCamera, scene: Scene, renderer: WebGLRenderer
    let geometry, material, mesh: Mesh

    let width = container.offsetWidth ?? window.innerWidth
    let height = container.offsetHeight ?? window.innerHeight

    // -- Setting Up The Camera

    camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
    camera.position.z = 1

    // -- Setting Up The Scene, Geometry and Material

    scene = new THREE.Scene()

    geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2)
    material = new THREE.MeshBasicMaterial({ color: 0xffffff })

    mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // -- Setting Up The Renderer

    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(width, height)
    container.appendChild(renderer.domElement)

    // -- Orbit Controls

    const controls = new OrbitControls(camera, renderer.domElement)

    // -- Animation Function

    function animation() {
      requestAnimationFrame(animation)
      time += 0.5
      mesh.rotation.x = time / 2000
      mesh.rotation.y = time / 1000
      renderer.render(scene, camera)
    }

    animation()

    // -- Window Resize

    function handleWindowResize() {
      let width = container.offsetWidth
      let height = container.offsetHeight
      renderer.setSize(width, height)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }

    window.addEventListener('resize', handleWindowResize)

    // -- Cleanup

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [containerSelector])
}

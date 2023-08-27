


void main() {
  vec3 newposition = position;
  float PI = 3.14159; 
  float mappedY = (newposition.x + 3.0) * (1./6.) - 0.5;
  newposition.z += 0.6 * sin(2.0 * PI * (mappedY - 0.25));
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);
}

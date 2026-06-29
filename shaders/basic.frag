#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main(){
    // Normalize co-ordinates (0.0 to 1.0)
    vec2 st=gl_FragCoord.xy/u_resolution.xy;

    // Animated gradient
    vec3 color=vec3(0.);
    color.r=abs(sin(u_time*.5+st.x*2.));
    color.g=abs(sin(u_time*.3+st.y*2.));
    color.b=abs(sin(u_time*.7));

    // Mouse interaction - brighten near mouse
    vec2 mouse=u_mouse/u_resolution;
    float dist = distance(st,mouse);
    color+=(1.0 - dist)*0.3;

    gl_FragColor=vec4(color,1.);
}
// import { useCallback } from "react";
// import Particles from "@tsparticles/react";
// import { loadSlim } from "@tsparticles/slim";

// const ParticlesBackground = () => {

//   const particlesInit = useCallback(async (engine) => {
//     await loadSlim(engine);
//   }, []);


//   return (
//     <Particles
//       id="tsparticles"
//       init={particlesInit}
//       options={{
//         background: {
//           color: {
//             value: "transparent",
//           },
//         },

//         particles: {
//           number: {
//             value: 80,
//           },

//           color: {
//             value: "#2E2EFF",
//           },

//           links: {
//             enable: true,
//             color: "#2E2EFF",
//             opacity: 0.4,
//           },

//           move: {
//             enable: true,
//             speed: 1,
//           },

//           size: {
//             value: {
//               min: 1,
//               max: 4,
//             },
//           },

//           opacity: {
//             value: 0.5,
//           },
//         },

//         detectRetina: true,
//       }}

//       className="absolute inset-0"
//     />
//   );
// };

// export default ParticlesBackground;
// import React, { useEffect, useState } from "react";
// import { Howl } from "howler";

// const BackgroundMusic: React.FC = () => {
//   const [sound, setSound] = useState<Howl | null>(null);

//   const playSound = () => {
//     const bgSound = new Howl({
//       src: ["path-to-your-audio-file.mp3"],
//       loop: true,
//       volume: 0.5,
//     });

//     bgSound.play();
//     setSound(bgSound);
//   };

//   useEffect(() => {
//     return () => {
//       if (sound) {
//         sound.stop();
//       }
//     };
//   }, [sound]);

//   return <button onClick={playSound}>Play Background Music</button>;
// };

// export default BackgroundMusic;

const Music = () => {
  //   let bgPlaylist = [
  //     "./audios/Lonesome_Star.mp3",
  //     "./audios/Jeremiah_s_Song.mp3",
  //     "./audios/The_Gift.mp3",
  //   ];
  //   const bgPlayer = document.querySelector(".btn-player audio");
  //   let bgPlayNum = Math.floor(Math.random() * bgPlaylist.length);
  //   const toggleBgPlayer = (e) => {
  //     let bgPlayerActive = e.currentTarget.classList.toggle("active");
  //     if (bgPlayerActive) {
  //       bgPlayer.play();
  //     } else {
  //       bgPlayer.pause();
  //     }
  //   };
  //   const playNextAudio = () => {
  //     if (bgPlayNum === bgPlaylist.length - 1) {
  //       bgPlayNum = 0;
  //     } else {
  //       ++bgPlayNum;
  //     }
  //     bgPlayer.setAttribute("src", bgPlaylist[bgPlayNum]);
  //     bgPlayer.play();
  //   };
  //   return (
  //     <button className="btn-player" onClick={toggleBgPlayer} type="button">
  //       <audio
  //         preload="true"
  //         src={bgPlaylist[bgPlayNum]}
  //         onEnded={playNextAudio}
  //       ></audio>
  //     </button>
  //   );
};

export default Music;

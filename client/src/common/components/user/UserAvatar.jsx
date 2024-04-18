import { useState, useRef } from "react";

export default function UserAvatar({ src }) {
  const [image, setImage] = useState({ width: "", height: "" });
  const imgRef = useRef(null);

  return (
    <img
      alt="avatar"
      src={src}
      ref={imgRef}
      onLoad={() =>
        setImage({
          ...image,
          width: imgRef.current?.naturalWidth,
          height: imgRef.current?.naturalHeight,
        })
      }
      style={{
        transform:
          image.width < image.height
            ? `scale(${(image.height / image.width) * 1.1})`
            : "",
      }}
    />
  );
}

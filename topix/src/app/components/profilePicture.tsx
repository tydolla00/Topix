import Image from "next/image";

export default function ProfilePicture({ img }: { img: string }) {
  return (
    <Image
      className="w-auto"
      onError={(e) => console.error(e.target)}
      width={200}
      height={200}
      src={img}
      alt="Profile Pic"
    />
  );
}

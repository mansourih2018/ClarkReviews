import Image from 'next/image'

export function MdxImage({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={500}
      className="rounded-xl my-6 w-full h-auto object-cover"
    />
  )
}

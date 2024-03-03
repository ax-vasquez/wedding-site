import React, { ReactNode } from 'react'

const ParallaxImageCaption: React.FC<{captionComponent: ReactNode | string}> = ({
    captionComponent
  }) => {
    return (
      <div className="absolute top-1/3 bg-mountain-pine w-full opacity-80">
          {captionComponent}
      </div>
    )
}

const ParallaxImage: React.FC<{ imageUrl: string, title: string, caption?: any }> = ({
    imageUrl,
    title,
    caption,
  }) => {
    return (
      <div
        style={{
          backgroundImage: `url(${imageUrl})`
        }}
        className="h-full bg-fixed bg-center bg-no-repeat bg-cover"
      >
        {caption && <ParallaxImageCaption captionComponent={caption} />}
      </div>
    )
}

export default ParallaxImage

import { FunctionComponent } from 'react'
import SVG from 'react-inlinesvg'

interface CustomIconProps {
    id?: string
    /**
     * The name of the icon (must exactly-match the name of the file you are using from within the icons directory)
     * 
     * DON'T include '.svg' - e.g., if your file name is 'plus.svg', then only pass 'plus' as the value for `fileName`
     */
    fileName: string
    height: number
    width: number
    className?: string
    alt?: string
    onClick?: () => void
}

/**
 * Shared icon component for all SVG files to use an icon. To use this:
 * 1. Add a new *.svg file to the /icons directory
 * 2. Pass in the name as part of the arguments
 * 3. Pass any customizations you need
 * 4. Done!
 */
const CustomIcon: FunctionComponent<CustomIconProps> = ({
    id,
    fileName,
    height,
    width,
    className,
    alt,
    onClick,
    ...props
}) => {
    return (
      <div id={id}>
        <SVG
            className={className}
            src={`../icons/${fileName}.svg`}
            height={height}
            width={width}
            title={alt}
            // Report any errors loading an SVG to the console
            onError={console.log}
            onClick={onClick ? onClick : undefined}
            {...props}
            />
      </div>

    )
}

export default CustomIcon

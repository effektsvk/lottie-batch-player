import { memo, useRef } from 'react'
import Slider from "react-input-slider";
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier, XYCoord } from 'dnd-core'
import { Player } from './Types';
import HamburgerIcon from './HamburgerIcon';

type Props = {
  fileName: string | null,
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleOpacityChange: (pos: { x: number, y: number }) => void
  handleOpacityInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  id: string,
  index: number,
  moveCard: (dragIndex: number, hoverIndex: number) => void
  opacity: number,
}

export const Input = memo(({
  fileName,
  handleFileChange,
  handleOpacityChange,
  handleOpacityInputChange,
  id,
  index,
  moveCard,
  opacity,
}: Props) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ handlerId }, drop] = useDrop<
    Player,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'CARD',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: Player, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const divOpacity = isDragging ? 0 : 1

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileInputClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };

  
  drag(drop(ref))
  return (
    <div ref={ref} key={`Input-div-${id}`} style={{ marginBottom: "20px", cursor: 'move', opacity: divOpacity }} data-handler-id={handlerId}>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{ marginRight: "4px" }}><HamburgerIcon /></div>
        <div style={{ minWidth: "400px" }}>
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e)}
            style={{ display: 'none' }} // Hide the actual file input
          />
          <button onClick={handleFileInputClick}>Upload File</button>
          <span style={{ marginLeft: "4px" }}>{fileName}</span>
        </div>
        <Slider
          axis="x"
          xstep={0.01}
          xmin={0}
          xmax={1}
          x={opacity}
          onChange={(pos) => handleOpacityChange(pos)}
          styles={{
            track: { backgroundColor: "#ccc" },
            active: { backgroundColor: "#000" },
            thumb: { width: 20, height: 20 }
          }}
        />
        <input
          type="number"
          min="0"
          max="1"
          step="0.01"
          value={opacity}
          onChange={(e) => handleOpacityInputChange(e)}
          style={{ marginLeft: 20, width: 50 }}
        />
      </div>
    </div>
  )
})
